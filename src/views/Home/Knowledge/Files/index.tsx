import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { knowledgeApi } from "../api";
import { useSearchParams } from "react-router-dom";
import { Table } from "antd";
import { FileBase } from "../interface";
import { bytesToSize, formatDate } from "@/common/utils";

const Files = () => {
    const [searchParams] = useSearchParams();
    const db_name = searchParams.get("db_name");

    const { data } = useRequest(() => knowledgeApi.getFiles(db_name!), {
        manual: false,
        ready: !!db_name,
    });

    const columns = [
        {
            title: "名称",
            dataIndex: "name",
        },
        {
            title: "文件大小",
            dataIndex: "size",
            render: (size: number) => bytesToSize(size),
        },
        {
            title: "更新时间",
            dataIndex: "time",
            render: (timeString: string) => formatDate(timeString),
            sorter: (a: FileBase, b: FileBase) =>
                new Date(b.time).getTime() - new Date(a.time).getTime(),
            defaultSortOrder: "ascend" as any,
        },
    ];

    return <Table dataSource={data} columns={columns} />;
};

export default Files;
