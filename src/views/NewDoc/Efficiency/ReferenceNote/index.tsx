import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/provider/authProvider";
import { literatureApi } from "@/views/Home/LiteratureManage/api";
import { Button, Popover, Skeleton, Tag, Tooltip } from "antd";
import AuthorList from "@/common/components/PdfViewer/components/AuthorList";
import React, { useState } from "react";
import TruncatedText from "@/common/components/PdfViewer/components/TruncatedText";
import EditableNote from "@/common/components/PdfViewer/components/EditableNote";
import { docApi } from "../../api/Doc";
import { Note } from "./Note";
import { showError } from "@/common/utils/message";
import "./index.css";

export const ReferenceNote = () => {
  const { token } = useAuth();
  const [showNote, setShowNote] = useState<boolean>(false);
  const [curLiteratureTitle, setCurLiteratureTitle] = useState<string>("");
  const { data: literatureList, loading: literatureListLoading } = useRequest(
    async () => {
      const res = await literatureApi.getLiteratureList(
        `Bearer ${token}` || ""
      );
      return res;
    },
    { manual: false }
  );
  const {
    runAsync: getDocContent,
    data: docContent,
    loading: getDocContentLoading,
  } = useRequest(async (docId) => {
    const res = await docApi.getDocByDocId(`Bearer ${token}` || "", docId);
    return res.data.doc.content;
  });
  return (
    <Skeleton
      active
      title={false}
      className="pb-3 px-3 pt-1.5"
      paragraph={{ rows: 5 }}
      loading={literatureListLoading}
    >
      {!showNote ? (
        literatureList?.map((literature, index) => (
          <Popover
            placement="left"
            title={
              <Tooltip title={literature.title}>
                <a
                  className="text-read-paper-blue max-w-[425px] overflow-hidden text-ellipsis line-clamp-1 inline-block"
                  style={{ display: "-webkit-box" }}
                  onClick={() => {
                    window.open(literature.detail_url, "_blank");
                  }}
                >
                  {literature.title}
                </a>
              </Tooltip>
            }
            content={
              <div className="mb-1">
                <div>
                  <AuthorList authors={literature.author} />
                </div>
                <span className="text-xs text-neutral-500">
                  {" · " +
                    new Date(literature.published_at)
                      .toISOString()
                      .slice(0, 10)}
                </span>
                <div className="mt-2.5">
                  <TruncatedText text={literature.abstract || ""} />
                </div>
                <div className="mt-2.5">
                  <p className="max-h-36 overflow-auto text-neutral-800 text-[13px]">
                    出版社：{literature.publisher}
                  </p>
                </div>
                <div className="mt-2.5">
                  <div className="text-neutral-900 text-[13px]">
                    文献唯一标识：{literature.doi}
                  </div>
                </div>
                <div className="mt-2.5">
                  <p className="max-h-36 overflow-auto text-neutral-800 text-[13px]">
                    共 {literature.page_count} 页
                  </p>
                </div>
                {literature.tags && (
                  <div className="mt-2.5">
                    <div className="flex">
                      {literature.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-2.5">
                  <div className="text-neutral-900">
                    <EditableNote initialNote={literature.comment} />
                  </div>
                </div>
                <div className="mt-2.5 text-xs text-neutral-500">
                  {"上次阅读时间：" +
                    new Date(literature.last_read_at)
                      .toISOString()
                      .slice(0, 10)}
                </div>
              </div>
            }
          >
            <div
              key={literature.key}
              onClick={() => {
                if (!literature.doc_id) {
                  showError("该文献暂无笔记");
                  return;
                }
                setCurLiteratureTitle(literature.title);
                setShowNote(true);
                getDocContent(literature.doc_id);
              }}
              className="leading-9 h-9 text-neutral-900 hover:bg-neutral-100 cursor-pointer rounded-sm px-2 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              [{index + 1}] {literature.title || "No title"} -{" "}
              {
                <AuthorList
                  authors={literature.author}
                  showAmount={1}
                  className="[&>span:first-child]:text-stone-900 [&>span:first-child]:text-sm"
                />
              }
            </div>
          </Popover>
        ))
      ) : (
        <>
          <div className="flex items-center justify-center relative mb-4">
            <div className="text-zinc-500 font-semibold flex justify-center items-center">
              <Button
                onClick={() => {
                  setShowNote(false);
                  setCurLiteratureTitle("");
                }}
                size="small"
              >
                返回
              </Button>
              <Tooltip title={curLiteratureTitle}>
                <div
                  className="ml-1 overflow-hidden text-ellipsis line-clamp-1"
                  style={{ display: "-webkit-box" }}
                >
                  《{curLiteratureTitle}》
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="shadow-interest-search-results mx-4 my-4 pt-4 border-t border-transparent overflow-hidden">
            <Skeleton active loading={getDocContentLoading} className="px-6">
              {docContent && <Note content={docContent} />}
            </Skeleton>
          </div>
        </>
      )}
    </Skeleton>
  );
};
