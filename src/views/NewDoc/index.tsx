import React from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const NewDoc: React.FC = () => {
  const editor = useCreateBlockNote();
  return <BlockNoteView editor={editor} />;
};

export default NewDoc;
