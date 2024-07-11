import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (template: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedTemplate, setSelectedTemplate] =
    React.useState("电子科技大学研究生学位论文撰写规范");

  const handleConfirm = () => {
    onConfirm(selectedTemplate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-1/3">
        <h2 className="text-lg font-semibold mb-4">选择模板</h2>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="电子科技大学研究生学位论文撰写规范">
            电子科技大学研究生学位论文撰写规范
          </option>
          <option value="电子科技大学学士学位论文撰写规范">
            电子科技大学学士学位论文撰写规范
          </option>
        </select>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
