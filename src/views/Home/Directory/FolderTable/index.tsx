import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  DeleteOutlined,
  MoreOutlined,
  FolderFilled,
  FileTextOutlined,
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

interface DataType {
  key: string;
  name: string;
  type: "folder" | "file";
  parent: string | null;
  children?: DataType[];
  lastSavedAt?: string;
}

const type = "DraggableBodyRow";

const FolderTable: React.FC = () => {
  const { token } = useAuth();
  const [data, setData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

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
            };
          } else {
            return {
              key: item.doc_id,
              name: item.title,
              type: "file",
              parent: parent,
              lastSavedAt: item.last_saved_at,
            };
          }
        });
      };

      setData(formatData(folderList));
    }
  }, [folderList]);

  const handleAddFolder = () => {
    newDirectory(newFolderName);
    getFolderList();
    setNewFolderName("");
    setIsModalVisible(false);
  };

  const handleDelete = (keys: React.Key[]) => {
    const deleteRecursively = (
      data: DataType[],
      keys: React.Key[]
    ): DataType[] => {
      return data.filter((item) => {
        if (keys.includes(item.key)) {
          return false;
        }
        if (item.children) {
          item.children = deleteRecursively(item.children, keys);
        }
        return true;
      });
    };
    setData(deleteRecursively(data, keys));
    setSelectedRowKeys([]);
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
    if (dragItem && hoverItem && hoverItem.type === "folder") {
      moveDirectory(dragItem.key, hoverItem.key);
      getFolderList();
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="text-topbar-text text-sm flex items-center gap-2">
          {record.type === "file" ? (
            <FileTextOutlined className="text-[22px] text-topbar-text" />
          ) : (
            <FolderFilled className="text-[22px] text-topbar-text" />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="删除">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete([record.key])}
            />
          </Tooltip>
          <Tooltip title="更多">
            <Button shape="circle" icon={<MoreOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const DraggableBodyRow = ({ index, className, style, ...restProps }: any) => {
    const ref = React.useRef<HTMLTableRowElement>(null);
    const [{ isOver, dropClassName }, drop] = useDrop({
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
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        新建文件夹
      </Button>
      {selectedRowKeys.length > 0 && (
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(selectedRowKeys)}
          style={{ marginBottom: 16, marginLeft: 16 }}
        >
          删除
        </Button>
      )}
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
          folderListLoading || newDirectoryLoading || moveDirectoryLoading
        }
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
