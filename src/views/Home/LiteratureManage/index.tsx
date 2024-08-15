import { useRequest } from "@/hooks/useRequest";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Popover,
  Skeleton,
  Space,
  Table,
  Tag,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { literatureApi } from "./api";
import { useAuth } from "@/provider/authProvider";
import {
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  FilePdfOutlined,
  FileSearchOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SearchProps } from "antd/es/input";
import { formatDate } from "@/common/utils";
import { ColumnsType } from "antd/es/table";
import { axios, GATEWAY } from "@/api/AxiosInstance";
import AuthorList from "@/common/components/PdfViewer/components/AuthorList";
import { RcFile } from "antd/es/upload";

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
  key?: string;
  detail_url: string;
}

// ... existing code ...
const LiteratureManage = () => {
  const { token } = useAuth();

  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<LiteratureType[]>([]);
  const [selectedTags] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
  };

  const {
    run: getLiteratureList,
    data: literatureList,
    loading: literatureListLoading,
    mutate: setLiteratureList, // 添加 mutate 方法
  } = useRequest(
    async () => {
      const res = await literatureApi.getLiteratureList(
        `Bearer ${token}` || ""
      );
      return res;
    },
    { manual: false }
  );

  const { runAsync: deleteLiterature } = useRequest(async (paper_ids) => {
    const res = await literatureApi.deleteLiterature({
      token: `Bearer ${token}` || "",
      paper_ids,
    });
    return res;
  });

  useEffect(() => {
    if (literatureList) {
      let filtered = literatureList.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.comment.toLowerCase().includes(searchValue.toLowerCase())
      );

      if (selectedTags.length > 0) {
        filtered = filtered.filter((item) =>
          selectedTags.every((tag) => item.tags.includes(tag))
        );
      }

      setFilteredData(filtered);
    }
  }, [searchValue, literatureList, selectedTags]);

  const { confirm } = Modal;
  const showDeleteConfirm = (ids: React.Key[], title?: string) => {
    confirm({
      title: (
        <span>
          确定要将
          <span className="text-primary">
            {title ? title : ids.length + "篇文献"}
          </span>
          彻底删除吗？
        </span>
      ),
      icon: <ExclamationCircleFilled />,
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      async onOk() {
        await deleteLiterature(ids);
        const updatedList = await getLiteratureList();
        setLiteratureList(updatedList as unknown as LiteratureType[]); // 更新 literatureList 状态
      },
      onCancel() {},
    });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const [isMutipleChoice, setIsMutipleChoice] = useState<boolean>(false);

  const action = `${GATEWAY}/api/v1/paper/upload`;
  const props: UploadProps = {
    accept: ".pdf",
    name: "file",
    action,
    multiple: true,
    onChange(info) {
      let newFileList = [...info.fileList];
      newFileList = newFileList.slice(-1);
      newFileList = newFileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      setFileList(newFileList);
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
          opt.onSuccess!({}, opt.file as unknown as XMLHttpRequest);
          message.success(`${(opt.file as RcFile).name} 上传成功`);
          getLiteratureList();
        })
        .catch(() => {
          opt.onError!(new Error("上传失败"));
        });
    },
  };

  const columns: ColumnsType<LiteratureType> = [
    {
      title: "文献名称",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      render: (title, record) => (
        <Link
          className="text-neutral-800 text-[15px] font-bold hover:text-primary/75"
          to={`/pdf?pdfId=${record.paper_id}`}
          target="_blank"
        >
          {title}
        </Link>
      ),
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      filters: literatureList
        ? Array.from(new Set(literatureList.flatMap((item) => item.tags)))
            .filter((tag) => tag !== null) // 过滤掉 null 的 tag
            .map((tag) => ({ text: tag, value: tag }))
        : [],
      onFilter: (value, record) => record.tags.includes(value as string),
      render: (tags: Array<string>) => (
        <div className="flex">
          {tags && tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      ),
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      render: (authors) => (
        <Popover
          placement="leftTop"
          trigger={"click"}
          title={<span className="text-stone-900 font-bold">查看作者信息</span>}
          content={
            <div className="border-t border-zinc-200 max-h-36 overflow-auto">
              {authors.map((author: string) => (
                <li
                  key={author}
                  className="text-slate-800 h-8 leading-8 pl-2 whitespace-nowrap overflow-hidden text-ellipsis rounded-sm hover:bg-gray-100 line-clamp-1"
                >
                  {author}
                </li>
              ))}
            </div>
          }
        >
          <div
            className="leading-10 h-10 text-neutral-900 hover:bg-neutral-100 cursor-pointer rounded-sm px-2 whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ display: "-webkit-box" }}
          >
            <AuthorList
              authors={authors}
              disabled={true}
              showAmount={1}
              className="[&>span:first-child]:text-stone-900 [&>span:first-child]:text-sm"
            />
          </div>
        </Popover>
      ),
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
      render: (comment) => (comment !== "null" ? comment : ""),
    },
    {
      title: "发布日期",
      dataIndex: "published_at",
      key: "published_at",
      render: (timeString: string) => {
        return new Date(timeString).toISOString().slice(0, 10);
      },
      sorter: (a: LiteratureType, b: LiteratureType) =>
        new Date(b.published_at!).getTime() -
        new Date(a.published_at!).getTime(),
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
              showDeleteConfirm([record.paper_id], record.title);
            }}
          >
            <DeleteOutlined />
            删除
          </Button>
          <Button
            type="link"
            className="text-primary hover:!text-[#e2a3ac] gap-1 pl-0 justify-start"
            onClick={() => {
              window.open(record.detail_url, "_blank");
            }}
          >
            <FileSearchOutlined />
            查看详情
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
                <Tooltip
                  title={literature.title}
                  placement="right"
                  key={literature.paper_id}
                >
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
                  placeholder="搜索标题、备注"
                  allowClear
                  prefix={<SearchOutlined />}
                  onSearch={onSearch}
                  onChange={(e) => setSearchValue(e.target.value)}
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
              fileList={fileList}
            >
              <Button type="primary" className="ml-4">
                添加
              </Button>
            </Upload>
          </div>
        </div>
        {selectedRowKeys.length > 0 && (
          <Space className="flex items-start gap-5">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(selectedRowKeys)}
              className="ml-3 mb-3"
            >
              删除
            </Button>
          </Space>
        )}
        <Table
          columns={columns}
          dataSource={filteredData}
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
