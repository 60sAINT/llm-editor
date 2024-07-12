import React, { useState } from "react";
import Modal from "./Modal";
import { dropdownMenuApi } from "../../api/DropdownMenu";
import { useNewDocState } from "../../utils/provider";

const DownloadButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { editor } = useNewDocState();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async (template: string) => {
    try {
      const html = await editor?.blocksToHTMLLossy();
      const res = await dropdownMenuApi.downloadDoc(html!, template);

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "document.docx"); // or the name you prefer
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download the file", error);
    }
  };

  return (
    <>
      <a
        href="#"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        onClick={handleClick}
      >
        下载文档
      </a>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default DownloadButton;
