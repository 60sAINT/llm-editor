import React from "react";

interface ActionButtonProps {
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label }) => {
  // return <button className="text-gray-600">{label}</button>;
  return <button className="">{label}</button>;
};

export default ActionButton;
