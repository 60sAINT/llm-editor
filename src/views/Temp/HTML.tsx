import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const HTML = () => {
  // Stores the editor's contents as HTML.
  const [html, setHTML] = useState<string>("");
  const initialHTML = "<p>Hello, <strong>world!</strong></p>";

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: [
          "Hello, ",
          {
            type: "text",
            text: "world!",
            styles: {
              bold: true,
            },
          },
        ],
      },
    ],
  });
  const htmlToEditor = useCreateBlockNote();

  // HTML:
  // 将块转换为HTML
  /* blocksToHTMLLossy(blocks?: Block[]): string;
    const HTMLFromBlocks = editor.blocksToHTMLLossy(blocks);
  */
  // 将HTML解析为块
  /* tryParseHTMLToBlocks(html: string): Blocks[];
    const blocksFromHTML = editor.tryParseHTMLToBlocks(html);
  */

  const onChange = async () => {
    // Converts the editor's contents from Block objects to HTML and store to state.
    const html = await editor.blocksToHTMLLossy(editor.document);
    setHTML(html);
  };
  const htmlInputChanged = useCallback(
    async (e: ChangeEvent<HTMLTextAreaElement>) => {
      // Whenever the current Markdown content changes, converts it to an array of
      // Block objects and replaces the editor's content with them.
      const blocks = await editor.tryParseHTMLToBlocks(e.target.value);
      htmlToEditor.replaceBlocks(htmlToEditor.document, blocks);
    },
    [htmlToEditor]
  );
  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await htmlToEditor.tryParseMarkdownToBlocks(initialHTML);
      htmlToEditor.replaceBlocks(htmlToEditor.document, blocks);
    }
    loadInitialHTML();
  }, [htmlToEditor]);

  return (
    <div className="flex flex-col h-full">
      <div>输入（BlockNote 编辑器）：</div>
      <div className="rounded-lg flex-1 overflow-hidden">
        <BlockNoteView editor={editor} onChange={onChange} />
      </div>
      <div>上方BlockNote Editor内容onChange后转为HTML</div>
      <div>Output (HTML):</div>
      <div className="border border-gray-600">
        <pre className="rounded-lg h-full overflow-auto ps-14 pe-14 w-full whitespace-pre-wrap py-4">
          <code>{html}</code>
        </pre>
      </div>
      <div>HTML转BlockNote Editor:</div>
      <div>Input (HTML):</div>
      <div className="border border-gray-600">
        <code>
          <textarea defaultValue={initialHTML} onChange={htmlInputChanged} />
        </code>
      </div>
      <div>Output (BlockNote Editor):</div>
      <div className="border border-gray-600">
        <code>
          <BlockNoteView editor={htmlToEditor} editable={false} />
        </code>
      </div>
    </div>
  );
};

export default HTML;
