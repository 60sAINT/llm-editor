import { TocItem } from "..";

export const parseJsonToTocData = (json: any[]): TocItem[] => {
  const tocData: TocItem[] = [];

  json.forEach((item) => {
    if (item.type === "heading") {
      const level = item.props.level;
      const id = item.id;
      const title = item.content[0]?.text || "";

      if (level === 1) {
        tocData.push({ title, id });
      } else if (level === 2) {
        const lastItem = tocData[tocData.length - 1];
        if (lastItem) {
          if (!lastItem.children) {
            lastItem.children = [];
          }
          lastItem.children.push({ title, id });
        }
      } else if (level === 3) {
        const lastItem = tocData[tocData.length - 1];
        if (lastItem && lastItem.children) {
          const lastSubItem = lastItem.children[lastItem.children.length - 1];
          if (lastSubItem) {
            if (!lastSubItem.children) {
              lastSubItem.children = [];
            }
            lastSubItem.children.push({ title, id });
          }
        }
      }
    }
  });

  return tocData;
};

export const convertTocDataToMenuItems = (
  tocData: TocItem[]
): { key: string; label: string }[] => {
  return tocData.map((item) => ({
    key: item.id,
    label: item.title,
    children: item.children
      ? convertTocDataToMenuItems(item.children)
      : undefined,
  }));
};
