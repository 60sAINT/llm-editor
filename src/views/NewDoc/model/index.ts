export const fontSizeOptions = [
  {
    value: 5,
    label: "八号",
  },
  {
    value: 6,
    label: "七号",
  },
  {
    value: 7,
    label: "小六",
  },
  {
    value: 8,
    label: "六号",
  },
  {
    value: 9,
    label: "小五",
  },
  {
    value: 11,
    label: "五号",
  },
  {
    value: 12,
    label: "小四",
  },
  {
    value: 14,
    label: "四号",
  },
  {
    value: 15,
    label: "小三",
  },
  {
    value: 16,
    label: "三号",
  },
  {
    value: 18,
    label: "小二",
  },
  {
    value: 22,
    label: "二号",
  },
  {
    value: 24,
    label: "小一",
  },
  {
    value: 26,
    label: "一号",
  },
  {
    value: 36,
    label: "小初",
  },
  {
    value: 42,
    label: "初号",
  },
  {
    value: 54,
    label: "特号",
  },
  {
    value: 63,
    label: "大特号",
  },
  {
    value: 72,
    label: "1英寸",
  },
];

export const segSpacingOptions = [
  {
    value: 1.0,
    label: 1.0,
  },
  {
    value: 1.15,
    label: 1.15,
  },
  {
    value: 1.5,
    label: 1.5,
  },
  {
    value: 2.0,
    label: 2.0,
  },
  {
    value: 2.5,
    label: 2.5,
  },
  {
    value: 3.0,
    label: 3.0,
  },
];

export const dataSource = [
  {
    key: "1",
    position: "段前",
    heading1: "before",
    heading2: "before",
    heading3: "before",
    paragraph: "before",
  },
  {
    key: "2",
    position: "段后",
    heading1: "after",
    heading2: "after",
    heading3: "after",
    paragraph: "after",
  },
];

export const paddingOptions = [
  { label: "窄", value: "narrow" },
  { label: "适中", value: "moderate" },
  { label: "宽", value: "wide" },
  { label: "自定义", value: "custom" },
];

export const paddingValues: {
  [key: string]: { top: string; bottom: string; left: string; right: string };
} = {
  narrow: { top: "1.27", bottom: "1.27", left: "1.27", right: "1.27" },
  moderate: { top: "2.54", bottom: "2.54", left: "1.91", right: "1.91" },
  wide: { top: "2.54", bottom: "2.54", left: "5.08", right: "5.08" },
};
