import { createCard, handleDeleteCard, handleLikeCard } from "./card.js";
import { initialCards } from "./cards.js";
import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";

// Константы для селекторов
const selectors = {
  cardContainer: ".places__list",
  popupTypeImage: ".popup_type_image",
  imagePopup: ".popup__image",
  captionPopup: ".popup__caption",
  popupCloseButton: ".popup__close",
  popupEditProfile: ".popup_type_edit",
  popupAddCard: ".popup_type_new-card",
  nameInput: ".popup__input_type_name",
  jobInput: ".popup__input_type_description",
  profilName: ".profile__title",
  profilDescription: ".profile__description",
  editProfileButton: ".profile__edit-button",
  addCardButton: ".profile__add-button",
  placeNameInput: "input[name='place-name']",
  linkInput: "input[name='link']"
};

// Использование констант
const cardContainer = document.querySelector(selectors.cardContainer);
const popupTypeImage = document.querySelector(selectors.popupTypeImage);
const imagePopup = popupTypeImage.querySelector(selectors.imagePopup);
const captionPopup = popupTypeImage.querySelector(selectors.captionPopup);
const popupCloseButton = document.querySelectorAll(selectors.popupCloseButton);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const formElement = document.querySelector("form[name='edit-profile']");
const cardFormElement = document.querySelector("form[name='new-place']");
const nameInput = document.querySelector(selectors.nameInput);
const jobInput = document.querySelector(selectors.jobInput);
const profilName = document.querySelector(selectors.profilName);
const profilDescription = document.querySelector(selectors.profilDescription);
const editProfileButton = document.querySelector(selectors.editProfileButton);
const addCardButton = document.querySelector(selectors.addCardButton);
const placeNameInput = document.querySelector(selectors.placeNameInput);
const linkInput = document.querySelector(selectors.linkInput);

/** Добавление классов анимации для всех попапов */
popupTypeImage.classList.add("popup_is-animated");
popupEditProfile.classList.add("popup_is-animated");
popupAddCard.classList.add("popup_is-animated");

/**
 * Инициализация карточек при загрузке страницы.
 * Создаются карточки из массива `initialCards` и добавляются в контейнер.
 */
initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    handleDeleteCard,
    handleLikeCard,
    handleImageClick
  );
  cardContainer.appendChild(cardElement);
});

/**
 * Обрабатывает нажатие на изображение карточки.
 * Открывает popup с увеличенной картинкой и её описанием.
 * @param {HTMLImageElement} imageElement - Элемент изображения карточки.
 */
function handleImageClick(imageElement) {
  imagePopup.src = imageElement.src;
  imagePopup.alt = imageElement.alt;
  captionPopup.textContent = imageElement.alt;

  openPopup(popupTypeImage);
}

/**
 * Открывает форму редактирования профиля и заполняет поля значениями из профиля.
 */
editProfileButton.addEventListener("click", function () {
  nameInput.value = profilName.textContent;
  jobInput.value = profilDescription.textContent;

  openPopup(popupEditProfile);
});

/**
 * Открывает popup для добавления новой карточки.
 */
addCardButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

/**
 * Заменяет букву "ё" на "е" и "Ё" на "Е" в переданном тексте.
 * @param {string} text - Текст для обработки.
 * @returns {string} - Обработанный текст с заменёнными буквами "ё"/"Ё".
 */
function replaceDifficultLetter(text) {
  return text.replace(/ё/g, "е").replace(/Ё/g, "Е");
}

/**
 * Обрабатывает сабмит формы профиля, обновляет данные профиля и закрывает попап.
 *
 * @param {Event} evt - Событие сабмита формы.
 * @param {Function} textProcessor - Функция для обработки текста (например, замена сложных символов).
 */
function handleProfileFormSubmit(evt, textProcessor) {
  evt.preventDefault();

  // Получение и обработка значений формы профиля
  const nameValue = textProcessor(nameInput.value);
  const jobValue = textProcessor(jobInput.value);

  // Обновление профиля
  profilName.textContent = nameValue;
  profilDescription.textContent = jobValue;

  // Закрытие попапа и сброс формы
  closePopup(popupEditProfile);
  evt.target.reset();
}

/**
 * Обрабатывает сабмит формы карточки, создает новую карточку и добавляет ее в начало списка.
 *
 * @param {Event} evt - Событие сабмита формы.
 * @param {Function} textProcessor - Функция для обработки текста (например, замена сложных символов).
 */
function handleCardFormSubmit(evt, textProcessor) {
  evt.preventDefault();

  // Получение и обработка значений формы карточки
  const placeNameValue = textProcessor(placeNameInput.value);
  const linkValue = textProcessor(linkInput.value);

  // Создание новой карточки и добавление в начало списка
  const cardData = { name: placeNameValue, link: linkValue };
  cardContainer.prepend(
    createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick)
  );

  // Закрытие попапа и сброс формы
  closePopup(popupAddCard);
  evt.target.reset();
}

// Обработка отправки формы профиля
formElement.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt, replaceDifficultLetter);
});

// Обработка отправки формы карточки
cardFormElement.addEventListener("submit", function (evt) {
  handleCardFormSubmit(evt, replaceDifficultLetter);
});

// Обработка закрытия всех попапов по клику на кнопку закрытия
popupCloseButton.forEach((button) => {
  button.addEventListener("click", () => {
    closePopup(document.querySelector(".popup_is-opened"));
  });
});
