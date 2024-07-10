const useRange = () => {
  let ranges = [];
  const sel = window.getSelection();
  for (var i = 0; i < sel!.rangeCount; i++) {
    ranges[i] = sel!.getRangeAt(i);
  }
  return ranges[0];
};

export default useRange;
