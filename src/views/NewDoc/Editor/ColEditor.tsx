"use client";

import React, { useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import {
  FormattingToolbarController,
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
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";

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
import { DetectionButton } from "./CustomFormattingToolBar/DetectionButton";
import { VideoDetectionButton } from "./CustomFormattingToolBar/VideoDetectionButton";
import { VideoDetectionFrame } from "./CustomFormattingToolBar/VideoDetectionFrame";
import { RecognitionButton } from "./CustomFormattingToolBar/RecognitionButton";
import { AudioRecognitionButton } from "./CustomFormattingToolBar/AudioRecognitionButton";
import { AudioRecognitionFrame } from "./CustomFormattingToolBar/AudioRecognitionFrame";
import { useRequest } from "@/hooks/useRequest";
import { defaultApi } from "../api";
import { docApi } from "../api/Doc";
import { useAuth } from "@/provider/authProvider";

let showTextButton = true;
let showOcrButton = true;
let showVideoButton = true;
let showDetectionButton = true;
let showAudioButton = true;
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
    marginTop: createReactStyleSpec(
      {
        type: "marginTop",
        propSchema: "string",
      },
      {
        render: (props) => (
          <span style={{ marginTop: props.value }} ref={props.contentRef} />
        ),
      }
    ),
    marginBottom: createReactStyleSpec(
      {
        type: "marginBottom",
        propSchema: "string",
      },
      {
        render: (props) => (
          <span style={{ marginBottom: props.value }} ref={props.contentRef} />
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
        {showDetectionButton ? (
          <DetectionButton key={"detectionButton"} />
        ) : null}
        {showVideoButton ? (
          <>
            <VideoDetectionButton key={"videoDetectionButton"} />
            <RecognitionButton key={"recognitionButton"} />
          </>
        ) : null}
        {showAudioButton ? (
          <AudioRecognitionButton key={"audioRecognitionButton"} />
        ) : null}
      </FormattingToolbar>
      <DisplayFrame />
      <OcrFrame />
      <VideoDetectionFrame />
      <AudioRecognitionFrame />
    </div>
  );
};

interface EditorProps {
  fullFormat?: any;
  getEditor: (editor: BlockNoteEditor) => void;
  docData: any;
}
const ColEditor: React.FC<EditorProps> = ({
  docData,
  fullFormat,
  getEditor,
}) => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();
  const { token } = useAuth();
  const { runAsync: saveDoc } = useRequest(
    async ({ docId, title, content }) => {
      const res = await docApi.updateDoc({
        doc_id: docId,
        title,
        content,
        token: `Bearer ${token}` || "",
      });
      return res;
    }
  );

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  useEffect(() => {
    // 返回一个清理函数，在组件卸载时执行
    return () => {
      saveDoc({
        docId: docData.doc_id,
        title: docData.title,
        content: JSON.stringify(docData.content),
      });
    };
  }, []);

  if (!doc || !provider) {
    return null;
  }
  // Renders the editor instance.
  return (
    <BlockNote
      doc={doc}
      provider={provider}
      getEditor={getEditor}
      fullFormat={fullFormat}
    />
  );
};
export default ColEditor;

type BlockNoteProps = {
  doc: Y.Doc;
  provider: any;
  getEditor: any;
  fullFormat: any;
};
function BlockNote({ doc, provider, getEditor, fullFormat }: BlockNoteProps) {
  const dispatch = useDispatch();
  const docDispatch = useDocDispatch();
  const { formatKeyDown } = useNewDocState();
  const { runAsync: putObject } = useRequest(
    async (file: File, presignedUrl: string) => {
      await defaultApi.putObject(file, presignedUrl);
    }
  );
  const self = useSelf();

  const editor = useCreateBlockNote({
    schema: customSchema,
    uploadFile: async (file: File) => {
      const data = await defaultApi.getUrl();
      const { upload_url: uploadUrl, public_url: publicUrl } = data.data;
      await putObject(file, uploadUrl);
      return publicUrl;
    },
    collaboration: {
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),
      // Information for this user:
      user: {
        name: self.info?.name!,
        color: self.info?.color! as string,
      },
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
    showDetectionButton = true;
    showVideoButton = false;
    showAudioButton = false;
  } else if (editor?.getTextCursorPosition().block.type == "video") {
    showTextButton = false;
    showOcrButton = false;
    showDetectionButton = false;
    showVideoButton = true;
    showAudioButton = false;
  } else if (editor?.getTextCursorPosition().block.type == "audio") {
    showTextButton = false;
    showOcrButton = false;
    showDetectionButton = false;
    showVideoButton = false;
    showAudioButton = true;
  } else {
    showTextButton = true;
    showOcrButton = false;
    showDetectionButton = false;
    showVideoButton = false;
    showAudioButton = false;
  }

  useEffect(() => {
    dispatch({ type: "SET_EDITOR", payload: editor });
    docDispatch({ type: "SET_EDITOR", payload: editor });
    docDispatch({
      type: "SAVE_DOC_CONTENT",
      payload: JSON.stringify(editor?.document),
    });
    if (getEditor) {
      getEditor(editor);
    }
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
            marginTop: fullFormat
              ? fullFormat["segSpacing-before-heading1"]
              : 1,
            marginBottom: fullFormat
              ? fullFormat["segSpacing-after-heading1"]
              : 1,
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
            marginTop: fullFormat
              ? fullFormat["segSpacing-before-heading2"]
              : 1,
            marginBottom: fullFormat
              ? fullFormat["segSpacing-after-heading2"]
              : 1,
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
            marginTop: fullFormat
              ? fullFormat["segSpacing-before-heading3"]
              : 1,
            marginBottom: fullFormat
              ? fullFormat["segSpacing-after-heading3"]
              : 1,
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
            marginTop: fullFormat
              ? fullFormat["segSpacing-before-paragraph"]
              : 1,
            marginBottom: fullFormat
              ? fullFormat["segSpacing-after-paragraph"]
              : 1,
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

  const search = window.location.search;
  const urlParams = new URLSearchParams(search.split("?")[1]);
  const docId = urlParams.get("doc_id");
  const { token } = useAuth();
  const { runAsync: getDocInfo } = useRequest(async () => {
    const res = await docApi.getDocByDocId(`Bearer ${token}` || "", docId!);
    return res.data.doc;
  });
  useEffect(() => {
    if (docId) getDocInfo();
  }, [docId]);

  const { data: permission } = useRequest(
    async () => {
      const res = await defaultApi.getSelfDocPermission({ doc_id: docId! });
      return res;
    },
    { manual: false }
  );

  // Renders the editor instance.
  return (
    <BlockNoteView
      editable={permission == "write" || permission == "own" ? true : false}
      editor={editor}
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
    </BlockNoteView>
  );
}
