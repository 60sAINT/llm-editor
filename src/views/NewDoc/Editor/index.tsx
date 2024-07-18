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
import {
  Block,
  BlockNoteEditor,
  BlockNoteSchema,
  defaultStyleSpecs,
} from "@blocknote/core";
import { FunctionComponent } from "react";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarProps,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
} from "@blocknote/react";

import { CustomSideMenu } from "./CustomSideMenu";
// import { CustomFormattingToolbar } from "./CustomFormattingToolBar";
import { useDispatch, useNewDocState } from "../utils/provider";
import { DisplayStyle } from "../utils/context";
import useRange from "../hooks/useRange";
import { ContinuationButton } from "./CustomFormattingToolBar/ContinuationButton";
import DisplayFrame from "./CustomFormattingToolBar/DisplayFrame";
import { PolishButton } from "./CustomFormattingToolBar/PolishButton";
import { RevisionButton } from "./CustomFormattingToolBar/RevisionButton";
import { SummaryButton } from "./CustomFormattingToolBar/SummaryButton";
import { TranslationButton } from "./CustomFormattingToolBar/TranslationButton";
import { OcrButton } from "./CustomFormattingToolBar/OcrButton";
import { useDocDispatch } from "../utils/docProvider";
import { IsSavedType } from "../utils/docContext";
import { OcrFrame } from "./CustomFormattingToolBar/OcrFrame";
import "./index.css";

let showTextButton = true;
let showOcrButton = true;
const customSchema = BlockNoteSchema.create({
  styleSpecs: {
    // Adds all default styles.
    ...defaultStyleSpecs,
    fontFamily: createReactStyleSpec(
      {
        type: "fontFamily",
        propSchema: "string",
      },
      {
        render: (props) => (
          <span style={{ fontFamily: props.value }} ref={props.contentRef} />
        ),
      }
    ),
    fontSize: createReactStyleSpec(
      {
        type: "fontSize",
        propSchema: "string",
      },
      {
        render: (props) => (
          <span style={{ fontSize: props.value }} ref={props.contentRef} />
        ),
      }
    ),
  },
});
const CustomFormattingToolbar: FunctionComponent<
  FormattingToolbarProps
> = () => {
  return (
    <div>
      <FormattingToolbar>
        <BlockTypeSelect key={"blockTypeSelect"} />

        <FileCaptionButton key={"fileCaptionButton"} />
        <FileReplaceButton key={"replaceFileButton"} />

        <BasicTextStyleButton basicTextStyle={"bold"} key={"boldStyleButton"} />
        <BasicTextStyleButton
          basicTextStyle={"italic"}
          key={"italicStyleButton"}
        />
        <BasicTextStyleButton
          basicTextStyle={"underline"}
          key={"underlineStyleButton"}
        />
        <BasicTextStyleButton
          basicTextStyle={"strike"}
          key={"strikeStyleButton"}
        />
        {/* Extra button to toggle code styles */}
        <BasicTextStyleButton key={"codeStyleButton"} basicTextStyle={"code"} />

        <TextAlignButton textAlignment={"left"} key={"textAlignLeftButton"} />
        <TextAlignButton
          textAlignment={"center"}
          key={"textAlignCenterButton"}
        />
        <TextAlignButton textAlignment={"right"} key={"textAlignRightButton"} />

        <ColorStyleButton key={"colorStyleButton"} />

        <NestBlockButton key={"nestBlockButton"} />
        <UnnestBlockButton key={"unnestBlockButton"} />

        <CreateLinkButton key={"createLinkButton"} />

        {/* custom buttons */}
        {showTextButton ? (
          <>
            <ContinuationButton key={"textContinuationButton"} />
            <TranslationButton key={"textTranslationButton"} />
            <PolishButton key={"textPolishButton"} />
            <RevisionButton key={"textRevisionButton"} />
            <SummaryButton key={"textSummaryButton"} />
          </>
        ) : null}
        {showOcrButton ? <OcrButton key={"imageOcrButton"} /> : null}
      </FormattingToolbar>
      <DisplayFrame />
      <OcrFrame />
    </div>
  );
};

interface EditorProps {
  docData?: any;
  fullFormat?: any;
  getEditor?: (editor: BlockNoteEditor) => void;
}
const Editor: React.FC<EditorProps> = ({ docData, fullFormat, getEditor }) => {
  const dispatch = useDispatch();
  const docDispatch = useDocDispatch();
  const { formatKeyDown } = useNewDocState();
  const initialContent = docData?.content
    ? docData?.content
    : [{ type: "paragraph", content: "Welcom to llm editor!" }];
  const editor = useCreateBlockNote({
    schema: customSchema,
    initialContent,
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

  const handleMouseUp = () => {
    const { startOffset, endOffset } = useRange();
    dispatch({ type: "SET_RANGE", payload: { startOffset, endOffset } });
    const blockToUpdate = editor?.getTextCursorPosition().block as Block;
    dispatch({ type: "SET_BLOCK_TO_UPDATE", payload: blockToUpdate });
  };
  if (editor?.getTextCursorPosition().block.type == "image") {
    showTextButton = false;
    showOcrButton = true;
  } else {
    showTextButton = true;
    showOcrButton = false;
  }

  useEffect(() => {
    dispatch({ type: "SET_EDITOR", payload: editor });
    docDispatch({ type: "SET_EDITOR", payload: editor });
    docDispatch({
      type: "SAVE_DOC_CONTENT",
      payload: JSON.stringify(editor?.document),
    });
    getEditor?.(editor);
  }, [editor]);
  useEffect(() => {
    if (formatKeyDown) {
      editor.forEachBlock((block) => {
        if (block.type == "heading" && block.props.level == 1) {
          const newStyles = {
            fontFamily: fullFormat
              ? fullFormat["heading1-fontFamily"]
              : "-apple-system",
            fontSize: fullFormat ? fullFormat["heading1-fontSize"] : 36,
          };
          const newContent = [
            {
              ...block.content[0],
              styles: newStyles,
            },
          ];
          editor.updateBlock(block, { content: newContent });
        } else if (block.type == "heading" && block.props.level == 2) {
          const newStyles = {
            fontFamily: fullFormat
              ? fullFormat["heading2-fontFamily"]
              : "-apple-system",
            fontSize: fullFormat ? fullFormat["heading2-fontSize"] : 24,
          };
          const newContent = [
            {
              ...block.content[0],
              styles: newStyles,
            },
          ];
          editor.updateBlock(block, { content: newContent });
        } else if (block.type == "heading" && block.props.level == 3) {
          const newStyles = {
            fontFamily: fullFormat
              ? fullFormat["heading3-fontFamily"]
              : "-apple-system",
            fontSize: fullFormat ? fullFormat["heading3-fontSize"] : 16,
          };
          const newContent = [
            {
              ...block.content[0],
              styles: newStyles,
            },
          ];
          editor.updateBlock(block, { content: newContent });
        } else if (block.type == "paragraph") {
          const newStyles = {
            fontFamily: fullFormat
              ? fullFormat["paragraph-fontFamily"]
              : "-apple-system",
            fontSize: fullFormat ? fullFormat["paragraph-fontSize"] : 12,
          };
          const newContent = [
            {
              ...block.content[0],
              styles: newStyles,
            },
          ];
          editor.updateBlock(block, { content: newContent });
        }
        return true;
      });
    }
    dispatch({ type: "FORMAT_KEY_DOWN" });
  }, [fullFormat]);

  // Renders the editor instance.
  return (
    <BlockNoteView
      editor={editor}
      sideMenu={false}
      formattingToolbar={false}
      onSelectionChange={() => {
        dispatch({ type: "SWITCH_VISIBILITY", payload: DisplayStyle.HIDDEN });
        dispatch({ type: "OCR_FRAME_DISPLAY", payload: false });
      }}
      onMouseUp={handleMouseUp}
      onKeyDownCapture={(e) => {
        if (e.ctrlKey && e.key === "s") {
          e.preventDefault();
          dispatch({ type: "SAVE_KEY_DOWN" });
        }
      }}
      onChange={() => {
        docDispatch({ type: "SAVE_DOC_STATUS", payload: IsSavedType.False });
        docDispatch({
          type: "SAVE_DOC_CONTENT",
          payload: JSON.stringify(editor?.document),
        });
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
