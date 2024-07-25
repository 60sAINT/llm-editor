import React from "react";
import {
  SideMenuProps,
  useBlockNoteEditor,
  useComponentsContext,
} from "@blocknote/react";
import { BiAtom } from "react-icons/bi";

export function CustomBlockButton(props: SideMenuProps) {
  const editor = useBlockNoteEditor();
  const Components = useComponentsContext()!;
  const currentBlock = props.block;

  return (
    <Components.SideMenu.Button
      label="Add suggestion"
      icon={
        <BiAtom
          size={24}
          onClick={async () => {
            if (!currentBlock.content) return;
          }}
        />
      }
    />
  );
}
