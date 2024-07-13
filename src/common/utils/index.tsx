export const targetLanguage = (str: string | undefined) => {
  if (!str) {
    return "英文";
  }
  return /[\u4E00-\u9FA5]/.test(str) ? "英文" : "中文";
};
