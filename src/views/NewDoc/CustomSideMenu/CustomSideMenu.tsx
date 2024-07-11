import React from "react";
import { SideMenuProps, SideMenu, DragHandleButton } from "@blocknote/react";
import { CustomBlockButton } from "./CustomBlockButton";

export function CustomSideMenu(props: SideMenuProps) {
  return (
    <SideMenu {...props}>
      {/* <CustomBlockButton {...props} /> */}
      <DragHandleButton {...props} />
    </SideMenu>
  );
}
