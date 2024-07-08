import React from "react";
import {
  useBlockNoteEditor,
  useComponentsContext,
  useEditorContentOrSelectionChange,
} from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useState } from "react";

// Custom Formatting Toolbar Button to toggle blue text & background color.
export function BlueButton() {
  const editor = useBlockNoteEditor();

  // 获取BlockNote内部使用的所有组件
  const Components = useComponentsContext()!;

  // Tracks whether the text & background are both blue.
  const [isSelected, setIsSelected] = useState<boolean>(
    editor.getActiveStyles().textColor === "blue" &&
      editor.getActiveStyles().backgroundColor === "blue"
  );

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setIsSelected(
      editor.getActiveStyles().textColor === "blue" &&
        editor.getActiveStyles().backgroundColor === "blue"
    );
  }, editor);

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={"Blue Text & Background"}
      onClick={() => {
        editor.toggleStyles({
          textColor: "blue",
          backgroundColor: "blue",
        });
      }}
      isSelected={isSelected}
    >
      Blue
    </Components.FormattingToolbar.Button>
  );
}
