import React from "react";
import PaperlessButton from "./PaperlessButton";
import HistoryButton from "./HistoryButton";
import ShareButton from "./ShareButton";
import DownloadButton from "./DownloadButton";
import DeleteButton from "./DeleteButton";
import { Dropdown, MenuProps, Tooltip } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  FileOutlined,
  HistoryOutlined,
  SaveOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import SaveCurrFormatButton from "./SaveCurrFormatButton";

const DropdownMenu = () => {
  const items: MenuProps["items"] = [
    {
      key: "saveCurrFormat",
      icon: <SaveOutlined className="text-dropdown-text !text-sm" />,
      label: <SaveCurrFormatButton />,
    },
    {
      key: "paperless",
      icon: <FileOutlined className="text-dropdown-text !text-sm" />,
      label: <PaperlessButton />,
    },
    {
      key: "history",
      icon: <HistoryOutlined className="text-dropdown-text !text-sm" />,
      label: <HistoryButton />,
    },
    {
      key: "share",
      icon: <ShareAltOutlined className="text-dropdown-text !text-sm" />,
      label: <ShareButton />,
    },
    {
      key: "download",
      icon: <DownloadOutlined className="text-dropdown-text !text-sm" />,
      label: <DownloadButton />,
    },
    {
      key: "delete",
      icon: <DeleteOutlined className="text-dropdown-text !text-sm" />,
      label: <DeleteButton />,
    },
  ];
  const dropdownRender = () => (
    <ul className="w-52 p-1 bg-white min-w-36 rounded-md border border-zinc-100 text-zinc-800 shadow-[0_2px_12px_0_rgba(0,0,0,.1)]">
      {items.map((item) =>
        item?.key == "download" ? (
          <li
            key={item!.key}
            className="px-3 py-1 text-black/90 leading-10 h-10 cursor-pointer transition-all rounded flex items-center hover:bg-neutral-100"
          >
            {
              (item as {
                key: string;
                icon: React.ReactNode;
                label: React.ReactNode;
              })!.icon
            }
            <span className="ml-3">
              {
                (item as {
                  key: string;
                  icon: React.ReactNode;
                  label: React.ReactNode;
                })!.label
              }
            </span>
          </li>
        ) : (
          <Tooltip title="开发中">
            <li
              key={item!.key}
              className="cursor-not-allowed px-3 py-1 text-black/90 leading-10 h-10 transition-all rounded flex items-center hover:bg-neutral-100"
            >
              {
                (item as {
                  key: string;
                  icon: React.ReactNode;
                  label: React.ReactNode;
                })!.icon
              }
              <span className="ml-3">
                {
                  (item as {
                    key: string;
                    icon: React.ReactNode;
                    label: React.ReactNode;
                  })!.label
                }
              </span>
            </li>
          </Tooltip>
        )
      )}
    </ul>
  );

  return (
    // TODO: 图标样式还需要调整
    <>
      <Dropdown
        className="text-gray-600 hover:bg-neutral-200 !w-14 rounded-sm text-center"
        menu={{ items }}
        placement="bottom"
        trigger={["click"]}
        dropdownRender={dropdownRender}
        // onClick={handleButtonClick}
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 10a2 2 0 114 0 2 2 0 01-4 0zM2 10a6 6 0 1112 0A6 6 0 012 10zM10 2a6 6 0 100 12A6 6 0 0010 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Dropdown>
    </>
  );
};

export default DropdownMenu;
