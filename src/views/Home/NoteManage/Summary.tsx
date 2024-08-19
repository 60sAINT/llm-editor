import React, { useMemo } from "react";
import { ConfigProvider, Tree } from "antd";
import type { TreeDataNode } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { countLeafNodes } from "@/common/utils";

const { DirectoryTree } = Tree;

export type SummaryProps = {
  folderListData: any[];
};

const convertToTreeData = (list: any[]): TreeDataNode[] => {
  const processNode = (node: any): TreeDataNode | null => {
    if (node.is_note) {
      return {
        title: node.title,
        key: node.doc_id,
        isLeaf: true,
      };
    }

    if (node.children) {
      const children = node.children.map(processNode).filter(Boolean);
      if (children.length > 0) {
        return {
          title: node.dir_name,
          key: node.dir_id,
          children,
        };
      }
    }

    return null;
  };

  return list.map(processNode).filter(Boolean) as TreeDataNode[];
};

const Summary: React.FC<SummaryProps> = ({ folderListData }) => {
  const treeData = useMemo(
    () => convertToTreeData(folderListData || []),
    [folderListData]
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Tree: {
            directoryNodeSelectedBg: "#d67b88",
            nodeHoverBg: "#fbf2f3",
            titleHeight: 36,
            nodeSelectedBg: "#fbf2f3",
          },
        },
      }}
    >
      <div className="mb-1 h-8 flex items-center text-stone-800 font-semibold bg-[#f7e5e7] rounded-sm pl-3 justify-between">
        <div className="flex items-center">
          <FileTextOutlined className="[&>svg]:h-[22px]" />
          <div className="ml-4">全部笔记</div>
        </div>
        <div className="mr-4">{countLeafNodes(treeData)}</div>
      </div>
      <DirectoryTree
        multiple
        defaultExpandAll
        treeData={treeData}
        className="bg-transparent [&_.ant-tree-switcher]:flex [&_.ant-tree-switcher]:items-center [&_.ant-tree-switcher]:justify-center"
      />
    </ConfigProvider>
  );
};

export default Summary;
