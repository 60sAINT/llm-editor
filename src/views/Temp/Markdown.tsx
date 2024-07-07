import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const Markdown = () => {
  // Stores the editor's contents as Markdown.
  const [markdown, setMarkdown] = useState<string>("");
  const initialMarkdown = "Hello, **world!**";

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
  const mdToEditor = useCreateBlockNote();

  // Markdown:
  // 将块转换为Markdown
  /* blocksToMarkdownLossy(blocks?: Block[]): string;
    const markdownFromBlocks = editor.blocksToMarkdownLossy(blocks);
  */
  // 将Markdown解析为块
  /* tryParseMarkdownToBlocks(markdown: string): Blocks[];
    const blocksFromMarkdown = editor.tryParseMarkdownToBlocks(markdown);
  */

  const onChange = async () => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown);
  };
  const markdownInputChanged = useCallback(
    async (e: ChangeEvent<HTMLTextAreaElement>) => {
      // Whenever the current Markdown content changes, converts it to an array of
      // Block objects and replaces the editor's content with them.
      const blocks = await mdToEditor.tryParseMarkdownToBlocks(e.target.value);
      mdToEditor.replaceBlocks(mdToEditor.document, blocks);
    },
    [mdToEditor]
  );
  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await mdToEditor.tryParseMarkdownToBlocks(initialMarkdown);
      mdToEditor.replaceBlocks(mdToEditor.document, blocks);
    }
    loadInitialHTML();
  }, [mdToEditor]);

  return (
    <div className="flex flex-col h-full">
      <div>输入（BlockNote 编辑器）：</div>
      <div className="rounded-lg flex-1 overflow-hidden">
        <BlockNoteView editor={editor} onChange={onChange} />
      </div>
      <div>上方BlockNote Editor内容onChange后转为Markdown</div>
      <div>Output (Markdown):</div>
      <div className="border border-gray-600">
        <pre className="rounded-lg h-full overflow-auto ps-14 pe-14 w-full whitespace-pre-wrap py-4">
          <code>{markdown}</code>
        </pre>
      </div>
      <div>Markdown转BlockNote Editor:</div>
      <div>Input (Markdown):</div>
      <div className="border border-gray-600">
        <code>
          <textarea
            defaultValue={initialMarkdown}
            onChange={markdownInputChanged}
          />
        </code>
      </div>
      <div>Output (BlockNote Editor):</div>
      <div className="border border-gray-600">
        <code>
          <BlockNoteView editor={mdToEditor} editable={false} />
        </code>
      </div>
    </div>
  );
};

export default Markdown;
