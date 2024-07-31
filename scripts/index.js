/**
 * Создает элемент карточки на основе предоставленных данных.
 * @param {Object} cardData - Данные для создания карточки.
 * @param {string} cardData.link - Ссылка на изображение карточки.
 * @param {string} cardData.name - Название карточки.
 * @param {Function} deleteCallback - Функция обратного вызова для удаления карточки.
 * @returns {HTMLElement} - Созданный элемент карточки.
 */
function createCard (cardData, deleteCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCallback(cardElement);
  });
  return cardElement;
}

/**
 * Удаляет элемент карточки из DOM.
 * @param {HTMLElement} card - Элемент карточки для удаления.
 */
function handleDeleteCard (card) {
  card.remove();
} 

/**
 * Контейнер для карточек.
 * @type {HTMLElement}
 */
const cardContainer = document.querySelector('.places__list');


/**
 * Добавляет карточки в контейнер на основе массива данных.
 * @param {Array<Object>} initialCards - Массив данных для карточек.
 * @param {string} initialCards[].link - Ссылка на изображение карточки.
 * @param {string} initialCards[].name - Название карточки.
 */
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleDeleteCard);
  cardContainer.appendChild(cardElement);
}); 


