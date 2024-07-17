import { Modal } from "antd";

export const deleteConfirm = (onOk?: (...args: any[]) => any) => {
    Modal.confirm({
        title: "确认删除",
        // icon: <ExclamationCircleFilled />,
        content: "确认删除文件？",
        okText: "删除",
        okType: "danger",
        cancelText: "取消",
        onOk,
        onCancel() {},
    });
};
