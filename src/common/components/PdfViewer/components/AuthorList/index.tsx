import classNames from "classnames";
import React, { useState } from "react";

export interface AuthorListProps {
  authors: Array<string>;
  disabled?: boolean;
  showAmount?: number;
  className?: string;
}
const AuthorList: React.FC<AuthorListProps> = ({
  authors,
  disabled,
  showAmount = 3,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classNames("max-w-[425px]", className)}>
      {/* <ul> */}
      {authors.slice(0, showAmount).map((author, index) => (
        <span
          key={index}
          className="after:content-['/'] after:px-2 text-xs text-neutral-500"
        >
          {author}
        </span>
      ))}
      {authors.length > showAmount && (
        <span>
          <button
            onClick={toggleExpanded}
            className="text-xs text-read-paper-blue"
            disabled={disabled}
          >
            {expanded ? "" : "...+" + (authors.length - showAmount)}
          </button>
        </span>
      )}
      {/* </ul> */}
      {expanded && (
        <>
          {authors.slice(showAmount).map((author, index) => (
            <span
              key={index}
              className="after:content-['/'] after:px-2 text-xs text-neutral-500"
            >
              {author}
            </span>
          ))}
          <span>
            <button
              onClick={toggleExpanded}
              className="text-[13px] text-read-paper-blue"
            >
              收起
            </button>
          </span>
        </>
      )}
    </div>
  );
};

export default AuthorList;
