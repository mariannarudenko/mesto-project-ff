import { createCard } from "./card.js";
import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import {
  enableValidation,
  clearValidation,
  isValidCardData,
} from "./validation.js";
import {
  getUserInfo,
  getInitialCard,
  updateUserInfo,
  addNewCardToServer,
  deleteCardFromServer,
} from "./api.js";
import { updateUserProfile } from "./profile.js";

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
  profileAvatar: ".profile__image",
  profileName: ".profile__title",
  profileDescription: ".profile__description",
  editProfileButton: ".profile__edit-button",
  addCardButton: ".profile__add-button",
  placeNameInput: "input[name='place-name']",
  linkInput: "input[name='link']",
  cardTemplate: "#card-template",
  imageElement: ".card__image",
  cardTitle: ".card__title",
  deleteCardButton: ".card__delete-button",
  likeCountElement: ".card__like-count",
  likeCardButton: ".card__like-button",
};

// Константы для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};

// Вызов функции для включения валидации
enableValidation(validationConfig);

// Использование констант
const cardContainer = document.querySelector(selectors.cardContainer);
const popupTypeImage = document.querySelector(selectors.popupTypeImage);
const imagePopup = popupTypeImage.querySelector(selectors.imagePopup);
const captionPopup = popupTypeImage.querySelector(selectors.captionPopup);
const popupCloseButton = document.querySelectorAll(selectors.popupCloseButton);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const profileFormElement = document.querySelector("form[name='edit-profile']");
const cardFormElement = document.querySelector("form[name='new-place']");
const nameInput = document.querySelector(selectors.nameInput);
const jobInput = document.querySelector(selectors.jobInput);
const profileAvatar = document.querySelector(selectors.profileAvatar);
const profileName = document.querySelector(selectors.profileName);
const profileDescription = document.querySelector(selectors.profileDescription);
const editProfileButton = document.querySelector(selectors.editProfileButton);
const addCardButton = document.querySelector(selectors.addCardButton);
const placeNameInput = document.querySelector(selectors.placeNameInput);
const linkInput = document.querySelector(selectors.linkInput);
const cardTemplate = document.querySelector(selectors.cardTemplate);
const imageElement = document.querySelector(selectors.imageElement);
const cardTitle = document.querySelector(selectors.cardTitle);
const deleteCardButton = document.querySelector(selectors.deleteCardButton);
const likeCountElement = document.querySelector(selectors.likeCountElement);
const likeCardButton = document.querySelector(selectors.likeCardButton);

const clickEventType = "click";
const submitEventType = "submit";

const profileUpdateErrorText = "Ошибка при обновлении профиля:";
const cardCreateErrorText = "Ошибка при создании карточки:";
const cardDeleteErrorText = "Ошибка удаления карточки:";

/** Добавление классов анимации для всех попапов */
popupTypeImage.classList.add("popup_is-animated");
popupEditProfile.classList.add("popup_is-animated");
popupAddCard.classList.add("popup_is-animated");

/**
 * Открывает popup с увеличенным изображением и его описанием.
 * @param {HTMLImageElement} imageElement - Элемент изображения карточки.
 */
function handleImageClick(imageElement) {
  imagePopup.src = imageElement.src;
  imagePopup.alt = imageElement.alt;
  captionPopup.textContent = imageElement.alt;

  openPopup(popupTypeImage);
}

function handleLikeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(cardId, card) {
  deleteCardFromServer(cardId)
    .then(() => {
      card.remove();
    })
    .catch((error) => {
      console.error(cardDeleteErrorText + error);
    });
}

/**
 * Открывает форму редактирования профиля и
 * заполняет поля значениями из профиля,
 * сбрасывает ошибки валидации перед открытием формы.
 */
editProfileButton.addEventListener(clickEventType, function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(profileFormElement, validationConfig);
  openPopup(popupEditProfile);
});

/**
 * Открывает popup для добавления новой карточки,
 * отчищает поля ввода и
 * сбрасывает ошибки валидации перед открытием формы.
 */
addCardButton.addEventListener(clickEventType, function () {
  placeNameInput.value = "";
  linkInput.value = "";

  clearValidation(cardFormElement, validationConfig);
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

  const nameValue = textProcessor(nameInput.value);
  const jobValue = textProcessor(jobInput.value);

  updateUserInfo(nameValue, jobValue)
    .then((updatedUserData) => {
      updateUserProfile(
        profileName,
        profileDescription,
        profileAvatar,
        updatedUserData
      );

      closePopup(popupEditProfile);
      evt.target.reset();
    })
    .catch((error) => {
      console.error(profileUpdateErrorText + error);
    });
}
/**
 * Обрабатывает сабмит формы карточки, создает новую карточку и добавляет ее в начало списка.
 *
 * @param {Event} evt - Событие сабмита формы.
 * @param {Function} textProcessor - Функция для обработки текста (например, замена сложных символов).
 */
function handleCardFormSubmit(evt, textProcessor) {
  evt.preventDefault();

  const placeNameValue = textProcessor(placeNameInput.value);
  const linkValue = textProcessor(linkInput.value);

  const cardData = { name: placeNameValue, link: linkValue };

  addNewCardToServer(cardData.name, cardData.link)
    .then((createdCard) => {
      cardContainer.prepend(
        createCard(
          selectors,
          createdCard,
          handleDeleteCard,
          handleLikeCard,
          handleImageClick
        )
      );

      closePopup(popupAddCard);
      evt.target.reset();
    })
    .catch((err) => {
      console.error(cardCreateErrorText + err);
    });
}

// Обработка отправки формы профиля
profileFormElement.addEventListener(submitEventType, function (evt) {
  handleProfileFormSubmit(evt, replaceDifficultLetter);
});

// Обработка отправки формы карточки
cardFormElement.addEventListener(submitEventType, function (evt) {
  handleCardFormSubmit(evt, replaceDifficultLetter);
});

// Обработка закрытия всех попапов по клику на кнопку закрытия
popupCloseButton.forEach((button) => {
  button.addEventListener(clickEventType, () => {
    closePopup(document.querySelector(".popup_is-opened"));
  });
});

/**
 * Загружает информацию о пользователе и карточки, затем обновляет профиль
 * и отрисовывает карточки на странице.
 *
 * @returns {Promise<void>} - Обещание, которое разрешается после успешного выполнения всех действий.
 */
Promise.all([getUserInfo(), getInitialCard()])
  .then(([userData, cards]) => {
    const currentUserId = userData._id;

    updateUserProfile(profileName, profileDescription, profileAvatar, userData);

    cards.forEach((cardData) => {
      if (isValidCardData(cardData)) {
        const cardElement = createCard(
          selectors,
          cardData,
          currentUserId,
          () => handleDeleteCard(cardData._id, cardElement),
          (likeButton) => handleLikeCard(likeButton, cardData, currentUserId),
          () => handleImageClick(cardData)
        );
        cardContainer.append(cardElement);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
