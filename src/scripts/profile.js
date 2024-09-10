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