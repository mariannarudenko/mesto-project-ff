// создаю функцию, которая принимает два аргумента: объект карточки и коллбек для удаления 
function createCard (cardData, deleteCallback) {
  // находит и возвращает содержимое card-template
  const cardTemplate = document.querySelector('#card-template').content;
  // клонирует элемент с классом places__item вместе с потомками
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  // находит элемент внутри клонированного шаблона и устанавливает значения из объекта cardData 
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // обработчик клика по кнопке с классом card__delete-button
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    //вызывает функцию удаления на кликнутую карточку
    deleteCallback(cardData);
  });
  // возвращает клонированный и заполненный элемент карточки
  return cardElement;
}

// находит и возвращает places__list
const cardContainer = document.querySelector('.places__list');

//перебирает массив объектов и передает данные как cardData
initialCards.forEach((cardData) => {
  //передает данные для текущей карточки и коллбек-функцию для удаления
  const cardElement = createCard(cardData, (data) => {
    //карточка удаляется если пользователь кликает по кнопке
    cardElement.remove();
  });
  //добавляет созданный элемент в конец списка places__list
  cardContainer.appendChild(cardElement);
});


