import React from "react";
import { SideMenuProps, SideMenu, DragHandleButton } from "@blocknote/react";

export function CustomSideMenu(props: SideMenuProps) {
  return (
    <SideMenu {...props}>
      {/* <CustomBlockButton {...props} /> */}
      <DragHandleButton {...props} />
    </SideMenu>
  );
}
