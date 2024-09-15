import "../pages/index.css";
import {
  getUserInfo,
  getInitialCard,
  updateUserInfo,
  addNewCardToServer,
  deleteCardFromServer,
  setCardLike,
  unsetCardLike,
  updateAvatar,
  isValidImageUrl,
  isValidAvatarUrl,
} from "./api.js";
import { createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { updateUserProfile, updateUserAvatar } from "./profile.js";
import {
  enableValidation,
  clearValidation,
  isValidCardData,
} from "./validation.js";

/**
 * Объект селекторов для различных элементов на странице.
 * @type {Object}
 * @property {string} cardContainer Селектор контейнера карточек.
 * @property {string} cardTemplate Селектор шаблона карточки.
 * @property {string} cardImage Селектор изображения карточки.
 * @property {string} cardTitle Селектор заголовка карточки.
 * @property {string} deleteCardButton Селектор кнопки удаления карточки.
 * @property {string} likeCountElement Селектор элемента количества лайков карточки.
 * @property {string} likeCardButton Селектор кнопки лайка карточки.
 * @property {string} popupTypeImage Селектор попапа с изображением.
 * @property {string} imagePopup Селектор попапа с изображением.
 * @property {string} captionPopup Селектор попапа с подписью.
 * @property {string} popupCloseButton Селектор кнопки закрытия попапа.
 * @property {string} popupEditProfile Селектор попапа редактирования профиля.
 * @property {string} popupAddCard Селектор попапа добавления карточки.
 * @property {string} popupDeleteCard Селектор попапа удаления карточки.
 * @property {string} nameInput Селектор поля ввода имени.
 * @property {string} jobInput Селектор поля ввода описания.
 * @property {string} placeNameInput Селектор поля ввода названия места.
 * @property {string} linkInput Селектор поля ввода ссылки.
 * @property {string} popupChangeAvatar Селектор попапа изменения аватара.
 * @property {string} avatarInput Селектор поля ввода ссылки.
 * @property {string} profileAvatar Селектор аватара профиля.
 * @property {string} editAvatarButton Селектор кнопки редактирования аватара.
 * @property {string} profileName Селектор имени профиля.
 * @property {string} profileDescription Селектор описания профиля.
 * @property {string} editProfileButton Селектор кнопки редактирования профиля.
 * @property {string} addCardButton Селектор кнопки добавления карточки.
 * @property {string} profileForm Селектор формы редактирования профиля.
 * @property {string} cardForm Селектор формы добавления карточки.
 */
const selectors = {
  cardContainer: ".places__list",
  cardTemplate: "#card-template",
  cardImage: ".card__image",
  cardTitle: ".card__title",
  deleteCardButton: ".card__delete-button",
  likeCountElement: ".card__like-count",
  likeCardButton: ".card__like-button",

  popupTypeImage: ".popup_type_image",
  imagePopup: ".popup__image",
  captionPopup: ".popup__caption",
  popupCloseButton: ".popup__close",
  popupEditProfile: ".popup_type_edit",
  popupAddCard: ".popup_type_new-card",
  popupDeleteCard: ".popup_type_card-delete",

  nameInput: ".popup__input_type_name",
  jobInput: ".popup__input_type_description",
  placeNameInput: "input[name='place-name']",
  linkInput: "input[name='link']",

  popupChangeAvatar: ".popup_type_new-avatar",
  avatarInput: "input[name='avatar-link']",
  editAvatarButton: ".profile__image-edit-button",

  profileAvatar: ".profile__image",
  profileName: ".profile__title",
  profileDescription: ".profile__description",
  editProfileButton: ".profile__edit-button",
  addCardButton: ".profile__add-button",

  avatarForm: "form[name='new-avatar']",
  profileForm: "form[name='edit-profile']",
  cardForm: "form[name='new-place']",
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};

enableValidation(validationConfig);

const cardContainer = document.querySelector(selectors.cardContainer);
const popupImageContainer = document.querySelector(selectors.popupTypeImage);
const imagePopup = popupImageContainer.querySelector(selectors.imagePopup);
const captionPopup = popupImageContainer.querySelector(selectors.captionPopup);
const popupCloseButtons = document.querySelectorAll(selectors.popupCloseButton);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const popupDeleteCard = document.querySelector(selectors.popupDeleteCard);

const nameInput = document.querySelector(selectors.nameInput);
const jobInput = document.querySelector(selectors.jobInput);
const placeNameInput = document.querySelector(selectors.placeNameInput);
const linkInput = document.querySelector(selectors.linkInput);

const popupChangeAvatar = document.querySelector(selectors.popupChangeAvatar);
const avatarInput = document.querySelector(selectors.avatarInput);
const editAvatarButton = document.querySelector(selectors.editAvatarButton);

const profileAvatar = document.querySelector(selectors.profileAvatar);
const profileName = document.querySelector(selectors.profileName);
const profileDescription = document.querySelector(selectors.profileDescription);
const editProfileButton = document.querySelector(selectors.editProfileButton);
const addCardButton = document.querySelector(selectors.addCardButton);

const avatarFormElement = document.querySelector(selectors.avatarForm);
const profileFormElement = document.querySelector(selectors.profileForm);
const cardFormElement = document.querySelector(selectors.cardForm);

const errorText = "Ошибка:";

const clickEventType = "click";
const submitEventType = "submit";

/**
 * Добавляет класс анимации ко всем переданным элементам.
 * @param {...HTMLElement} elements - Элементы, к которым нужно добавить класс анимации.
 */
function addAnimationClass(...elements) {
  const popupIsAnimated = "popup_is-animated";
  elements.forEach((element) => element.classList.add(popupIsAnimated));
}

addAnimationClass(
  popupChangeAvatar,
  popupImageContainer,
  popupEditProfile,
  popupAddCard
);

/**
 * Обновляет кнопку внутри попапа, чтобы показать, что идет процесс сохранения.
 * Меняет текст кнопки на "Сохранение..." и отключает её.
 *
 * @param {HTMLElement} popup - Элемент попапа, содержащий кнопку.
 */

let dataset;

function addUxOnButton(popup) {
  const button = popup.querySelector(".popup__button");
  dataset = button.textContent;
  button.textContent = "Сохранение...";
  button.disabled = true;
}

/**
 * Восстанавливает исходное состояние кнопки после завершения процесса сохранения.
 * Возвращает текст кнопки и включает её обратно.
 *
 * @param {HTMLElement} popup - Элемент попапа, содержащий кнопку.
 */
function removeUxOnButton(popup) {
  const button = popup.querySelector(".popup__button");
  button.textContent = dataset;
  button.disabled = false;
}

/**
 * Обрабатывает клик по изображению, обновляя попап с изображением и открывая его.
 * @param {string} name - Название изображения, которое будет отображаться в подписи попапа.
 * @param {string} link - Ссылка на изображение, которое будет отображаться в попапе.
 */
function handleImageClick(name, link) {
  imagePopup.src = link;
  imagePopup.alt = name;
  captionPopup.textContent = name;

  openPopup(popupImageContainer);
}

/**
 * Обрабатывает ошибку, выводя сообщение об ошибке в консоль.
 * @param {Error|string} error - Ошибка, которую нужно обработать. Может быть объектом `Error` или строкой.
 */
const handleError = (error) => {
  console.error(errorText + error);
};

/**
 * Переключает состояние кнопки лайка и обновляет счётчик лайков.
 * @param {boolean} isActive - Флаг, указывающий, активна ли кнопка лайка.
 * @param {number} likeCount - Количество лайков, которое нужно отобразить.
 */
function handleLikeCard(cardId, cardElement) {
  const currentLikeButton = cardElement.querySelector(selectors.likeCardButton);
  const currentLikeCounter = cardElement.querySelector(
    selectors.likeCountElement
  );
  const likeButtonIsActive = "card__like-button_is-active";

  const toggleLikeButtonState = (isActive, likeCount) => {
    currentLikeButton.classList.toggle(likeButtonIsActive, isActive);
    currentLikeCounter.textContent = likeCount;
  };

  if (currentLikeButton.classList.contains(likeButtonIsActive)) {
    unsetCardLike(cardId)
      .then((res) => {
        toggleLikeButtonState(false, res.likes.length);
      })
      .catch((error) => {
        handleError(error);
        toggleLikeButtonState(
          currentLikeButton.classList.contains(likeButtonIsActive),
          currentLikeCounter.textContent
        );
      });
  } else {
    setCardLike(cardId)
      .then((res) => {
        toggleLikeButtonState(true, res.likes.length);
      })
      .catch((error) => {
        handleError(error);
        toggleLikeButtonState(
          currentLikeButton.classList.contains(likeButtonIsActive),
          currentLikeCounter.textContent
        );
      });
  }
}

// Переменные для хранения информации о карточке, которую нужно удалить
let deleteCardId = null;
let cardToDelete = null;

/**
 * Устанавливает идентификатор и элемент карточки для удаления и открывает попап подтверждения.
 * @param {string} cardId - Идентификатор карточки, которую нужно удалить.
 * @param {HTMLElement} card - Элемент карточки, которую нужно удалить.
 */
function handleDeleteCard(cardId, card) {
  deleteCardId = cardId;
  cardToDelete = card;
  openPopup(popupDeleteCard);
}

// Обработчик клика на кнопку подтверждения удаления карточки
popupDeleteCard
  .querySelector(".popup__button")
  .addEventListener(clickEventType, function () {
    if (deleteCardId && cardToDelete) {
      addUxOnButton(popupDeleteCard);
      deleteCardFromServer(deleteCardId)
        .then(() => {
          cardToDelete.remove();
          closePopup(popupDeleteCard);
        })
        .catch(handleError)
        .finally(() => {
          removeUxOnButton(popupDeleteCard);
        });
    }
  });

/**
 * Открывает форму редактирования аватарки и
 * отчищает поле ввода и
 * сбрасывает ошибки валидации перед открытием формы.
 */
editAvatarButton.addEventListener(clickEventType, function () {
  avatarInput.value = "";

  clearValidation(avatarFormElement, validationConfig);
  openPopup(popupChangeAvatar);
});

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
 * Обрабатывает сабмит формы смены аватара, обновляет данные аватара и закрывает попап.
 *
 * @param {Event} evt - Событие сабмита формы.
 */

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  addUxOnButton(popupChangeAvatar);

  const userData = { avatar: avatarInput.value };

  updateAvatar(userData)
    .then((updatedUserAvatar) => {
      updateUserAvatar(profileAvatar, updatedUserAvatar);

      closePopup(popupChangeAvatar);
      evt.target.reset();
    })
    .catch(handleError)
    .finally(() => {
      removeUxOnButton(popupChangeAvatar);
    });
}

/**
 * Обрабатывает сабмит формы профиля, обновляет данные профиля и закрывает попап.
 *
 * @param {Event} evt - Событие сабмита формы.
 * @param {Function} textProcessor - Функция для обработки текста (например, замена сложных символов).
 */
function handleProfileFormSubmit(evt, textProcessor) {
  evt.preventDefault();
  addUxOnButton(popupEditProfile);

  const nameValue = textProcessor(nameInput.value);
  const jobValue = textProcessor(jobInput.value);

  updateUserInfo(nameValue, jobValue)
    .then((updatedUserData) => {
      updateUserProfile(profileName, profileDescription, updatedUserData);

      closePopup(popupEditProfile);
      evt.target.reset();
    })
    .catch(handleError)
    .finally(() => {
      removeUxOnButton(popupEditProfile);
    });
}

/**
 * Обрабатывает отправку формы добавления карточки, отправляя данные на сервер и обновляя отображение карточек.
 * @param {Event} evt - Событие отправки формы.
 * @param {Function} textProcessor - Функция для обработки текста полей формы перед отправкой.
 */
function handleCardFormSubmit(evt, textProcessor) {
  evt.preventDefault();
  addUxOnButton(popupAddCard);
  const placeNameValue = textProcessor(placeNameInput.value);
  const linkValue = textProcessor(linkInput.value);

  const cardData = { name: placeNameValue, link: linkValue };

  addNewCardToServer(cardData.name, cardData.link)
    .then((createdCard) => {
      const newCardElement = createCard(
        selectors,
        createdCard,
        loggedInUserId,
        () => handleDeleteCard(createdCard._id, newCardElement),
        () => handleLikeCard(createdCard._id, newCardElement),
        () => handleImageClick(createdCard.name, createdCard.link)
      );

      cardContainer.prepend(newCardElement);

      closePopup(popupAddCard);
      evt.target.reset();
    })
    .catch(handleError)
    .finally(() => {
      removeUxOnButton(popupAddCard);
    });
}

/**
 * Обработчик события отправки формы аватара.
 * При отправке формы вызывает функцию `handleAvatarFormSubmit` для обработки данных формы.
 * @param {Event} evt - Событие отправки формы.
 */
avatarFormElement.addEventListener(submitEventType, function (evt) {
  handleAvatarFormSubmit(evt);
});

/**
 * Обработчик события отправки формы профиля.
 * При отправке формы вызывает функцию `handleProfileFormSubmit` для обработки данных формы.
 * @param {Event} evt - Событие отправки формы.
 */
profileFormElement.addEventListener(submitEventType, function (evt) {
  handleProfileFormSubmit(evt, replaceDifficultLetter);
});

/**
 * Обработчик события отправки формы добавления карточки.
 * При отправке формы вызывает функцию `handleCardFormSubmit` для обработки данных формы.
 * @param {Event} evt - Событие отправки формы.
 */
cardFormElement.addEventListener(submitEventType, function (evt) {
  handleCardFormSubmit(evt, replaceDifficultLetter);
});

/**
 * Добавляет обработчик события клика для всех кнопок закрытия попапов.
 * При клике на кнопку закрытия закрывает попап с классом "popup_is-opened".
 */
popupCloseButtons.forEach((button) => {
  button.addEventListener(clickEventType, () => {
    closePopup(document.querySelector(".popup_is-opened"));
  });
});

let loggedInUserId;

/**
 * Загружает информацию о пользователе и карточках с сервера, затем обновляет профиль
 * и отрисовывает карточки на странице. Если данные карточек валидны, создаёт элементы карточек
 * и добавляет их в контейнер карточек.
 *
 * @returns {Promise<void>} - Обещание, которое разрешается после успешного выполнения всех действий.
 */
Promise.all([getUserInfo(), getInitialCard()])
  .then(([userData, cards]) => {
    loggedInUserId = userData._id;

    updateUserAvatar(profileAvatar, userData);
    updateUserProfile(profileName, profileDescription, userData);

    cards.forEach((cardData) => {
      if (isValidCardData(cardData)) {
        const cardElement = createCard(
          selectors,
          cardData,
          loggedInUserId,
          () => handleDeleteCard(cardData._id, cardElement),
          () => handleLikeCard(cardData._id, cardElement),
          () => handleImageClick(cardData.name, cardData.link)
        );
        cardContainer.append(cardElement);
      }
    });
  })
  .catch(handleError);
