export const scrollToElement = (id: string, ifStartUnfold: boolean) => {
  console.log(ifStartUnfold);
  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) {
    // Calculate the current scroll position
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const offset = ifStartUnfold ? -90 : -60; // Adjust this value as needed

    // Calculate the target scroll position
    const targetScrollPosition = absoluteElementTop + offset;

    // Scroll to the target position
    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth",
    });

    // Highlight the element briefly
    // element.classList.add("highlight");
    // setTimeout(() => {
    //   element.classList.remove("highlight");
    // }, 1000); // Remove the highlight after 1 second
  }
};
