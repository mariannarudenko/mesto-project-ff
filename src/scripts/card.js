const displayBlock = "block";
const displayNone = "none";

const clickEventType = "click";

export function createCard(
  selectors,
  cardData,
  currentUserId,
  deleteCallback,
  likeCallback,
  imageClickCallback
) {
  const cardTemplate = document.querySelector(selectors.cardTemplate).content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const imageElement = cardElement.querySelector(selectors.imageElement);
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  cardElement.querySelector(selectors.cardTitle).textContent = cardData.name;

  handleDeleteButtonVisibility(
    cardElement,
    cardData.owner._id === currentUserId,
    selectors
  );

  const likeCountElement = cardElement.querySelector(
    selectors.likeCountElement
  );
  likeCountElement.textContent = cardData.likes.length;

  addCardEventListeners(
    cardElement,
    cardData,
    deleteCallback,
    likeCallback,
    imageClickCallback,
    selectors
  );

  return cardElement;
}

function handleDeleteButtonVisibility(cardElement, isOwner, selectors) {
  const deleteButton = cardElement.querySelector(selectors.deleteCardButton);
  deleteButton.style.display = isOwner ? displayBlock : displayNone;
}

function addCardEventListeners(
  cardElement,
  cardData,
  deleteCallback,
  likeCallback,
  imageClickCallback,
  selectors
) {
  cardElement
    .querySelector(selectors.deleteCardButton)
    .addEventListener(clickEventType, () => {
      deleteCallback(cardData.owner._id, imageElement);
    });

  cardElement
    .querySelector(selectors.likeCardButton)
    .addEventListener(clickEventType, (evt) => {
      likeCallback(evt.target);
    });

  const imageElement = cardElement.querySelector(selectors.imageElement);
  imageElement.addEventListener(clickEventType, () => {
    imageClickCallback(imageElement);
  });
}
