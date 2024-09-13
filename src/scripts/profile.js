/**
 * Обновляет аватар пользователя, устанавливая изображение фона для элемента аватара.
 *
 * @param {HTMLElement} profileAvatar - DOM-элемент, представляющий аватар профиля.
 * @param {Object} userData - Объект с данными пользователя, содержащий URL аватара.
 * @param {string} userData.avatar - URL изображения аватара пользователя.
 */
export function updateUserAvatar(profileAvatar, userData) {
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
}

/**
 * Обновляет информацию профиля пользователя на странице.
 *
 * @param {HTMLElement} profileName - Элемент, отображающий имя профиля.
 * @param {HTMLElement} profileDescription - Элемент, отображающий описание профиля.
 * @param {Object} userData - Объект с данными пользователя.
 * @param {string} userData.name - Имя пользователя.
 * @param {string} userData.about - Описание пользователя (о себе).
 */
export function updateUserProfile(profileName, profileDescription, userData) {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
}
