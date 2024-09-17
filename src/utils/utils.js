export function handleFirstTab(event) {
  if (event.key === "Tab") {
    document.body.classList.add("focus-visible");
    window.removeEventListener("keydown", handleFirstTab);
  }
}

export function handleMouseDown() {
  document.body.classList.remove("focus-visible");
  window.addEventListener("keydown", handleFirstTab);
}
