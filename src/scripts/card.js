const displayBlock = "block";
const displayNone = "none";

const clickEventType = "click";
export function createCard(
  selectors,
  cardData,
  loggedInUserId,
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
  console.log("loggedInUserId", loggedInUserId);
  cardElement.querySelector(selectors.cardTitle).textContent = cardData.name;
  updateDeleteButtonVisibility(
    cardElement,
    cardData.owner._id,
    loggedInUserId,
    selectors
  );
  console.log("loggedInUserId", loggedInUserId);
  cardElement.querySelector(selectors.likeCountElement).textContent =
    cardData.likes.length;

  addCardEventListeners(
    cardElement,
    cardData,
    deleteCallback,
    likeCallback,
    imageClickCallback,
    selectors,
    imageElement
  );
  return cardElement;
}

function updateDeleteButtonVisibility(
  cardElement,
  ownerId,
  loggedInUserId,
  selectors
) {
  const deleteButton = cardElement.querySelector(selectors.deleteCardButton);
  deleteButton.style.display = displayBlock;

  if (ownerId !== loggedInUserId) {
    deleteButton.style.display = displayNone;
  }
}

function addCardEventListeners(
  cardElement,
  cardData,
  deleteCallback,
  likeCallback,
  imageClickCallback,
  selectors,
  imageElement
) {
  cardElement
    .querySelector(selectors.deleteCardButton)
    .addEventListener(clickEventType, () => {
      deleteCallback(cardData._id, cardElement);
    });

  cardElement
    .querySelector(selectors.likeCardButton)
    .addEventListener(clickEventType, (evt) => {
      likeCallback(evt.target);
    });

  imageElement.addEventListener(clickEventType, () => {
    imageClickCallback(cardData);
  });
}
