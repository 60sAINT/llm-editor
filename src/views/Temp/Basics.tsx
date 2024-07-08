import React, { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Block } from "@blocknote/core";

const Basics = () => {
  // Stores the document JSON.
  const [document, setDocument] = useState<Block[]>([]);

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
        id: "firstP",
      },
      {
        type: "paragraph",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Styled Text",
            styles: {
              bold: true,
              italic: true,
              textColor: "red",
              backgroundColor: "blue",
            },
          },
          {
            type: "text",
            text: " ",
            styles: {},
          },
          {
            type: "link",
            content: "Link",
            href: "https://www.blocknotejs.org",
          },
        ],
      },
      {
        type: "heading",
        content: "Heading",
      },
      {
        type: "bulletListItem",
        content: "Bullet List Item",
      },
      {
        type: "numberedListItem",
        content: "Numbered List Item",
      },
      {
        type: "image",
        props: {
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
          caption:
            "From https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
        },
      },
      {
        type: "table",
        content: {
          type: "tableContent",
          rows: [
            {
              cells: ["Table Cell", "Table Cell", "Table Cell"],
            },
            {
              cells: ["Table Cell", "Table Cell", "Table Cell"],
            },
            {
              cells: ["Table Cell", "Table Cell", "Table Cell"],
            },
          ],
        },
      },
      {
        type: "checkListItem",
        content: "Check List Item",
      },
      {
        type: "file",
      },
      {
        type: "video",
        props: {
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
          caption:
            "From https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        },
      },
      {
        type: "audio",
        props: {
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
          caption:
            "From https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
        },
      },
    ],
  });
  /* useCreateBlockNote
    function useCreateBlockNote(
      options?: BlockNoteEditorOptions,
      deps?: React.DependencyList = [], // Dependency array that's internally passed to useMemo. A new editor will only be created when this array changes
    ): BlockNoteEditor;
    
    type BlockNoteEditorOptions = {
      initialContent?: PartialBlock[];
      domAttributes?: Record<string, string>;
      defaultStyles?: boolean; // 是否使用默认字体并重置 BlockNote 中使用的p、li、h1等元素的样式。默认为 true
      uploadFile?: (file: File) => Promise<string>;
      collaboration?: CollaborationOptions;
      dictionary?: Dictionary;
      schema?: BlockNoteSchema;
      trailingBlock?: boolean; // 当用户键入或编辑任何块时，是否允许在下一行自动创建尾随新块.默认为true
    };
  */
  /* type Block & InlineContent & TableContent
    type Block = {
      id: string;
      type: string; // 块的类型，例如p、h或list item
      props: Record<string, boolean | number | string>;
      content: InlineContent[] | TableContent | undefined; // 块的富文本内容，通常表示为对象数组。这不包括来自任何嵌套块的内容
      children: Block[]; // 嵌套在块内的任何块。嵌套块也使用对象表示
    };
    type InlineContent = Link | StyledText;
    type Link = {
      type: "link";
      content: StyledText[];
      href: string;
    };
    type StyledText = {
      type: "text";
      text: string;
      styles: Styles;
    };
    type TableContent = {
      type: "tableContent";
        rows: {
          cells: InlineContent[][];
        }[];
      };
  */
  /* type ParagraphBlock
    type ParagraphBlock = {
      id: string;
      type: "paragraph";
      props: DefaultProps;
      content: InlineContent[];
      children: Block[];
    };
  */
  /* type HeadingBlock
    type HeadingBlock = {
      id: string;
      type: "heading";
      props: {
        level: 1 | 2 | 3 = 1;
      } & DefaultProps;
      content: InlineContent[];
      children: Block[];
    };
  */
  /* type BulletListItemBlock
    type BulletListItemBlock = {
      id: string;
      type: "bulletListItem";
      props: DefaultProps;
      content: InlineContent[];
      children: Block[];
    };
  */
  /* type NumberedListItemBlock
    type NumberedListItemBlock = {
      id: string;
      type: "numberedListItem";
      props: DefaultProps;
      content: InlineContent[];
      children: Block[];
    };
  */
  /* type ImageBlock
    type ImageBlock = {
      id: string;
      type: "image";
      props: {
        url: string = "";
        caption: string = "";
        width: number = 512;
      } & DefaultProps;
      content: undefined;
      children: Block[];
    };
  */
  /* type TableBlock
    type TableBlock = {
      id: string;
      type: "table";
      props: DefaultProps;
      content: TableContent[];
      children: Block[];
    };
  */
  /* type DefaultProps
    type DefaultProps = {
      backgroundColor: string = "default";
      textColor: string = "default";
      textAlignment: "left" | "center" | "right" | "justify" = "left";
    };
  */
  /* type StyledText
    type StyledText = {
      type: "text";
      text: string;
      styles: Styles;
    };
  */
  /* type Link
    type Link = {
      type: "link";
      content: StyledText[];
      href: string;
    };
  */
  /* type Styles
    type Styles = {
      bold: boolean;
      italic: boolean;
      underline: boolean;
      strikethrough: boolean;
      textColor: string;
      backgroundColor: string;
    };
  */

  // Renders the editor instance using a React component.
  return (
    <div className="flex flex-col h-full">
      <div className="text-4xl font-bold text-primary mt-3">
        BlockNote Editor:
      </div>
      <div className="rounded-lg flex-1 overflow-hidden">
        <BlockNoteView
          editor={editor}
          onChange={() => {
            // Saves the document JSON to state.
            setDocument(editor.document);
          }}
        />
      </div>
      <div className="text-4xl font-bold text-primary mt-3">
        Document JSON when onChange:
      </div>
      <div className="border border-gray-600">
        <pre className="rounded-lg h-full overflow-auto ps-14 pe-14 w-full whitespace-pre-wrap py-4">
          <code>{JSON.stringify(document, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
  /* BlockNoteViewProps
    export type BlockNoteViewProps = {
      editor: BlockNoteEditor; // 渲染的编辑器实例
      editable?: boolean; // 编辑器是否可编辑
      onSelectionChange?: () => void; // 光标位置改变或光标选中内容改变都会调用的回调
      onChange?: () => void; // 编辑器内容改变的回调
      theme?:
        | "light"
        | "dark"
        | Theme
        | {
            light: Theme;
            dark: Theme;
          };
      formattingToolbar?: boolean;
      linkToolbar?: boolean; // 文字链接是否可编辑+在新tab打开+移除
      sideMenu?: boolean;
      slashMenu?: boolean;
      filePanel?: boolean; // 是否可以Add file
      tableHandles?: boolean; // 是否可以增加表格的行和列
      children?:
    } & HTMLAttributes<HTMLDivElement>;
  */
};

export default Basics;
