import "../pages/index.css";
import {
  getUserInfo,
  getInitialCard,
  updateUserInfo,
  isValidImageUrl,
  addNewCardToServer,
  deleteCardFromServer,
  setCardLike,
  unsetCardLike,
  updateAvatar,
} from "./api.js";
import { createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { updateUserProfile, updateUserAvatar } from "./profile.js";
import {
  enableValidation,
  checkInputValidity,
  clearValidation,
  isValidCardData,
} from "./validation.js";
import {
  selectors,
  cardConfig,
  validationConfig,
  forms,
  inputs,
  cardContainer,
  profileAvatar,
  profileName,
  profileDescription,
  editProfileButton,
  editAvatarButton,
  addCardButton,
  popupEditProfile,
  popupAddCard,
  popupTypeImage,
  popupDeleteCard,
  popupChangeAvatar,
  popupCloseButtons,
} from "../utils/constants.js";
import { handleFirstTab, handleMouseDown } from "../utils/utils.js";

(function () {
  const errorText = "Ошибка:";
  let loggedInUserId;

  enableValidation(validationConfig);

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
    popupTypeImage,
    popupEditProfile,
    popupAddCard,
    popupDeleteCard
  );

  /**
   * Обновляет кнопку внутри попапа, чтобы показать, что идет процесс сохранения.
   * Меняет текст кнопки на "Сохранение..." и отключает её.
   *
   * @param {HTMLElement} popup - Элемент попапа, содержащий кнопку.
   */

  let dataset;

  function addUxOnButton(popup) {
    const button = popup.querySelector(validationConfig.submitButtonSelector);
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
    const button = popup.querySelector(validationConfig.submitButtonSelector);
    button.textContent = dataset;
    button.disabled = false;
  }

  /**
   * Обрабатывает клик по изображению, обновляя попап с изображением и открывая его.
   * @param {string} name - Название изображения, которое будет отображаться в подписи попапа.
   * @param {string} link - Ссылка на изображение, которое будет отображаться в попапе.
   */
  function handleImageClick(name, link) {
    const currentImagePopup = popupTypeImage.querySelector(
      selectors.imagePopup
    );

    const currentCaptionPopup = popupTypeImage.querySelector(
      selectors.captionPopup
    );

    currentImagePopup.src = link;
    currentImagePopup.alt = name;
    currentCaptionPopup.textContent = name;
    openPopup(popupTypeImage);
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
    const currentLikeButton = cardElement.querySelector(
      cardConfig.likeCardButton
    );
    const currentLikeCounter = cardElement.querySelector(cardConfig.likeCount);
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
        .catch(handleError);
    } else {
      setCardLike(cardId)
        .then((res) => {
          toggleLikeButtonState(true, res.likes.length);
        })
        .catch(handleError);
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
    .querySelector(validationConfig.submitButtonSelector)
    .addEventListener("click", function () {
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
  editAvatarButton.addEventListener("click", function () {
    forms.avatar.reset();

    clearValidation(forms.avatar, validationConfig);
    openPopup(popupChangeAvatar);
  });

  /**
   * Открывает форму редактирования профиля и
   * заполняет поля значениями из профиля,
   * сбрасывает ошибки валидации перед открытием формы.
   */
  editProfileButton.addEventListener("click", function () {
    inputs.profile.name.value = profileName.textContent;
    inputs.profile.description.value = profileDescription.textContent;

    clearValidation(forms.profile, validationConfig);
    openPopup(popupEditProfile);
  });

  /**
   * Открывает popup для добавления новой карточки,
   * отчищает поля ввода и
   * сбрасывает ошибки валидации перед открытием формы.
   */
  addCardButton.addEventListener("click", function () {
    forms.card.reset();
    clearValidation(forms.card, validationConfig);
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

  async function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    addUxOnButton(popupChangeAvatar);

    const linkValue = inputs.avatar.url.value;
    const isValid = await isValidImageUrl(linkValue);

    if (isValid) {
        try {
            const updatedUserAvatar = await updateAvatar(linkValue);
            updateUserAvatar(profileAvatar, updatedUserAvatar);
            closePopup(popupChangeAvatar);
            evt.target.reset();
        } catch (error) {
            handleError(error);
        } finally {
            removeUxOnButton(popupChangeAvatar);
        }
    } else {
        checkInputValidity(
            inputs.avatar.url, 
            forms.avatar, 
            validationConfig,
            isValid
        );
        removeUxOnButton(popupChangeAvatar);
    }
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

    const nameValue = textProcessor(inputs.profile.name.value);
    const jobValue = textProcessor(inputs.profile.description.value);

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
   * Отрисовывает карточку на странице.
   *
   * @param {Object} cardData - Данные карточки, включающие информацию о названии, ссылке на изображение, количестве лайков и идентификаторе.
   * @param {string} method - Метод добавления элемента в контейнер карточек. Это может быть 'append' для добавления в конец или 'prepend' для добавления в начало.
   *
   * @returns {void}
   */
  function renderCard(cardData, method) {
    const cardElement = createCard(cardData, {
      cardConfig,
      loggedInUserId,
      deleteCallback: () => handleDeleteCard(cardData._id, cardElement),
      likeCallback: () => handleLikeCard(cardData._id, cardElement),
      imageClickCallback: () => handleImageClick(cardData.name, cardData.link),
    });

    cardContainer[method](cardElement);
  }

  /**
   * Обрабатывает отправку формы добавления карточки, отправляя данные на сервер и обновляя отображение карточек.
   * @param {Event} evt - Событие отправки формы.
   * @param {Function} textProcessor - Функция для обработки текста полей формы перед отправкой.
   */
  async function handleCardFormSubmit(evt, textProcessor) {
    evt.preventDefault();
  
    addUxOnButton(popupAddCard);
  
    const placeNameValue = textProcessor(inputs.card.placeName.value);
    const linkValue = inputs.card.link.value;
  
    const isValid = await isValidImageUrl(linkValue);
  
    if (isValid) {
      addNewCardToServer(placeNameValue, linkValue)
        .then((createdCard) => {
          renderCard(createdCard, "prepend");
          closePopup(popupAddCard);
          evt.target.reset();
        })
        .catch(handleError)
        .finally(() => {
          removeUxOnButton(popupAddCard);
        });
    } else {
      checkInputValidity(
        inputs.card.link,
        forms.card,
        validationConfig,
        isValid
      ); 
      removeUxOnButton(popupAddCard);
    }
  }



  /**
   * Обработчик события отправки формы аватара.
   * При отправке формы вызывает функцию `handleAvatarFormSubmit` для обработки данных формы.
   */
  forms.avatar.addEventListener("submit", handleAvatarFormSubmit);

  /**
   * Обработчик события отправки формы профиля.
   * При отправке формы вызывает функцию `handleProfileFormSubmit` для обработки данных формы.
   * @param {Event} evt - Событие отправки формы.
   */
  forms.profile.addEventListener("submit", function (evt) {
    handleProfileFormSubmit(evt, replaceDifficultLetter);
  });

  /**
   * Обработчик события отправки формы добавления карточки.
   * При отправке формы вызывает функцию `handleCardFormSubmit` для обработки данных формы.
   * @param {Event} evt - Событие отправки формы.
   */
  forms.card.addEventListener("submit", function (evt) {
    handleCardFormSubmit(evt, replaceDifficultLetter);
  });

  /**
   * Добавляет обработчик события клика для всех кнопок закрытия попапов.
   * При клике на кнопку закрытия закрывает попап с классом "popup_is-opened".
   */
  popupCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closePopup(document.querySelector(".popup_is-opened"));
    });
  });

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
          renderCard(cardData, "append");
        }
      });
    })
    .catch(handleError);

  /**
   * Обработчики состояния focus у страницы
   */
  window.addEventListener("keydown", handleFirstTab);
  window.addEventListener("mousedown", handleMouseDown);
})();
