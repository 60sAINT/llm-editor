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
      link.setAttribute("download", `${title}.docx`); // or the name you prefer
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
          defaultValue="电子科技大学研究生学位论文撰写规范"
          onChange={handleSelectChange}
          options={[
            {
              value: "电子科技大学研究生学位论文撰写规范",
              label: "电子科技大学研究生学位论文撰写规范",
            },
            {
              value: "电子科技大学研究生学位论文撰写规范2",
              label: "电子科技大学研究生学位论文撰写规范2",
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default DownloadButton;
