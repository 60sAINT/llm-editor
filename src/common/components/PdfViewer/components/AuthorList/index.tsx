import React, { useState } from "react";

export interface AuthorListProps {
  authors: Array<string>;
  disabled?: boolean;
}
const AuthorList: React.FC<AuthorListProps> = ({ authors, disabled }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-[425px]">
      {/* <ul> */}
      {authors.slice(0, 3).map((author, index) => (
        <span
          key={index}
          className="after:content-['/'] after:px-2 text-xs text-neutral-500"
        >
          {author}
        </span>
      ))}
      {authors.length > 3 && (
        <span>
          <button
            onClick={toggleExpanded}
            className="text-xs text-read-paper-blue"
            disabled={disabled}
          >
            {expanded ? "" : "...+" + (authors.length - 3)}
          </button>
        </span>
      )}
      {/* </ul> */}
      {expanded && (
        <>
          {authors.slice(3).map((author, index) => (
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
