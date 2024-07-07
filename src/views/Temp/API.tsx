import React, { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Block } from "@blocknote/core";

const API = () => {
  const [containerBlocks, setContainerBlocks] = useState<Block[]>([]);

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "Select different blocks to see the JSON change below",
      },
      {
        type: "paragraph",
      },
    ],
  });

  // 操作块:
  // 获取文档
  const doc = editor.document;
  console.log("doc", doc);
  // 获取特定块
  /* getBlock(blockIdentifier: BlockIdentifier): Block | undefined;
    const getBlock = editor.getBlock(blockIdentifier);
    blockIdentifier:应检索的现有块的标识符。
    returns:与标识符匹配的块，或者未找到匹配块的块。undefined
  */
  const getBlock = editor.getBlock("firstP");
  console.log("getBlock", getBlock);
  // 遍历所有区块
  editor.forEachBlock((block) => {
    console.log("forEachBlock", block);
    return true; // 返回false将停止遍历
  });
  // 插入新块
  /* insertBlocks(
      blocksToInsert: PartialBlock[], // 要插入的新块的数组
      referenceBlock: BlockIdentifier, // 现有块的标识符,应在该现有块周围插入新块
      placement: "before" | "after" | "nested" = "before" // 新块应该在现有块之前 | 之后 | 所有子块的最前面
    ): void;
    // 如果找不到现有块的标识符,该方法会抛出错误
    editor.insertBlocks([{type: "paragraph", content: "Hello World"}], referenceBlock, placement)
  */
  // 更新块
  /* updateBlock(
      blockToUpdate: BlockIdentifier, // 应更新的现有块的标识符
      update: PartialBlock // 一个部分块,定义如何更改现有块
    ): void;
    editor.updateBlock(blockToUpdate, { type: "paragraph" });
  */
  // 移除块
  /* removeBlocks(
      blocksToRemove: BlockIdentifier[],
    ): void;
    editor.removeBlocks(blocksToRemove) // 应删除的现有块的标识符数组
  */
  // 更换块
  /* replaceBlocks(
      blocksToRemove: BlockIdentifier[],
      blocksToInsert: PartialBlock[],
    ): void;
    editor.replaceBlocks(blocksToRemove, blocksToInsert)
    // 如果应删除的块不相邻或处于不同的嵌套级别，则blocksToInsert将插入blocksToRemove中第一个块的位置
  */

  // 操作内联内容:
  /* type PartialLink & PartialInlineContent
    type PartialLink = {
      type: "link";
      content: string | StyledText[];
      href: string;
    };
    type PartialInlineContent = string | (string | PartialLink | StyledText)[];
  */
  // 插入内联内容
  /* insertInlineContent(content: PartialInlineContent)
    editor.insertInlineContent([
      "Hello ",
      { type: "text", text: "World", styles: { bold: true } },
    ]);
  */
  // 获取当前文本光标位置的样式
  /* getActiveStyles(): Styles;
    const styles = editor.getActiveStyles();
  */
  // 向当前选定的文本添加样式
  /* addStyles(styles: Styles): void;
    editor.addStyles({ textColor: "red" });
  */
  // 从当前选定的文本中删除样式
  /* removeStyles(styles: Styles): void;
    editor.removeStyles({ bold: true });
  */
  // 在当前选定的文本上切换样式
  /* toggleStyles(styles: Styles): void;
    editor.toggleStyles({ bold: true, italic: true });
  */
  // 获取当前选定的文本
  /* getSelectedText(): string;
    const text = editor.getSelectedText();
  */
  // 在当前选择中获取链接的 URL
  /* getSelectedLink(): string | undefined;
    const linkUrl = editor.getSelectedLink();
    // 如果选择中有多个链接，则此函数仅返回最后一个链接的 URL。如果没有链接，则返回undefined
  */
  // 创建新链接
  /* createLink(url: string, text?: string): void;
    editor.createLink("https://www.blocknotejs.org/", "BlockNote");
  */

  // 文本和光标:
  // 获取当前文本光标位置
  /* getTextCursorPosition(): TextCursorPosition;
    type TextCursorPosition = {
      block: Block; // 当前包含文本光标的块。如果光标位于嵌套块中，则该块处于尽可能深的嵌套级别。
      prevBlock: Block | undefined; // 同一嵌套级别的上一个块。如果包含文本光标的块是其父级的第一个子块,则未定义
      nextBlock: Block | undefined; // 同一嵌套级别的下一个块。如果包含文本光标的块是其父级的最后一个子块，则未定义
    };
    const textCursorPosition = editor.getTextCursorPosition();
  */
  // 将文本光标位置设置为现有块的开头或结尾
  /* setTextCursorPosition(
      targetBlock: BlockIdentifier,
      placement: "start" | "end" = "start"
    ): void;
  */
  // 获取当前选择跨越的块
  /* getSelection(): Selection | undefined;
    type Selection = {
      blocks: Block[]; // 所选内容当前跨越的块，包括嵌套块
    };
    const selection = editor.getSelection();
  */

  return (
    <div className="flex flex-col h-full">
      <div>BlockNote Editor:</div>
      <div className="rounded-lg flex-1 overflow-hidden">
        <BlockNoteView
          editor={editor}
          onSelectionChange={() => {
            const selection = editor.getSelection();
            // 返回Selection | undefined
            /* type Selection = {
                blocks: Block[]; // 所选内容当前跨越的块，包括嵌套块
              };
            */
            if (selection !== undefined) {
              // 如果有选中的内容,显示所选内容当前跨越的块，包括嵌套块
              setContainerBlocks(selection.blocks);
            } else {
              // 如果没有选中的内容,显示当前光标位置外的最近的块
              setContainerBlocks([editor.getTextCursorPosition().block]);
            }
          }}
        />
      </div>
      <div>
        onSelectionChange:所选内容当前跨越的块(包括嵌套块),如果没有所选内容则显示包含文本光标的最里一层的块
      </div>
      <div className="border border-gray-600">
        <pre className="rounded-lg h-full overflow-auto ps-14 pe-14 w-full whitespace-pre-wrap py-4">
          <code>{JSON.stringify(containerBlocks, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default API;
