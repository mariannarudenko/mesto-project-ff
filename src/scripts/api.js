const baseUrl = "https://nomoreparties.co/v1";
const token = "82365ee2-2b03-4795-adca-78c4dec38143";
const groupId = "wff-cohort-22";

const headers = {
  authorization: token,
  "Content-Type": "application/json",
};

const getUser = "users/me";
const getAvatar = "users/me/avatar";
const getCards = "cards";
const getLikes = "likes";

const errorMessageText = "Что-то пошло не так:";

/**
 * Обрабатывает ответ сервера, проверяя статус и возвращая JSON или ошибку.
 *
 * @param {Response} res - Ответ от сервера.
 * @returns {Promise<JSON|Error>} - Обработанный ответ в формате JSON или ошибка.
 */
const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(errorMessageText + res.status);
  }
  return res.json();
};

/**
 * Выполняет GET-запрос на сервер.
 *
 * @param {string} endpoint - Конечная точка API.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const fetchFromServer = (endpoint) => {
  return fetch(`${baseUrl}/${groupId}/${endpoint}`, {
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

/**
 * Выполняет PATCH-запрос на сервер с передачей данных.
 *
 * @param {string} endpoint - Конечная точка API.
 * @param {Object} body - Данные для отправки на сервер.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const patchToServer = (endpoint, body) => {
  return fetch(`${baseUrl}/${groupId}/${endpoint}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(body),
  }).then(handleResponse);
};

/**
 * Выполняет POST-запрос на сервер с передачей данных.
 *
 * @param {string} endpoint - Конечная точка API.
 * @param {Object} body - Данные для отправки на сервер.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const postToServer = (endpoint, body) => {
  return fetch(`${baseUrl}/${groupId}/${endpoint}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  }).then(handleResponse);
};

/**
 * Выполняет PUT-запрос на сервер.
 *
 * @param {string} endpoint - Конечная точка API.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const putToServer = (endpoint) => {
  return fetch(`${baseUrl}/${groupId}/${endpoint}`, {
    method: "PUT",
    headers: headers,
  }).then(handleResponse);
};

/**
 * Выполняет DELETE-запрос к серверу по указанному конечному пути.
 *
 * @param {string} endpoint - Конечная точка API для выполнения DELETE-запроса.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const deleteFromServer = (endpoint) => {
  return fetch(`${baseUrl}/${groupId}/${endpoint}`, {
    method: "DELETE",
    headers: headers,
  }).then(handleResponse);
};

/**
 * Получает информацию о пользователе с сервера.
 *
 * @returns {Promise<JSON|Error>} - Информация о пользователе в формате JSON или ошибка.
 */
export const getUserInfo = () => {
  return fetchFromServer(getUser);
};

/**
 * Получает начальные карточки с сервера.
 *
 * @returns {Promise<JSON|Error>} - Карточки в формате JSON или ошибка.
 */
export const getInitialCard = () => {
  return fetchFromServer(getCards);
};

/**
 * Обновляет информацию о пользователе на сервере.
 *
 * @param {string} name - Имя пользователя.
 * @param {string} about - Описание пользователя.
 * @returns {Promise<JSON|Error>} - Обновленная информация о пользователе или ошибка.
 */
export const updateUserInfo = (name, about) => {
  return patchToServer(getUser, { name, about });
};

/**
 * Добавляет новую карточку на сервер.
 *
 * @param {string} name - Название карточки.
 * @param {string} link - Ссылка на изображение карточки.
 * @returns {Promise<JSON|Error>} - Созданная карточка в формате JSON или ошибка.
 */
export const addNewCardToServer = (name, link) => {
  return postToServer(getCards, { name, link });
};

/**
 * Удаляет карточку с сервера.
 *
 * @param {string} _id - Идентификатор карты, которую нужно удалить.
 * @returns {Promise<JSON|Error>} - Удаление карточки или ошибка.
 */
export const deleteCardFromServer = (_id) => {
  return deleteFromServer(`${getCards}/${_id}`);
};

/**
 * Устанавливает лайк для карточки.
 *
 * @param {string} cardId - Идентификатор карточки для лайка.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
export const setCardLike = (cardId) => {
  return putToServer(`${getCards}/${getLikes}/${cardId}`);
};

/**
 * Снимает лайк с карточки.
 *
 * @param {string} cardId - Идентификатор карточки для лайка.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
export const unsetCardLike = (cardId) => {
  return deleteFromServer(`${getCards}/${getLikes}/${cardId}`);
};

/**
 * Обновляет аватар профиля.
 *
 * @param {string} avatar - Идентификатор карточки для лайка.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
export const updateAvatar = (avatar) => {
  return patchToServer(getAvatar, avatar);
};

