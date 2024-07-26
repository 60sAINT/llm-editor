import React, { useState } from "react";
import { dropdownMenuApi } from "../../api/DropdownMenu";
import { useDocState } from "../../utils/docProvider";
import { Modal, Select } from "antd";

const DownloadButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [template, setTemplate] =
    useState("电子科技大学研究生学位论文撰写规范");
  const { editor, title } = useDocState();

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleSelectChange = (value: string) => {
    setTemplate(value);
  };

  const handleConfirm = async () => {
    try {
      const html = await editor?.blocksToHTMLLossy();
      const res = await dropdownMenuApi.downloadDoc(html!, template);

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title || "无标题"}.docx`); // or the name you prefer
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download the file", error);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="block h-8 leading-8 !text-dropdown-text text-sm"
        onClick={handleClick}
      >
        下载文档
      </div>
      <Modal
        title="选择模板"
        open={isModalOpen}
        onOk={() => handleConfirm()}
        onCancel={() => setIsModalOpen(false)}
      >
        <Select
          className="w-full my-2"
          defaultValue="a"
          onChange={handleSelectChange}
          options={[
            {
              value: "a",
              label: "A大学研究生学位论文撰写规范",
            },
            {
              value: "b",
              label: "B大学本科生实习报告撰写规范",
            },
            {
              value: "c",
              label: "C大学核心通识教育课程结课论文规范",
            },
            {
              value: "d",
              label: "D大学支教报告规范",
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default DownloadButton;
