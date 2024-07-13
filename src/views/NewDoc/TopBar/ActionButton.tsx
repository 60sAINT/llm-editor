import React from "react";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="px-2.5 w-16 h-6 text-xs hover:bg-neutral-200 rounded-sm"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
