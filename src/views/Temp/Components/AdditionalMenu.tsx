import React from "react";
import {
  BlockNoteSchema,
  defaultInlineContentSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  DefaultReactSuggestionItem,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { Mention } from "./Mention";

// Our schema with inline content specs, which contain the configs and
// implementations for inline content  that we want our editor to use.
const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});

// Function which gets all users for the mentions menu.
const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor
): DefaultReactSuggestionItem[] => {
  const users = ["Steve", "Bob", "Joe", "Mike"];

  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "mention",
          props: {
            user,
          },
        },
        " ", // add a space after the mention
      ]);
    },
  }));
};

export function App() {
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "mention",
            props: {
              user: "Steve",
            },
          },
          {
            type: "text",
            text: " <- This is an example mention",
            styles: {},
          },
        ],
      },
      {
        type: "paragraph",
        content: "Press the '@' key to open the mentions menu and add another",
      },
      {
        type: "paragraph",
      },
    ],
  });

  return (
    <>
      <div className="text-4xl font-bold text-primary mt-3">
        创建其他建议菜单
      </div>
      <div className="text-3xl font-semibold text-red-500">自定内联内容</div>
      <div>
        可以向编辑器添加其他建议菜单，该菜单可以使用任何触发字符.下面的演示添加了一个提及建议菜单示例，该菜单以@字符开头打开。
      </div>
      <BlockNoteView editor={editor}>
        {/* Adds a mentions menu which opens with the "@" key */}
        <SuggestionMenuController
          triggerCharacter={"@"}
          getItems={async (query) =>
            // Gets the mentions menu items
            filterSuggestionItems(getMentionMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    </>
  );
}

export default App;
