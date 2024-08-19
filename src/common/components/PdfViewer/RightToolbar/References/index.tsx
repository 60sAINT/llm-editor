import React, { useState } from "react";
import { PaperInformationType, ReferenceType } from "../../interface";
import { Input, Popover, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export interface ReferencesProps {
  paperInformation: PaperInformationType;
}

export const References: React.FC<ReferencesProps> = ({ paperInformation }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredReferences, setFilteredReferences] = useState<ReferenceType[]>(
    paperInformation.references.references
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setFilteredReferences(
        paperInformation.references.references.filter((reference) =>
          reference.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredReferences(paperInformation.references.references);
    }
  };

  return (
    <div className="py-5 px-2.5 w-full">
      <div className="flex items-center mb-2 pl-2">
        <span className="mr-2">{filteredReferences.length} 条参考文献：</span>
      </div>
      <div className="pl-2">
        <Input
          placeholder="搜索参考文献"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-2 w-full"
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="overflow-y-auto max-h-96">
        {filteredReferences.length > 0 ? (
          filteredReferences.map((reference, index) => (
            <Popover
              placement="leftTop"
              title={
                <Tooltip title={reference.title}>
                  <a
                    className="text-read-paper-blue max-w-[425px] overflow-hidden text-ellipsis line-clamp-1 inline-block"
                    style={{ display: "-webkit-box" }}
                    onClick={() => {
                      window.open(reference.detail_url, "_blank");
                    }}
                  >
                    {reference.title}
                  </a>
                </Tooltip>
              }
              content={
                <div className="mb-1">
                  <div>
                    <span
                      key={index}
                      className="after:content-[''] after:px-1 text-xs text-neutral-500"
                    >
                      {reference.author}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {" · "}
                      <span className="pl-2">
                        {new Date(reference.published_at)
                          .toISOString()
                          .slice(0, 10)}
                      </span>
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="max-h-36 overflow-auto text-neutral-800 text-[13px]">
                      出版社：{reference.publisher}
                    </p>
                  </div>
                </div>
              }
            >
              <div
                key={reference.key}
                onClick={() => {
                  window.open(reference.detail_url, "_blank");
                }}
                className="leading-9 h-9 text-neutral-900 hover:bg-neutral-100 cursor-pointer rounded-sm px-2 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                [{index + 1}] {reference.title || "No title"} -{" "}
                {reference.author}
              </div>
            </Popover>
          ))
        ) : (
          <div className="text-center text-neutral-400">
            没有找到相关参考文献
          </div>
        )}
      </div>
    </div>
  );
};
