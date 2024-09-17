/**
 * Создает элемент карточки и добавляет все необходимые обработчики.
 *
 * @param {Object} cardData - Данные карточки.
 * @param {Object} params - Параметры для создания карточки.
 * @param {string} params.cardConfig - Объект CSS-селекторов карточки.
 * @param {string} params.loggedInUserId - Идентификатор текущего пользователя.
 * @param {Function} params.deleteCallback - Коллбэк для удаления карточки.
 * @param {Function} params.likeCallback - Коллбэк для лайка карточки.
 * @param {Function} params.imageClickCallback - Коллбэк для клика на изображение.
 * @returns {HTMLElement} - Возвращает DOM-элемент карточки.
 */
export function createCard(
  cardData,
  {
    cardConfig,
    loggedInUserId,
    deleteCallback,
    likeCallback,
    imageClickCallback,
  }
) {
  const cardElement = createCardElement(cardConfig);

  const cardImage = cardElement.querySelector(cardConfig.cardImage);
  const cardTitle = cardElement.querySelector(cardConfig.cardTitle);
  const deleteButton = cardElement.querySelector(cardConfig.deleteCardButton);
  const likeButton = cardElement.querySelector(cardConfig.likeCardButton);
  const likeCount = cardElement.querySelector(cardConfig.likeCount);

  setCardData(cardImage, cardTitle, cardData);

  updateDeleteButtonVisibility(
    deleteButton,
    cardData.owner._id === loggedInUserId
  );

  showLikeCount(likeCount, cardData.likes.length);
  setLikeButtonToggle(likeButton, cardData, loggedInUserId);

  addCardEventListeners(
    deleteButton,
    likeButton,
    cardImage,
    deleteCallback,
    likeCallback,
    imageClickCallback
  );

  return cardElement;
}

/**
 * Создает DOM-элемент карточки на основе шаблона.
 *
 * @param {string} cardConfig - объект CSS-селекторов карточки.
 * @returns {HTMLElement} - Возвращает элемент карточки.
 */
function createCardElement(cardConfig) {
  const cardTemplateContent = document.querySelector(
    cardConfig.cardTemplate
  ).content;
  const cardTemplateElement = cardTemplateContent.querySelector(
    cardConfig.cardElement
  );

  return cardTemplateElement.cloneNode(true);
}

/**
 * Устанавливает данные для карточки (изображение и заголовок).
 *
 * @param {HTMLImageElement} cardImage - Элемент изображения карточки.
 * @param {HTMLElement} cardTitle - Элемент заголовка карточки.
 * @param {Object} cardData - Данные карточки.
 * @param {string} cardData.link - Ссылка на изображение карточки.
 * @param {string} cardData.name - Название карточки.
 */
function setCardData(cardImage, cardTitle, cardData) {
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
}

/**
 * Показывает или скрывает кнопку удаления, в зависимости от владельца карточки.
 *
 * @param {HTMLElement} deleteButton - Кнопка удаления карточки.
 * @param {boolean} isOwner - Является ли пользователь владельцем карточки.
 */
function updateDeleteButtonVisibility(deleteButton, isOwner) {
  deleteButton.style.display = isOwner ? "block" : "none";
}

/**
 * Устанавливает активное состояние кнопки лайка, если карточка уже лайкнута пользователем.
 *
 * @param {HTMLElement} likeButton - Кнопка лайка карточки.
 * @param {Object} cardData - Данные карточки.
 * @param {string} loggedInUserId - Идентификатор текущего пользователя.
 */
function setLikeButtonToggle(likeButton, cardData, loggedInUserId) {
  const likeButtonIsActive = "card__like-button_is-active";

  const isLikedByLoggedUser = cardData.likes.some(
    (like) => like._id === loggedInUserId
  );

  likeButton.classList.toggle(likeButtonIsActive, isLikedByLoggedUser);
}

/**
 * Отображает количество лайков карточки.
 *
 * @param {HTMLElement} likeCount - Элемент, содержащий количество лайков.
 * @param {number} likes - Количество лайков карточки.
 */
function showLikeCount(likeCount, likes) {
  likeCount.textContent = likes;
}

/**
 * Добавляет обработчики событий для карточки (удаление, лайк, клик по изображению).
 *
 * @param {HTMLElement} deleteButton - Кнопка удаления карточки.
 * @param {HTMLElement} likeButton - Кнопка лайка карточки.
 * @param {HTMLImageElement} cardImage - Элемент изображения карточки.
 * @param {Function} deleteCallback - Коллбэк для удаления карточки.
 * @param {Function} likeCallback - Коллбэк для лайка карточки.
 * @param {Function} imageClickCallback - Коллбэк для клика на изображение карточки.
 */
function addCardEventListeners(
  deleteButton,
  likeButton,
  cardImage,
  deleteCallback,
  likeCallback,
  imageClickCallback
) {
  deleteButton.addEventListener("click", deleteCallback);

  likeButton.addEventListener("click", likeCallback);

  cardImage.addEventListener("click", imageClickCallback);
}
