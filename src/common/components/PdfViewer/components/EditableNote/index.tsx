import React, { useState } from "react";
import { Input } from "antd";
import { useRequest } from "@/hooks/useRequest";
import { pdfApi } from "../../api";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/provider/authProvider";

export interface EditableNoteProps {
  initialNote: string | null;
}

const EditableNote: React.FC<EditableNoteProps> = ({ initialNote }) => {
  const [searchParams] = useSearchParams();
  const pdfId = searchParams.get("pdfId");
  const { token } = useAuth();
  const { runAsync: updateNote } = useRequest(async (newComment) => {
    const res = await pdfApi.updateComment(
      `Bearer ${token}` || "",
      pdfId!,
      newComment
    );
    return res;
  });

  const [note, setNote] = useState(initialNote || "");
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleNoteSave = () => {
    setEditing(false);
    updateNote(note);
  };

  return (
    <div
      style={{
        backgroundColor: hover ? "#f0f0f0" : "transparent",
        padding: "8px",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setEditing(true)}
      className="hover:bg-neutral-100 p-"
    >
      {!editing ? (
        <div className="text-black/25">{note || "点击添加备注"}</div>
      ) : (
        <Input
          value={note}
          onChange={handleNoteChange}
          onBlur={handleNoteSave}
          onPressEnter={handleNoteSave}
          autoFocus
        />
      )}
    </div>
  );
};

export default EditableNote;
