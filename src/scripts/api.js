const baseUrl = "https://nomoreparties.co/v1";
const token =  "82365ee2-2b03-4795-adca-78c4dec38143";
const groupId = "wff-cohort-22";
const headers = {
  authorization: token,
  "Content-Type": "application/json",
};

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
  return res.json();
};

const fetchFromServer = (endpoint) => {
  return fetch(`${baseUrl}/${groupId}/${endpoint}`, {
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

const patchToServer = (endpoint, body) => {
  return fetch(`${baseUrl}/${groupId}/${endpoint}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(body),
  }).then(handleResponse);
};

const postToServer = (endpoint, body) => {
  return fetch(`${baseUrl}/${groupId}/${endpoint}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  }).then(handleResponse);
};

export const getUserInfo = () => {
  return fetchFromServer("users/me");
};

export const getInitialCard = () => {
  return fetchFromServer("cards");
};

export const updateUserInfo = (name, about) => {
  return patchToServer("users/me", { name, about });
};

export const updateCard = (name, link) => {
  return postToServer("cards", { name, link });
};
