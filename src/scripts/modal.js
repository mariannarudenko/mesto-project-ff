const openedPopupClass = "popup_is-opened";
const escKey = "Escape";

let currentPopup = null;

/**
 * Открывает указанный popup.
 * @param {HTMLElement} popup - Элемент popup, который нужно открыть.
 */
export function openPopup(popup) {
  popup.classList.add(openedPopupClass);
  currentPopup = popup;
  document.addEventListener("keydown", closePopupOnEsc);
  popup.addEventListener("click", closePopupOnOverlay);
}

/**
 * Закрывает указанный popup.
 * @param {HTMLElement} popup - Элемент popup, который нужно закрыть.
 */
export function closePopup(popup) {
  popup.classList.remove(openedPopupClass);
  currentPopup = null;
  document.removeEventListener("keydown", closePopupOnEsc);
  popup.removeEventListener("click", closePopupOnOverlay);
}

/**
 * Закрывает текущий popup при нажатии клавиши Escape.
 * @param {KeyboardEvent} evt - Событие нажатия клавиши.
 */
function closePopupOnEsc(evt) {
  if (evt.key === escKey && currentPopup) {
    closePopup(currentPopup);
  }
}

/**
 * Закрывает popup при клике на overlay (фон).
 * @param {MouseEvent} evt - Событие клика.
 */
function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains(openedPopupClass)) {
    closePopup(evt.target);
  }
}
