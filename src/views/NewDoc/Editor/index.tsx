import React, { useEffect } from "react";
import "@blocknote/core/fonts/inter.css";
import {
  FormattingToolbarController,
  SideMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";

import { CustomSideMenu } from "./CustomSideMenu";
import { CustomFormattingToolbar } from "./CustomFormattingToolBar";
import { useDispatch } from "../utils/provider";
import { DisplayStyle } from "../utils/context";
import useRange from "../hooks/useRange";

const Editor = () => {
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to llm-editor!",
      },
    ],
    uploadFile: async (file: File) => {
      const base64String = await new Promise<string>((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result?.toString()!);
        };
      });
      return base64String;
    },
  });
  const dispatch = useDispatch();

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); // 阻止冒泡
    const { startOffset, endOffset } = useRange();
    dispatch({ type: "SET_RANGE", payload: { startOffset, endOffset } });
    const blockToUpdate = editor.getTextCursorPosition().block;
    dispatch({ type: "SET_BLOCK_TO_UPDATE", payload: blockToUpdate });
  };

  useEffect(() => {
    dispatch({ type: "SET_EDITOR", payload: editor });
  }, [editor]);

  // Renders the editor instance.
  return (
    <BlockNoteView
      editor={editor}
      sideMenu={false}
      formattingToolbar={false}
      onSelectionChange={() => {
        dispatch({ type: "SWITCH_VISIBILITY", payload: DisplayStyle.HIDDEN });
      }}
      onMouseUp={(e) => handleMouseUp(e)}
      onKeyDownCapture={(e) => {
        if (e.ctrlKey && e.key === "s") {
          e.preventDefault();
        }
      }}
    >
      <FormattingToolbarController
        formattingToolbar={CustomFormattingToolbar}
      />
      <SideMenuController sideMenu={CustomSideMenu} />
    </BlockNoteView>
  );
};

export default Editor;
