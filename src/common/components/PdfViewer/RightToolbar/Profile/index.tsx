import { Button, Col, Popover, Row, Skeleton, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { ProfileProps } from "../../interface";
import AuthorList from "../../components/AuthorList";
import TruncatedText from "../../components/TruncatedText";
import EditableTags from "../../components/EditableTags";
import EditableNote from "../../components/EditableNote";
import { useRequest } from "@/hooks/useRequest";
import { sideMenuApi } from "@/views/NewDoc/api/FormattingToolBar";
import { useAuth } from "@/provider/authProvider";

export const Profile: React.FC<ProfileProps> = ({ paperInformation }) => {
  const [displayTransFrame, setDisplayTransFrame] = useState<boolean>(false);
  const [translation, setTranslation] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>("");
  const { token } = useAuth();
  const { runAsync: translateText } = useRequest(async (tar_lang, text) => {
    const res = await sideMenuApi.textTranslate(tar_lang, text, token!);
    return res;
  });
  useEffect(() => {
    if (translation) {
      setIsTyping(true); // 开始打字时设置为 true
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + translation[index]);
        index++;
        if (index >= translation.length) {
          clearInterval(interval);
          setIsTyping(false); // 打字结束时设置为 false
        }
      }, 50); // 每50ms显示一个字符
      return () => clearInterval(interval);
    } else {
      return;
    }
  }, [translation]);
  return (
    <div className="py-5 px-2.5">
      <Popover
        placement="leftTop"
        title={
          <Tooltip title={paperInformation.title}>
            <a
              className="text-read-paper-blue max-w-[425px] overflow-hidden text-ellipsis line-clamp-1 inline-block"
              style={{ display: "-webkit-box" }}
              onClick={() => {
                window.open(paperInformation.detail_url, "_blank");
              }}
            >
              {paperInformation.title}
            </a>
          </Tooltip>
        }
        content={
          <div className="mb-1">
            <div>
              <AuthorList authors={paperInformation.author} />
            </div>
            <span className="text-xs text-neutral-500">
              {" · " +
                new Date(paperInformation.published_at)
                  .toISOString()
                  .slice(0, 10)}
            </span>
            <div className="mt-4">
              <TruncatedText text={paperInformation.abstract} />
            </div>
          </div>
        }
      >
        <div className="leading-6 min-h-10 h-auto text-neutral-900 hover:bg-neutral-100 cursor-pointer rounded-sm px-2">
          {paperInformation.title}
        </div>
      </Popover>
      <Popover
        placement="leftTop"
        title={<span className="text-stone-900 font-bold">查看作者信息</span>}
        content={
          <div className="border-t border-zinc-200 max-h-36 overflow-auto">
            {paperInformation.author.map((author) => (
              <li className="text-slate-800 h-8 leading-8 pl-2 whitespace-nowrap overflow-hidden text-ellipsis rounded-sm hover:bg-gray-100">
                {author}
              </li>
            ))}
          </div>
        }
      >
        <div className="leading-10 h-10 text-neutral-900 hover:bg-neutral-100 cursor-pointer rounded-sm px-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {/* {paperInformation.author} */}
          <AuthorList authors={paperInformation.author} disabled={true} />
        </div>
      </Popover>
      <Row className="pl-2 flex items-center h-10">
        <Col span={4}>
          <div className="text-black opacity-45">DOI</div>
        </Col>
        <Col span={20}>
          <div className="pl-2 text-neutral-900">{paperInformation.doi}</div>
        </Col>
      </Row>
      <Row className="pl-2 flex items-center h-10">
        <Col span={4}>
          <div className="text-black opacity-45">发布时间</div>
        </Col>
        <Col span={20}>
          <div className="pl-2 text-neutral-900">
            {new Date(paperInformation.published_at).toISOString().slice(0, 10)}
          </div>
        </Col>
      </Row>
      <Row className="pl-2 flex items-center h-auto py-1">
        <Col span={4}>
          <div className="text-black opacity-45">标签</div>
        </Col>
        <Col span={20}>
          <EditableTags initialTags={paperInformation.tags} />
        </Col>
      </Row>
      <Row className="pl-2 flex items-center h-10">
        <Col span={4}>
          <div className="text-black opacity-45">备注</div>
        </Col>
        <Col span={20}>
          <div className="pl-2 text-neutral-900">
            <EditableNote initialNote={paperInformation.comment} />
          </div>
        </Col>
      </Row>
      <Row className="mt-2 pl-2 flex items-top">
        <Col span={4}>
          <div className="text-black opacity-45">摘要</div>
        </Col>
        <Col span={20}>
          <div className="text-neutral-900 pl-2">
            <TruncatedText
              text={paperInformation.abstract}
              className="[&>p]:max-h-none"
            />
            <Button
              className="mt-2"
              onClick={async () => {
                setDisplayTransFrame(true);
                const response = await translateText(
                  "chinese",
                  paperInformation.abstract
                );
                const reader = response!
                  .pipeThrough(new TextDecoderStream())
                  .getReader();
                let fullText = "";
                while (true) {
                  const { done, value } = await reader.read();
                  if (value) {
                    fullText += value;
                    setTranslation(fullText);
                  }
                  if (done) {
                    break;
                  }
                }
              }}
            >
              翻译摘要
            </Button>
            {displayTransFrame && (
              <div className="py-2 border-blue-100 border rounded mt-2 px-2.5 text-base">
                <Skeleton loading={!displayedText} active title={false}>
                  {displayedText}
                  {isTyping && <span className="blinking-cursor">|</span>}
                </Skeleton>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
