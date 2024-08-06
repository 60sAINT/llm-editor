import React, { useState } from "react";
import { Table, Button, Input, Modal, Space, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import {
  DndProvider,
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

interface DataType {
  key: string;
  name: string;
  type: "folder" | "file";
  parent: string | null;
  children?: DataType[];
  lastSavedAt?: string;
}

const initialData: DataType[] = [
  {
    key: "3b6823d5-3f98-4c84-b8f1-6b077ec06bc0",
    name: "root",
    type: "folder",
    parent: null,
    children: [
      {
        key: "6431c47c-0aae-4d41-8623-301ef959b05a",
        name: "test",
        type: "folder",
        parent: "3b6823d5-3f98-4c84-b8f1-6b077ec06bc0",
        children: [],
      },
      {
        key: "4beebd6f-d30e-473f-a4c3-afe9451b493e",
        name: "root_doc",
        type: "file",
        parent: "3b6823d5-3f98-4c84-b8f1-6b077ec06bc0",
        lastSavedAt: "2024-08-05T15:21:34.756866",
      },
    ],
  },
  {
    key: "c250412d-821d-4512-aaa1-57d55e1b5585",
    name: "root_doc",
    type: "file",
    parent: null,
    lastSavedAt: "2024-08-05T15:20:42.693132",
  },
];

const type = "DraggableBodyRow";

const FolderTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleAddFolder = () => {
    setData([
      ...data,
      {
        key: (data.length + 1).toString(),
        name: newFolderName,
        type: "folder",
        parent: null,
        children: [],
      },
    ]);
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
      const removeItem = (items: DataType[], key: string): DataType[] => {
        return items
          .filter((item) => item.key !== key)
          .map((item) => ({
            ...item,
            children: item.children ? removeItem(item.children, key) : [],
          }));
      };

      const newData = removeItem(data, dragKey);
      console.log(newData);

      hoverItem.children = hoverItem.children || [];
      hoverItem.children.push(dragItem);

      setData(newData);
      message.success("移动成功");
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
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
          cursor: "move",
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
      />
      <Modal
        title="新建文件夹"
        open={isModalVisible}
        onOk={handleAddFolder}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="请输入文件夹名称"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </Modal>
    </DndProvider>
  );
};

export default FolderTable;
