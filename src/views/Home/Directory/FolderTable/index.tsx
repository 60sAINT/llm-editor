import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Input, Modal, Space, Tooltip, Flex } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  DeleteOutlined,
  FolderFilled,
  FileTextOutlined,
  ExclamationCircleFilled,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import {
  DndProvider,
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/provider/authProvider";
import { directoryApi } from "../api";
import { showMessage } from "@/common/utils/message";
import { formatDate } from "@/common/utils";
import { docApi } from "@/views/NewDoc/api/Doc";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  type: "folder" | "file";
  parent: string | null;
  children?: DataType[];
  last_saved_at?: string;
}

const type = "DraggableBodyRow";

const FolderTable: React.FC = () => {
  const { token } = useAuth();
  const [data, setData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newName, setNewName] = useState("");
  const newNameRef = useRef(newName);
  const [newDocName, setNewDocName] = useState("");
  const newDocNameRef = useRef(newDocName);
  const navigate = useNavigate();

  const {
    run: getFolderList,
    data: folderList,
    loading: folderListLoading,
  } = useRequest(
    async () => {
      const res = await directoryApi.getDirectoryTree(`Bearer ${token}` || "");
      return res.data;
    },
    { manual: false }
  );
  const { runAsync: newDirectory, loading: newDirectoryLoading } = useRequest(
    async (dir_name) => {
      const res = await directoryApi.newDirectory({
        token: `Bearer ${token}` || "",
        dir_name,
      });
      return res.data;
    }
  );
  const { runAsync: newDoc, loading: newDocLoading } = useRequest(
    async (dir_id, title) => {
      const res = await docApi.newDoc({
        token: `Bearer ${token}` || "",
        title,
        content: "[{}]",
        dir_id,
      });
      return res.data;
    }
  );
  const { runAsync: moveDirectory, loading: moveDirectoryLoading } = useRequest(
    async (dir_id, to_dir_id) => {
      const res = await directoryApi.moveDirectory({
        token: `Bearer ${token}` || "",
        dir_id,
        to_dir_id,
      });
      if (res) return showMessage("移动成功");
    }
  );
  const { runAsync: moveDocument, loading: moveDocumentLoading } = useRequest(
    async (doc_id, to_dir_id) => {
      const res = await directoryApi.moveDocument({
        token: `Bearer ${token}` || "",
        doc_id,
        to_dir_id,
      });
      if (res) return showMessage("移动成功");
    }
  );
  const { runAsync: deleteDirectory, loading: deleteDirectoryLoading } =
    useRequest(async (dir_list) => {
      const res = await directoryApi.deleteDirectory({
        token: `Bearer ${token}` || "",
        dir_list,
      });
      if (res) return showMessage("删除成功");
    });
  const { runAsync: deleteDoc } = useRequest(async (doc_list) => {
    const res = await docApi.deleteDoc(`Bearer ${token}` || "", doc_list);
    return res.data;
  });
  const { runAsync: renameDoc } = useRequest(async (doc_id, new_doc_name) => {
    const res = await docApi.renameDoc({
      token: `Bearer ${token}` || "",
      doc_id,
      new_doc_name,
    });
    return res.data;
  });
  const { runAsync: renameDir } = useRequest(async (dir_id, new_dir_name) => {
    const res = await directoryApi.renameDir({
      token: `Bearer ${token}` || "",
      dir_id,
      new_dir_name,
    });
    return res.data;
  });

  useEffect(() => {
    if (folderList) {
      const formatData = (
        list: any[],
        parent: string | null = null
      ): DataType[] => {
        return list.map((item) => {
          if (item.dir_id) {
            return {
              key: item.dir_id,
              name: item.dir_name,
              type: "folder",
              parent: parent,
              children: item.children
                ? formatData(item.children, item.dir_id)
                : [],
              last_saved_at: item.last_saved_at,
            };
          } else {
            return {
              key: item.doc_id,
              name: item.title,
              type: "file",
              parent: parent,
              last_saved_at: item.last_saved_at,
            };
          }
        });
      };

      setData(formatData(folderList));
    }
  }, [folderList]);

  const handleAddFolder = () => {
    newDirectory(newFolderName).then(() => getFolderList());
    setNewFolderName("");
    setIsModalVisible(false);
  };

  const { confirm } = Modal;
  const showDeleteConfirm = (ids: React.Key[]) => {
    confirm({
      title: "确认删除",
      icon: <ExclamationCircleFilled />,
      content:
        "确认删除文件？删除后，所有协作者均无法访问， 30天内可从回收站恢复。",
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        const fileIds: any[] = [];
        const directoryIds: any[] = [];
        // 递归函数，用于遍历所有层次的文件和文件夹
        const traverse = (data: any[]) => {
          data.forEach((item) => {
            if (item.type === "file" && ids.includes(item.key)) {
              fileIds.push(item.key);
            } else if (item.type === "folder" && ids.includes(item.key)) {
              directoryIds.push(item.key);
            }
            // 如果有子节点，继续递归
            if (item.children && item.children.length > 0) {
              traverse(item.children);
            }
          });
        };
        // 开始遍历
        traverse(data);
        // 删除文件和文件夹
        deleteDoc(fileIds)
          .then(() => deleteDirectory(directoryIds))
          .then(() => getFolderList());
        setSelectedRowKeys([]);
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    newNameRef.current = newName;
  }, [newName]);
  const showRenameConfirm = (
    id: React.Key,
    type: string,
    initialName: string
  ) => {
    console.log(id, type, initialName);
    setNewName(initialName);
    confirm({
      title: "重命名文件",
      icon: null,
      content: (
        <Input
          placeholder="请输入文件夹名称"
          defaultValue={initialName}
          onChange={(e) => setNewName(e.target.value)}
          className="my-5 h-8"
        />
      ),
      okText: "确定",
      cancelText: "取消",
      onOk() {
        if (type == "file") {
          renameDoc(id, newNameRef.current).then(() => getFolderList());
        } else {
          renameDir(id, newNameRef.current).then(() => getFolderList());
        }
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    newDocNameRef.current = newDocName;
  }, [newDocName]);
  const showNewDocConfirm = (id?: React.Key) => {
    confirm({
      title: "新建文档",
      icon: null,
      content: (
        <Input
          placeholder="请输入文档名称"
          onChange={(e) => setNewDocName(e.target.value)}
          className="my-5 h-8"
        />
      ),
      okText: "确定",
      cancelText: "取消",
      onOk() {
        newDoc(id, newDocNameRef.current).then(() => getFolderList());
      },
      onCancel() {},
    });
  };

  const findItemByKey = (key: string, items: DataType[]): DataType | null => {
    for (const item of items) {
      if (item.key === key) return item;
      if (item.children) {
        const found = findItemByKey(key, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const moveRow = (dragKey: string, hoverKey: string) => {
    const dragItem = findItemByKey(dragKey, data);
    const hoverItem = findItemByKey(hoverKey, data);
    if (dragKey === hoverKey) {
      return;
    }
    if (dragItem && hoverItem && hoverItem.type === "folder") {
      if (dragItem.type === "folder") {
        moveDirectory(dragItem.key, hoverItem.key).then(() => getFolderList());
      } else {
        moveDocument(dragItem.key, hoverItem.key).then(() => getFolderList());
      }
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: <span className="pl-4">文件名</span>,
      dataIndex: "name",
      key: "name",
      width: "35%",
      render: (text, record) => (
        <div
          className="text-topbar-text text-sm flex items-center gap-2"
          onClick={() => {
            record.type === "file" && navigate(`/newDoc?doc_id=${record.key}`);
          }}
        >
          {record.type === "file" ? (
            <FileTextOutlined className="text-[22px] text-topbar-text" />
          ) : (
            <FolderFilled className="text-[22px] text-topbar-text" />
          )}
          <Tooltip title={text}>
            <span>{text}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "最后打开时间",
      dataIndex: "last_saved_at",
      width: "35%",
      render: (timeString: string) => {
        return formatDate(timeString);
      },
      sorter: (a: DataType, b: DataType) =>
        new Date(b.last_saved_at!).getTime() -
        new Date(a.last_saved_at!).getTime(),
      defaultSortOrder: "ascend",
    },
    {
      title: "操作",
      key: "action",
      width: "30%",
      render: (_, record) => (
        <Flex gap={2}>
          <Button
            type="link"
            className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
            onClick={() => {
              showDeleteConfirm([record.key]);
            }}
          >
            <DeleteOutlined />
            删除
          </Button>
          <Button
            type="link"
            className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
            onClick={() => {
              showRenameConfirm(record.key, record.type, record.name);
            }}
          >
            <EditOutlined />
            重命名
          </Button>
          {record.type === "folder" ? (
            <Button
              type="link"
              className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
              onClick={() => {
                showNewDocConfirm(record.key);
              }}
            >
              <FileAddOutlined />
              新建文档
            </Button>
          ) : null}
        </Flex>
      ),
    },
  ];

  const DraggableBodyRow = ({ index, className, style, ...restProps }: any) => {
    const ref = React.useRef<HTMLTableRowElement>(null);
    const [{ isOver }, drop] = useDrop({
      accept: type,
      collect: (monitor: DropTargetMonitor) => {
        const { key: dragKey } = (monitor.getItem() || {}) as any;
        if (dragKey === restProps["data-row-key"]) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName: " drop-over",
        };
      },
      drop: (item: { key: string }) => {
        moveRow(item.key, restProps["data-row-key"]);
      },
    });
    const [, drag] = useDrag({
      type,
      item: { key: restProps["data-row-key"] },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drop(drag(ref));

    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? " drop-over" : ""}`}
        style={{
          ...style,
          backgroundColor: isOver ? "#e6f7ff" : "",
        }}
        {...restProps}
      />
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="mb-4 mr-4"
        >
          新建文件夹
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            showNewDocConfirm();
          }}
          style={{ marginBottom: 16 }}
        >
          新建文档
        </Button>
        {selectedRowKeys.length > 0 && (
          <Space className="flex items-start gap-5">
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(selectedRowKeys)}
              style={{ marginBottom: 16, marginLeft: 16 }}
            >
              删除
            </Button>
            <div className="px-2.5 text-sm hover:bg-home-border rounded-sm font-bold cursor-pointer h-8 leading-8 text-zinc-300">
              已选中{selectedRowKeys.length}个项目
            </div>
          </Space>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        components={{
          body: {
            row: DraggableBodyRow,
          },
        }}
        onRow={(record) =>
          ({
            "data-row-key": record.key,
          } as React.HTMLAttributes<HTMLTableRowElement>)
        }
        loading={
          folderListLoading ||
          newDirectoryLoading ||
          moveDirectoryLoading ||
          moveDocumentLoading ||
          deleteDirectoryLoading ||
          newDocLoading
        }
        className="[&_.ant-table-selection-column]:!pl-3.5 [&_.ant-table-cell-with-append]:!pl-[9px]"
      />
      <Modal
        title={
          <span className="text-sm font-bold text-stone-800">新建文件夹</span>
        }
        open={isModalVisible}
        onOk={handleAddFolder}
        onCancel={() => setIsModalVisible(false)}
        centered
        className="[&_.ant-modal-content]:p-7 [&_.ant-modal-content]:rounded [&_.ant-modal-content]:w-[480px] [&_.ant-modal-close]:top-6 [&_.ant-modal-close]:right-6 [&_.ant-modal-footer>button]:w-20"
      >
        <Input
          placeholder="请输入文件夹名称"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="mt-6 mb-5 h-8"
        />
      </Modal>
    </DndProvider>
  );
};

export default FolderTable;
