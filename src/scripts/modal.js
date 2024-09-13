const activePopup = "popup_is-opened";
const escKey = "Escape";

const clickEventType = "click";
const keydownEventType = "keydown";

let currentPopup = null;

/**
 * Открывает указанный popup.
 * @param {HTMLElement} popup - Элемент popup, который нужно открыть.
 */
export function openPopup(popup) {
  popup.classList.add(activePopup);
  currentPopup = popup;
  document.addEventListener(keydownEventType, closePopupOnEsc);
  popup.addEventListener(clickEventType, closePopupOnOverlay);
}

/**
 * Закрывает указанный popup.
 * @param {HTMLElement} popup - Элемент popup, который нужно закрыть.
 */
export function closePopup(popup) {
  popup.classList.remove(activePopup);
  currentPopup = null;
  document.removeEventListener(keydownEventType, closePopupOnEsc);
  popup.removeEventListener(clickEventType, closePopupOnOverlay);
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
  if (evt.target.classList.contains(activePopup)) {
    closePopup(evt.target);
  }
}
