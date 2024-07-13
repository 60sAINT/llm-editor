import React from "react";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
  return (
    <button className="px-2.5 w-14 text-xs" onClick={onClick}>
      {label}
    </button>
  );
};

export default ActionButton;
