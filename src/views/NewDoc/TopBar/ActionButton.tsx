import React from "react";
import classNames from "classnames";
import { Tooltip } from "antd";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  if (className == "hover:cursor-not-allowed") {
    return (
      <Tooltip title="开发中">
        <button
          className={classNames(
            "px-2.5 w-16 h-6 text-xs hover:bg-neutral-200 rounded-sm",
            className
          )}
          onClick={onClick}
        >
          {label}
        </button>
      </Tooltip>
    );
  } else {
    return (
      <button
        className={classNames(
          "px-2.5 w-16 h-6 text-xs hover:bg-neutral-200 rounded-sm",
          className
        )}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
};

export default ActionButton;
