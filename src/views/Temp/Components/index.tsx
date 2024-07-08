import React from "react";
import "@blocknote/core/fonts/inter.css";
import {
  BasicTextStyleButton,
  BlockColorsItem,
  BlockTypeSelect,
  BlockTypeSelectItem,
  ColorStyleButton,
  CreateLinkButton,
  DefaultReactSuggestionItem,
  DragHandleButton,
  DragHandleMenu,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  RemoveBlockItem,
  SideMenu,
  SideMenuController,
  SuggestionMenuController,
  TextAlignButton,
  UnnestBlockButton,
  blockTypeSelectItems,
  useCreateBlockNote,
  getDefaultReactSlashMenuItems,
  SuggestionMenuProps,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { RiAlertFill } from "react-icons/ri";
import {
  BlockNoteEditor,
  BlockNoteSchema,
  PartialBlock,
  defaultBlockSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import { HiOutlineGlobeAlt } from "react-icons/hi";

import { ResetBlockTypeItem } from "./ResetBlockTypeItem";
import { RemoveBlockButton } from "./RemoveBlockButton";
import { BlueButton } from "./BlueButton";
import { Alert } from "./Alert";
import "./index.css";
import AdditionalMenu from "./AdditionalMenu";
import { SetFontStyleButton } from "./SetFontStyleButton";

// Our schema with block specs, which contain the configs and implementations
// for blocks that we want our editor to use.
const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    alert: Alert,
  },
});

// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertHelloWorldItem(editor),
];
// Custom Slash Menu item to insert a block after the current one.
const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: "Insert Hello World",
  onItemClick: () => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;

    // New block we want to insert.
    const helloWorldBlock: PartialBlock = {
      type: "paragraph",
      content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
    };

    // Inserting the new block after the current one.
    editor.insertBlocks([helloWorldBlock], currentBlock, "after");
  },
  aliases: ["helloworld", "hw"],
  group: "Other",
  icon: <HiOutlineGlobeAlt size={18} />,
  subtext: "Used to insert a block with 'Hello World' below.",
});

// Custom component to replace the default Slash Menu.
function CustomSlashMenu(
  props: SuggestionMenuProps<DefaultReactSuggestionItem>
) {
  return (
    <div className="z-9999 bg-white border border-gray-200 rounded-sm shadow-md flex flex-col gap-2 p-2 t-2">
      {props.items.map((item, index) => (
        <div
          className={`slash-menu-item${
            props.selectedIndex === index ? " selected" : ""
          }`}
          onClick={() => {
            props.onItemClick?.(item);
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "<- Notice the new button in the side menu",
      },
      {
        type: "paragraph",
        content: "Click it to remove the hovered block",
      },
      {
        type: "paragraph",
      },
    ],
  });
  const dragHandleEditor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "<- Click the Drag Handle to see the new item",
      },
      {
        type: "bulletListItem",
        content:
          "Try resetting this block's type using the new Drag Handle Menu item",
      },
      {
        type: "paragraph",
      },
    ],
  });
  const toolbarEditor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "You can now toggle ",
            styles: {},
          },
          {
            type: "text",
            text: "blue",
            styles: { textColor: "blue", backgroundColor: "blue" },
          },
          {
            type: "text",
            text: " and ",
            styles: {},
          },
          {
            type: "text",
            text: "code",
            styles: { code: true },
          },
          {
            type: "text",
            text: " styles with new buttons in the Formatting Toolbar",
            styles: {},
          },
        ],
      },
      {
        type: "paragraph",
        content: "Select some text to try them out",
      },
      {
        type: "paragraph",
      },
    ],
  });
  const dropdownEditor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content:
          "Try selecting some text - you'll see the new 'Alert' item in the Block Type Select",
      },
      {
        type: "alert",
        content:
          "Or select text in this alert - the Block Type Select also appears",
      },
      {
        type: "paragraph",
      },
    ],
  });
  const slashEditor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "Press the '/' key to open the Slash Menu",
      },
      {
        type: "paragraph",
        content: "Notice the new 'Insert Hello World' item - try it out!",
      },
      {
        type: "paragraph",
      },
    ],
  });
  const replaceMenuEditor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "Press the '/' key to open the Slash Menu",
      },
      {
        type: "paragraph",
        content: "It's been replaced with a custom component",
      },
      {
        type: "paragraph",
      },
    ],
  });

  // Renders the editor instance.
  return (
    <>
      <div className="text-4xl font-bold text-primary mt-3">更改块侧边菜单</div>
      {/* 设置 sideMenu={false} 告诉 BlockNote 不要显示默认的块侧边菜单 */}
      <BlockNoteView editor={editor} sideMenu={false}>
        {/* SideMenuController控制其位置和可见性（当你悬停在一个块上时，它显示在左侧） */}
        <SideMenuController
          sideMenu={(props) => (
            // 使用 SideMenu 组件来创建自定义的块侧边菜单。通过指定其子元素，我们可以用自己的按钮替换菜单中的默认按钮。
            // 这个定制的SideMenu被传递给 SideMenuController
            <SideMenu {...props}>
              {/* Button which removes the hovered block. */}
              <RemoveBlockButton {...props} />
              <DragHandleButton {...props} />
            </SideMenu>
          )}
        />
      </BlockNoteView>
      <div className="text-4xl font-bold text-primary mt-3">
        更改拖动手柄菜单项
      </div>
      <BlockNoteView editor={dragHandleEditor} sideMenu={false}>
        <SideMenuController
          sideMenu={(props) => (
            // SideMenu 组件保留了默认的按钮（没有传递任何子元素）
            <SideMenu
              {...props}
              // 通过 dragHandleMenu 属性传递了我们自定义的拖动句柄菜单
              dragHandleMenu={(props) => (
                <DragHandleMenu {...props}>
                  {/* 传递给 DragHandleMenu 组件的子元素应该是默认项（例如 RemoveBlockItem）或自定义项（DragHandleMenuItem） */}
                  <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                  <BlockColorsItem {...props}>Colors</BlockColorsItem>
                  {/* Item which resets the hovered block's type. */}
                  <ResetBlockTypeItem {...props}>Reset Type</ResetBlockTypeItem>
                </DragHandleMenu>
              )}
            />
          )}
        />
      </BlockNoteView>
      <div className="text-4xl font-bold text-primary mt-3">更改格式工具栏</div>
      <div className="text-3xl font-semibold text-red-500">自定义样式</div>
      <div>
        在下面的演示中，默认的格式工具栏中添加了 2 个按钮 -
        一个用于添加蓝色文本/背景，另一个用于切换代码样式
      </div>
      <BlockNoteView editor={toolbarEditor} formattingToolbar={false}>
        {/* formattingToolbar={false}告诉BlockNote不显示默认的格式化工具栏 */}
        <FormattingToolbarController
          // FormattingToolbarController控制FormattingToolbar的位置和可见性（在高亮文本的上方或下方）。
          formattingToolbar={() => (
            // FormattingToolbar组件创建自定义的格式化工具栏（Formatting Toolbar）。通过指定其子元素，我们可以用自己的按钮替换工具栏中的默认按钮
            <FormattingToolbar>
              <BlockTypeSelect key={"blockTypeSelect"} />

              {/* Extra button to toggle blue text & background */}
              <BlueButton key={"customButton"} />

              <FileCaptionButton key={"fileCaptionButton"} />
              <FileReplaceButton key={"replaceFileButton"} />

              <BasicTextStyleButton
                basicTextStyle={"bold"}
                key={"boldStyleButton"}
              />
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
              <BasicTextStyleButton
                key={"codeStyleButton"}
                basicTextStyle={"code"}
              />
              {/* Adds SetFontStyleButton */}
              <SetFontStyleButton />

              <TextAlignButton
                textAlignment={"left"}
                key={"textAlignLeftButton"}
              />
              <TextAlignButton
                textAlignment={"center"}
                key={"textAlignCenterButton"}
              />
              <TextAlignButton
                textAlignment={"right"}
                key={"textAlignRightButton"}
              />

              <ColorStyleButton key={"colorStyleButton"} />

              <NestBlockButton key={"nestBlockButton"} />
              <UnnestBlockButton key={"unnestBlockButton"} />

              <CreateLinkButton key={"createLinkButton"} />
            </FormattingToolbar>
          )}
        />
      </BlockNoteView>
      <div className="text-4xl font-bold text-primary mt-3">
        更改块类型 选择（下拉列表）项目
      </div>
      <div className="text-3xl font-semibold text-red-500">自定义块</div>
      <div>默认格式工具栏中的第一个元素是块类型选择，可以更改其中的项目</div>
      <BlockNoteView editor={dropdownEditor} formattingToolbar={false}>
        <FormattingToolbarController
          formattingToolbar={() => (
            <FormattingToolbar
              // 使用FormattingToolbar组件，但保留默认按钮（不传递任何子项）。
              // 使用blockTypeSelectItems属性传递我们定制的块类型选择项
              blockTypeSelectItems={[
                ...blockTypeSelectItems(dropdownEditor.dictionary),
                {
                  name: "Alert",
                  type: "alert",
                  icon: RiAlertFill,
                  isSelected: (block) => block.type === "alert",
                } satisfies BlockTypeSelectItem,
              ]}
            />
          )}
        />
      </BlockNoteView>
      <div className="text-4xl font-bold text-primary mt-3">更改斜杠菜单项</div>
      <div>
        下面的演示添加了一个插入新块的项目，其中“Hello World”以粗体显示。
      </div>
      <BlockNoteView editor={slashEditor} slashMenu={false}>
        <SuggestionMenuController
          triggerCharacter={"/"}
          // Replaces the default Slash Menu items with our custom ones.
          getItems={async (query) =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
      <div className="text-4xl font-bold text-primary mt-3">
        替换建议菜单组件
      </div>
      <div>用自己的 React 组件替换用于建议菜单的 React 组件</div>
      {/* slashMenu={false}以替换默认的斜杠菜单 */}
      <BlockNoteView editor={replaceMenuEditor} slashMenu={false}>
        <SuggestionMenuController
          triggerCharacter={"/"}
          suggestionMenuComponent={CustomSlashMenu}
          // suggestionMenuComponent负责渲染经过筛选的项目
        />
      </BlockNoteView>
      <AdditionalMenu />
    </>
  );
}
