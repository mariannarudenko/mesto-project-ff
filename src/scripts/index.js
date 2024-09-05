import { createCard, handleDeleteCard } from "./card.js";
import { initialCards } from "./cards.js";
import "../pages/index.css";
import {
  popupTypeImage,
  popupEditProfile,
  popupAddCard,
  nameInput,
  profilName,
  jobInput,
  profilDescription,
  openPopup
} from "./modal.js";

const cardContainer = document.querySelector(".places__list");

/**
 * Обрабатывает нажатие кнопки "лайк" для карточки.
 * @param {HTMLElement} likeButton - Кнопка "лайк" для карточки.
 */
export function handleLikeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

/**
 * Инициализация карточек при загрузке страницы. 
 * Создаются карточки из массива `initialCards` и добавляются в контейнер.
 */
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick);
  cardContainer.appendChild(cardElement);
});

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

/**
 * Обрабатывает нажатие на изображение карточки.
 * Открывает popup с увеличенной картинкой и её описанием.
 * @param {HTMLImageElement} imageElement - Элемент изображения карточки.
 */
export function handleImageClick(imageElement) {
  let imagePopup = popupTypeImage.querySelector(".popup__image");
  let captionPopup = popupTypeImage.querySelector(".popup__caption");

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