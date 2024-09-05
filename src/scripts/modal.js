import { handleLikeCard, handleImageClick } from "./index.js";
import { createCard, handleDeleteCard } from "./card.js";

let currentPopup = null;

const popupCloseButton = document.querySelectorAll(".popup__close");
export const popupTypeImage = document.querySelector(".popup_type_image");
export const popupEditProfile = document.querySelector(".popup_type_edit");
export const popupAddCard = document.querySelector(".popup_type_new-card");

popupTypeImage.classList.add("popup_is-animated");
popupEditProfile.classList.add("popup_is-animated");
popupAddCard.classList.add("popup_is-animated");

const formElement = document.querySelector("form[name='edit-profile']");
const cardFormElement = document.querySelector("form[name='new-place']");

export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(
  ".popup__input_type_description"
);

export const profilName = document.querySelector(".profile__title");
export const profilDescription = document.querySelector(
  ".profile__description"
);

/**
 * Открывает указанный popup.
 * @param {HTMLElement} popup - Элемент popup, который нужно открыть.
 */
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  currentPopup = popup;
  document.addEventListener("keydown", closePopupOnEsc);
  popup.addEventListener("click", closePopupOnOverlay);
}

/**
 * Заменяет букву "ё" на "е" и "Ё" на "Е" в переданном тексте.
 * @param {string} text - Текст для обработки.
 * @returns {string} - Обработанный текст с заменёнными буквами "ё"/"Ё".
 */
function replaceDifficultLetter(text) {
  if (text.includes("Ё") || text.includes("ё")) {
    return text.replace(/ё/gi, (match) => (match === "ё" ? "е" : "Е"));
  }
  return text;
}

/**
 * Обрабатывает отправку формы для профиля или карточки.
 * @param {Event} evt - Событие отправки формы.
 * @param {function} textProcessor - Функция для обработки текста.
 * @param {string} formType - Тип формы ("profile" или "card").
 */
function handleFormSubmit(evt, textProcessor, formType) {
  evt.preventDefault();
  if (formType === "profile") {
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    nameValue = textProcessor(nameValue);
    jobValue = textProcessor(jobValue);

    profilName.textContent = nameValue;
    profilDescription.textContent = jobValue;

    closePopup(popupEditProfile);
    evt.target.reset();
  } else if (formType === "card") {
    const place = document.querySelector(".places__list");
    let placeNameValue = document.querySelector(
      "input[name='place-name']"
    ).value;
    let linkValue = document.querySelector("input[name='link']").value;

    placeNameValue = replaceDifficultLetter(placeNameValue);
    linkValue = replaceDifficultLetter(linkValue);

    const cardData = {
      name: placeNameValue,
      link: linkValue,
    };

    place.prepend(
      createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick)
    );
    closePopup(popupAddCard);
    evt.target.reset();
  }
}

/**
 * Закрывает указанный popup.
 * @param {HTMLElement} popup - Элемент popup, который нужно закрыть.
 */
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  currentPopup = null;
  document.removeEventListener("keydown", closePopupOnEsc);
  popup.removeEventListener("click", closePopupOnOverlay);
}

/**
 * Закрывает текущий popup при нажатии клавиши Escape.
 * @param {KeyboardEvent} evt - Событие нажатия клавиши.
 */
function closePopupOnEsc(evt) {
  if (evt.key === "Escape" && currentPopup) {
    closePopup(currentPopup);
  }
}

/**
 * Закрывает popup при клике на overlay (фон).
 * @param {MouseEvent} evt - Событие клика.
 */
function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

popupCloseButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentPopup) {
      closePopup(currentPopup);
    }
  });
});

formElement.addEventListener("submit", function (evt) {
  handleFormSubmit(evt, replaceDifficultLetter, "profile");
});

cardFormElement.addEventListener("submit", function (evt) {
  handleFormSubmit(evt, replaceDifficultLetter, "card");
});