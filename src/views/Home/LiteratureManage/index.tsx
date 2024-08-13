import { useRequest } from "@/hooks/useRequest";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Skeleton,
  Space,
  Table,
  Tag,
  Tooltip,
  Upload,
  UploadProps,
} from "antd";
import React, { useState } from "react";
import { literatureApi } from "./api";
import { useAuth } from "@/provider/authProvider";
import {
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  FilePdfOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SearchProps } from "antd/es/input";
import { formatDate } from "@/common/utils";
import { ColumnsType } from "antd/es/table";
import { axios, GATEWAY } from "@/api/AxiosInstance";

export interface LiteratureType {
  paper_id: string;
  doi: string;
  title: string;
  author: string;
  published_at: string;
  tags: Array<string>;
  comment: string;
  created_at: string;
  last_read_at: string;
}

const LiteratureManage = () => {
  const { token } = useAuth();

  const [form] = Form.useForm();
  const onSearch: SearchProps["onSearch"] = async (value, _e) => {
    if (value == "") {
      return;
    }
    // const data = await getRecommendPaperList(value);
  };

  const {
    run: getLiteratureList,
    data: literatureList,
    loading: literatureListLoading,
  } = useRequest(
    async () => {
      const res = await literatureApi.getLiteratureList(
        `Bearer ${token}` || ""
      );
      return res;
    },
    { manual: false }
  );
  console.log(literatureList);

  const { confirm } = Modal;
  const showDeleteConfirm = (ids: React.Key[], title?: string) => {
    confirm({
      title: (
        <span>
          确定要将
          <span className="text-primary">
            {title ? title : ids.length + "篇文献"}彻底删除吗？
          </span>
        </span>
      ),
      icon: <ExclamationCircleFilled />,
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk() {},
      onCancel() {},
    });
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const [isMutipleChoice, setIsMutipleChoice] = useState<boolean>(false);

  const action = `${GATEWAY}/api/v1/paper/upload`;
  const props: UploadProps = {
    accept: ".pdf",
    name: "file",
    action,
    multiple: true,
    customRequest: async (opt) => {
      const formData = new FormData();
      formData.append("file", opt.file);
      axios
        .post(`${action}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Authorization": `Bearer ${token}`,
          },
        })
        .then(() => {
          getLiteratureList();
        });
    },
  };

  const columns: ColumnsType<LiteratureType> = [
    {
      title: "文献名称",
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (tags: Array<string>) => (
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Tag>{tag}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "发布日期",
      dataIndex: "published_at",
      key: "published_at",
      render: (timeString: string) => {
        return formatDate(timeString);
      },
      sorter: (a: LiteratureType, b: LiteratureType) =>
        new Date(b.published_at!).getTime() -
        new Date(a.published_at!).getTime(),
      defaultSortOrder: "ascend",
    },
    {
      title: "添加时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (timeString: string) => {
        return formatDate(timeString);
      },
      sorter: (a: LiteratureType, b: LiteratureType) =>
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime(),
      defaultSortOrder: "ascend",
    },
    {
      title: "上次阅读时间",
      dataIndex: "last_read_at",
      key: "last_read_at",
      render: (timeString: string) => {
        return formatDate(timeString);
      },
      sorter: (a: LiteratureType, b: LiteratureType) =>
        new Date(b.last_read_at!).getTime() -
        new Date(a.last_read_at!).getTime(),
      defaultSortOrder: "ascend",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Flex gap={2}>
          <Button
            type="link"
            className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
            onClick={() => {
              showDeleteConfirm([record.paper_id]);
            }}
          >
            <DeleteOutlined />
            删除
          </Button>
        </Flex>
      ),
      fixed: "right",
    },
  ];

  return (
    <div className="flex h-full">
      <div className="px-2 bg-stone-100 w-[22.8%] border-r border-slate-200">
        <Skeleton
          loading={literatureListLoading}
          active
          paragraph={{ rows: 8 }}
          className="py-3"
        >
          <div className="mx-1.5 my-1 h-8 flex items-center text-slate-800 font-semibold">
            <CopyOutlined />
            <span className="mx-2">全部文献</span>
            {literatureList && literatureList.length}
          </div>
          <ul>
            {literatureList &&
              literatureList.map((literature: LiteratureType) => (
                <Tooltip title={literature.title} placement="right">
                  <Link
                    className="h-10 leading-10 hover:bg-[#fbf2f3] pl-1.5 rounded overflow-hidden text-ellipsis line-clamp-1 hover:text-[#000000e0]"
                    style={{ display: "-webkit-box" }}
                    to={`/pdf?pdfId=${literature.paper_id}`}
                    target="_blank"
                  >
                    <FilePdfOutlined className="mr-2.5 text-slate-400" />
                    {literature.title}
                  </Link>
                </Tooltip>
              ))}
          </ul>
        </Skeleton>
      </div>
      <div className="w-[77.2%]">
        <div className="bg-neutral-50 pb-2 pt-5 px-4 mb-3">
          <div className="text-primary">全部文献</div>
          <div className="flex mt-2.5 mb-7">
            <Form form={form} className="w-full">
              <Form.Item name="searchInput" className="mb-0">
                <Input.Search
                  placeholder="搜索标题、笔记、备注..."
                  allowClear
                  prefix={<SearchOutlined />}
                  onSearch={onSearch}
                  className="[&_.ant-input-group-addon]:hidden [&_.ant-input-affix-wrapper]:!rounded-md"
                />
              </Form.Item>
            </Form>
            <Divider type="vertical" className="mx-6 h-8" />
            <Button onClick={() => setIsMutipleChoice(!isMutipleChoice)}>
              {isMutipleChoice ? "结束多选" : "多选"}
            </Button>
            <Upload
              {...props}
              className="[&_.ant-upload-list]:absolute [&_.ant-upload-list]:right-0"
            >
              <Button type="primary" className="ml-4">
                添加
              </Button>
            </Upload>
          </div>
        </div>
        {selectedRowKeys.length > 0 && (
          <Space className="flex items-start gap-5 ml-4 mb-3">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(selectedRowKeys)}
              style={{ marginBottom: 16, marginLeft: 16 }}
            >
              删除
            </Button>
          </Space>
        )}
        <Table
          columns={columns}
          dataSource={literatureList}
          loading={literatureListLoading}
          scroll={{ x: 1300 }}
          rowSelection={isMutipleChoice ? rowSelection : undefined}
          className="[&_.ant-table-thead]:h-10 [&_tr]:h-10 [&_tr>th]:h-10 [&_.ant-table-cell]:!p-3 ml-3"
        />
      </div>
    </div>
  );
};

export default LiteratureManage;
