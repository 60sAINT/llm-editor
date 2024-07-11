import React from "react";

interface DocTitleProps {
  title: string;
  setTitle: (title: string) => void;
}

const DocTitle: React.FC<DocTitleProps> = ({ title, setTitle }) => {
  return (
    <div style={{ padding: "40px 54px 20px 54px" }}>
      <input
        type="text"
        placeholder="无标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-3xl font-bold outline-none flex-grow"
      />
    </div>
  );
};

export default DocTitle;
