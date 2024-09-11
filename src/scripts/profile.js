/**
 * Обновляет информацию профиля пользователя на странице.
 *
 * @param {HTMLElement} profileName - Элемент, отображающий имя профиля.
 * @param {HTMLElement} profileDescription - Элемент, отображающий описание профиля.
 * @param {HTMLElement} profileAvatar - Элемент, отображающий аватар профиля.
 * @param {Object} userData - Объект с данными пользователя.
 * @param {string} userData.name - Имя пользователя.
 * @param {string} userData.about - Описание пользователя (о себе).
 * @param {string} userData.avatar - URL аватара пользователя.
 */
export function updateUserProfile(
  profileName,
  profileDescription,
  profileAvatar,
  userData
) {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
}
