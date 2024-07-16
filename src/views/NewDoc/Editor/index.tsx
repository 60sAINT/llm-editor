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
import { useDispatch } from "../utils/provider";
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

let showTextButton = true;
let showOcrButton = true;
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
const CustomFormattingToolbar: FunctionComponent<
  FormattingToolbarProps
> = () => {
  // const state = useNewDocState();
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

const Editor = () => {
  const editor = useCreateBlockNote({
    schema: customSchema,
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to llm-editor!",
      },
      {
        type: "image",
        props: {
          url: "https://pic3.zhimg.com/v2-a2184227abddb98b3b7405e6033651ff_r.jpg",
          caption:
            "From https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
        },
      },
      {
        type: "video",
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
  const docDispatch = useDocDispatch();

  const handleMouseUp = () => {
    const { startOffset, endOffset } = useRange();
    dispatch({ type: "SET_RANGE", payload: { startOffset, endOffset } });
    const blockToUpdate = editor.getTextCursorPosition().block as Block;
    dispatch({ type: "SET_BLOCK_TO_UPDATE", payload: blockToUpdate });
  };
  if (editor.getTextCursorPosition().block.type == "image") {
    showTextButton = false;
    showOcrButton = true;
  } else {
    showTextButton = true;
    showOcrButton = false;
  }

  useEffect(() => {
    dispatch({ type: "SET_EDITOR", payload: editor });
    docDispatch({
      type: "SAVE_DOC_CONTENT",
      payload: JSON.stringify(editor.document),
    });
  }, [editor]);

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
        }
      }}
      onChange={() => {
        docDispatch({ type: "SAVE_DOC_STATUS", payload: IsSavedType.False });
        docDispatch({
          type: "SAVE_DOC_CONTENT",
          payload: JSON.stringify(editor.document),
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
