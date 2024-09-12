const clickEventType = "click";

/**
 * Создает элемент карточки и добавляет все необходимые обработчики.
 *
 * @param {Object} selectors - Объект с CSS-селекторами.
 * @param {Object} cardData - Данные карточки.
 * @param {string} loggedInUserId - Идентификатор текущего пользователя.
 * @param {Function} deleteCallback - Коллбэк для удаления карточки.
 * @param {Function} likeCallback - Коллбэк для лайка карточки.
 * @param {Function} imageClickCallback - Коллбэк для клика на изображение.
 * @returns {HTMLElement} - Возвращает DOM-элемент карточки.
 */
export function createCard(
  selectors,
  cardData,
  loggedInUserId,
  deleteCallback,
  likeCallback,
  imageClickCallback
) {
  const cardElement = createCardElement(selectors.cardTemplate);

  const cardImage = cardElement.querySelector(selectors.cardImage);
  const cardTitle = cardElement.querySelector(selectors.cardTitle);
  const deleteButton = cardElement.querySelector(selectors.deleteCardButton);
  const likeButton = cardElement.querySelector(selectors.likeCardButton);
  const likeCount = cardElement.querySelector(selectors.likeCountElement);

  setCardData(cardImage, cardTitle, cardData);

  updateDeleteButtonVisibility(
    deleteButton,
    cardData.owner._id === loggedInUserId
  );

  showLikeCount(likeCount, cardData.likes.length);
  setLikeButtonToggle(likeButton, cardData, loggedInUserId);

  addCardEventListeners(
    cardElement,
    deleteButton,
    likeButton,
    cardImage,
    cardData,
    deleteCallback,
    likeCallback,
    imageClickCallback
  );

  return cardElement;
}

/**
 * Создает DOM-элемент карточки на основе шаблона.
 *
 * @param {string} cardTemplate - CSS-селектор шаблона карточки.
 * @returns {HTMLElement} - Возвращает элемент карточки.
 */
function createCardElement(cardTemplate) {
  const cardTemplateContent = document.querySelector(cardTemplate).content;
  return cardTemplateContent.querySelector(".places__item").cloneNode(true);
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
  const isLikedByLoggedUser = cardData.likes.some(
    (like) => like._id === loggedInUserId
  );
  likeButton.classList.toggle(
    "card__like-button_is-active",
    isLikedByLoggedUser
  );
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
 * @param {HTMLElement} cardElement - Элемент карточки.
 * @param {HTMLElement} deleteButton - Кнопка удаления карточки.
 * @param {HTMLElement} likeButton - Кнопка лайка карточки.
 * @param {HTMLImageElement} cardImage - Элемент изображения карточки.
 * @param {Object} cardData - Данные карточки.
 * @param {Function} deleteCallback - Коллбэк для удаления карточки.
 * @param {Function} likeCallback - Коллбэк для лайка карточки.
 * @param {Function} imageClickCallback - Коллбэк для клика на изображение карточки.
 */
function addCardEventListeners(
  cardElement,
  deleteButton,
  likeButton,
  cardImage,
  cardData,
  deleteCallback,
  likeCallback,
  imageClickCallback
) {
  deleteButton.addEventListener(clickEventType, () => {
    deleteCallback(cardData._id, cardElement);
  });

  likeButton.addEventListener(clickEventType, () => {
    likeCallback(cardData._id, cardElement);
  });

  cardImage.addEventListener(clickEventType, () => {
    imageClickCallback(cardData);
  });
}
