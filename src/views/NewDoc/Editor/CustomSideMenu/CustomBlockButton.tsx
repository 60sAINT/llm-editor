import React from "react";
import { SideMenuProps, useComponentsContext } from "@blocknote/react";
import { BiAtom } from "react-icons/bi";

export function CustomBlockButton(props: SideMenuProps) {
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
