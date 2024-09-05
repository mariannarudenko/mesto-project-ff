/**
 * Создает карточку с заданными данными и добавляет обработчики событий для удаления, лайка и клика по изображению.
 * @param {Object} cardData - Данные для карточки.
 * @param {string} cardData.name - Название места.
 * @param {string} cardData.link - Ссылка на изображение места.
 * @param {function} deleteCallback - Функция обратного вызова для удаления карточки.
 * @param {function} likeCallback - Функция обратного вызова для обработки лайка.
 * @param {function} imageClickCallback - Функция обратного вызова для клика по изображению.
 * @returns {HTMLElement} - Созданный элемент карточки.
 */
export function createCard(
  cardData,
  deleteCallback,
  likeCallback,
  imageClickCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCallback(cardElement);
    });

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      likeCallback(evt.target);
    });

  imageElement.addEventListener("click", () => {
    imageClickCallback(imageElement);
  });

  return cardElement;
}

/**
 * Удаляет указанную карточку.
 * @param {HTMLElement} card - Карточка, которую нужно удалить.
 */
export function handleDeleteCard(card) {
  card.remove();
}
