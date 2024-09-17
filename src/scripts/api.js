const baseUrl = "https://nomoreparties.co/v1";
const token = "82365ee2-2b03-4795-adca-78c4dec38143";
const groupId = "wff-cohort-22";

const headers = {
  authorization: token,
  "Content-Type": "application/json",
};

const errorMessageText = "Что-то пошло не так:";

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`${errorMessageText} ${res.status}`);
  }
  return res.json();
};

/**
 * Универсальная функция для выполнения запросов к серверу.
 *
 * @param {string} endpoint - Конечная точка API.
 * @param {Object} options - Опции для выполнения запроса (метод, заголовки, тело и т.д.).
 * @returns {Promise<JSON|Error>} - Ответ в формате JSON или ошибка.
 */
const request = (endpoint, options = {}) => {
  return fetch(`${baseUrl}/${groupId}/${endpoint}`, {
    headers: headers,
    ...options,
  }).then(handleResponse);
};

/**
 * Выполняет GET-запрос на сервер.
 *
 * @param {string} endpoint - Конечная точка API.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const get = (endpoint) => request(endpoint);

/**
 * Выполняет HEAD-запрос на сервер.
 *
 * @param {string} endpoint - Конечная точка API.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const head = (endpoint) =>
  fetch(endpoint, {
    method: "HEAD",
  });

/**
 * Выполняет POST-запрос на сервер с передачей данных.
 *
 * @param {string} endpoint - Конечная точка API.
 * @param {Object} body - Данные для отправки на сервер.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const post = (endpoint, body) =>
  request(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });

/**
 * Выполняет PATCH-запрос на сервер с передачей данных.
 *
 * @param {string} endpoint - Конечная точка API.
 * @param {Object} body - Данные для отправки на сервер.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const patch = (endpoint, body) =>
  request(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

/**
 * Выполняет PUT-запрос на сервер.
 *
 * @param {string} endpoint - Конечная точка API.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const put = (endpoint) =>
  request(endpoint, {
    method: "PUT",
  });

/**
 * Выполняет DELETE-запрос на сервер.
 *
 * @param {string} endpoint - Конечная точка API.
 * @returns {Promise<JSON|Error>} - Ответ от сервера в формате JSON или ошибка.
 */
const remove = (endpoint) =>
  request(endpoint, {
    method: "DELETE",
  });

/**
 * Проверяет, является ли URL действительным изображением.
 *
 * @param {string} url - URL изображения.
 * @returns {Promise<boolean>} - Возвращает true, если URL действителен и указывает на изображение, иначе false.
 */
export async function isValidImageUrl(url) {
  const proxyUrl = "http://localhost:3000/";
  const fullUrl = proxyUrl + url;

  try {
    const response = await head(fullUrl);

    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get("Content-Type");
    return contentType && contentType.startsWith("image/");
  } catch (error) {
    handleResponse(error);
  }
}

// Получает информацию о пользователе с сервера.
export const getUserInfo = () => get("users/me");

// Получает начальные карточки с сервера.
export const getInitialCard = () => get("cards");

// Обновляет информацию о пользователе на сервере.
export const updateUserInfo = (name, about) =>
  patch("users/me", { name, about });

// Добавляет новую карточку на сервер.
export const addNewCardToServer = (name, link) => post("cards", { name, link });

// Удаляет карточку с сервера.
export const deleteCardFromServer = (_id) => remove(`cards/${_id}`);

// Устанавливает лайк для карточки.
export const setCardLike = (cardId) => put(`cards/likes/${cardId}`);

// Снимает лайк с карточки.
export const unsetCardLike = (cardId) => remove(`cards/likes/${cardId}`);

// Обновляет аватар профиля.
export const updateAvatar = (avatar) => patch("users/me/avatar", { avatar });
