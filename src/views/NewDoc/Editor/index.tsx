import React, { useEffect } from "react";
import "@blocknote/core/fonts/inter.css";
import {
  FormattingToolbarController,
  SideMenuController,
  createReactStyleSpec,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { Block, BlockNoteSchema, defaultStyleSpecs } from "@blocknote/core";

import { CustomSideMenu } from "./CustomSideMenu";
import { CustomFormattingToolbar } from "./CustomFormattingToolBar";
import { useDispatch } from "../utils/provider";
import { DisplayStyle } from "../utils/context";
import useRange from "../hooks/useRange";

const customSchema = BlockNoteSchema.create({
  styleSpecs: {
    // Adds all default styles.
    ...defaultStyleSpecs,
    font: createReactStyleSpec(
      {
        type: "font",
        propSchema: "string",
      },
      {
        render: (props) => (
          <span style={{ fontFamily: props.value }} ref={props.contentRef} />
        ),
      }
    ),
  },
});

const Editor = () => {
  const editor = useCreateBlockNote({
    schema: customSchema,
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to llm-editor!",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Comic Sans MS",
            styles: {
              font: "Comic Sans MS",
            },
          },
        ],
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

  const handleMouseUp = () => {
    const { startOffset, endOffset } = useRange();
    dispatch({ type: "SET_RANGE", payload: { startOffset, endOffset } });
    const blockToUpdate = editor.getTextCursorPosition().block as Block;
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
      onMouseUp={handleMouseUp}
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
