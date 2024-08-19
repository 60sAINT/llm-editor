import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import React from "react";

export interface NoteProps {
  content: any;
}

export const Note: React.FC<NoteProps> = ({ content }) => {
  const editor = useCreateBlockNote({
    initialContent: content || [
      {
        type: "paragraph",
        content: ["暂无笔记"],
      },
    ],
  });
  return (
    <BlockNoteView
      editor={editor}
      editable={false}
      className="[&_.bn-editor]:px-6"
    />
  );
};
