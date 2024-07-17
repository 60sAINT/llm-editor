import React, { useMemo, useState } from "react";
import { Input, Button, Modal, Form, List, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { knowledgeApi } from "./api";
import { deleteConfirm } from "@/utils/deleteConfirm";

const KnowledgeBaseApp: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState<string>("");

    const { data, loading, refresh } = useRequest(
        knowledgeApi.getKnowledgeList,
        {
            manual: false,
        }
    );

    const { runAsync: createDb, loading: createLoading } = useRequest((v) =>
        knowledgeApi.createKnowledge(v)
    );

    const { runAsync: deleteDb } = useRequest(async (v) => {
        const res = await knowledgeApi.delKnowledge(v);
        if (res) refresh();
    });

    const dataSource = useMemo(
        () => data?.filter((item) => item.name.includes(filteredData)),
        [data, filteredData]
    );

    const onOk = async () => {
        const value = await form.validateFields();
        await createDb(value);
        refresh();
        setIsModalVisible(false);
    };

    const toDb = (db_name: string) =>
        window.open(`./db?db_name=${db_name}`, "_blank");

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Input.Search
                    placeholder="搜索知识库"
                    onSearch={setFilteredData}
                    className="w-1/3 [&_input:focus]:!border-primary [&_input:focus-within]:shadow-sm [&_input:focus-within]:!shadow-[#f3d7db] [&_input:hover]:!border-primary [&_button:hover]:!text-primary"
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    新建知识库
                </Button>
            </div>
            <List
                rowKey={"name"}
                grid={{ gutter: 16, column: 4 }}
                dataSource={dataSource}
                loading={loading}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            title={
                                <span onClick={() => toDb(item.name)}>
                                    {item.name}
                                </span>
                            }
                            className="shadow-md"
                        >
                            {item.description}
                            <a
                                onClick={() =>
                                    deleteConfirm(
                                        async () => await deleteDb(item.name)
                                    )
                                }
                            >
                                删除
                            </a>
                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title="新建知识库"
                open={isModalVisible}
                onOk={onOk}
                onCancel={() => setIsModalVisible(false)}
                okButtonProps={{ loading: createLoading }}
                cancelButtonProps={{ hidden: true }}
            >
                <Form form={form}>
                    <Form.Item
                        name="db_name"
                        label="知识库名称"
                        rules={[{ required: true, message: "请输入标题" }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="description" label="描述">
                        <Input.TextArea />
                    </Form.Item> */}
                </Form>
            </Modal>
        </div>
    );
};

export default KnowledgeBaseApp;
