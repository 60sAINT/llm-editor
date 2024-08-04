// src/components/TOC.tsx
import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { convertTocDataToMenuItems, parseJsonToTocData } from "./utils";
import { useDocState } from "../utils/docProvider";

export interface TocItem {
  title: string;
  id: string;
  children?: TocItem[];
}

const TOC: React.FC = () => {
  const [current, setCurrent] = useState<string>("");
  const [items, setItems] = useState<{ key: string; label: string }[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { docContent } = useDocState();

  useEffect(() => {
    if (docContent) {
      const jsonData = JSON.parse(docContent);
      const data = parseJsonToTocData(jsonData);
      const menuItems = convertTocDataToMenuItems(data);
      setItems(menuItems);
    }
  }, [docContent]);

  const handleClick = (e: any) => {
    setCurrent(e.key);
    const element = document.getElementById(e.key);
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      mode="inline"
      className="w-60"
      items={items}
    />
  );
};

export default TOC;
