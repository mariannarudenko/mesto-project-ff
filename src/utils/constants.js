export const selectors = {
  imagePopup: ".popup__image",
  captionPopup: ".popup__caption",
};

export const cardConfig = {
  cardElement: ".places__item",
  cardTemplate: "#card-template",
  cardImage: ".card__image",
  cardTitle: ".card__title",
  deleteCardButton: ".card__delete-button",
  likeCount: ".card__like-count",
  likeCardButton: ".card__like-button",
};

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButton: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};

export const forms = {
  avatar: document.forms["new-avatar"],
  profile: document.forms["edit-profile"],
  card: document.forms["new-place"],
};

export const inputs = {
  avatar: {
    url: forms.avatar.elements["avatar-link"],
  },
  profile: {
    name: forms.profile.elements["name"],
    description: forms.profile.elements["description"],
  },
  card: {
    placeName: forms.card.elements["place-name"],
    link: document.querySelector('input[name="link"]'),
  },
};

export const cardContainer = document.querySelector(".places__list");

export const profileAvatar = document.querySelector(".profile__image");
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const editAvatarButton = document.querySelector(
  ".profile__image-edit-button"
);
export const addCardButton = document.querySelector(".profile__add-button");

export const popupEditProfile = document.querySelector(".popup_type_edit");
export const popupAddCard = document.querySelector(".popup_type_new-card");
export const popupTypeImage = document.querySelector(".popup_type_image");
export const popupDeleteCard = document.querySelector(
  ".popup_type_card-delete"
);
export const popupChangeAvatar = document.querySelector(
  ".popup_type_new-avatar"
);
export const popupCloseButtons = document.querySelectorAll(".popup__close");
export const imagePopup = document.querySelector(".popup__image");
export const captionPopup = document.querySelector(".popup__caption");
