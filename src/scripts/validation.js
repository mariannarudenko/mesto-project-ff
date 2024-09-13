/**
 * Включает валидацию для всех форм на странице.
 *
 * @param {Object} config - Конфигурационный объект с селекторами и классами.
 * @param {string} config.formSelector - Селектор формы.
 * @param {string} config.inputSelector - Селектор поля ввода.
 * @param {string} config.submitButtonSelector - Селектор кнопки отправки формы.
 * @param {string} config.inactiveButtonClass - Класс для неактивной кнопки отправки.
 * @param {string} config.errorClass - Класс для отображения ошибки.
 */
export function enableValidation(config) {
  const allForms = document.querySelectorAll(config.formSelector);

  allForms.forEach((currentForm) => {
    currentForm.addEventListener("input", (event) => {
      const input = event.target;

      if (input.matches(config.inputSelector)) {
        checkInputValidity(input, currentForm, config);
        toggleButtonState(currentForm, config);
      }
    });

    toggleButtonState(currentForm, config);
  });
}

/**
 * Проверяет валидность поля ввода и отображает ошибку, если нужно.
 *
 * @param {HTMLElement} input - Поле ввода для проверки.
 * @param {HTMLElement} currentForm - Форма, содержащая поле ввода.
 * @param {Object} config - Конфигурационный объект с селекторами и классами.
 */
function checkInputValidity(input, currentForm, config) {
  const errorElement = currentForm.querySelector(`.${input.name}-input-error`);

  const urlErrorMessageText = "Введите адрес сайта.";
  
  if (input.type === "url" && !input.validity.valid) {
    showInputError(errorElement, urlErrorMessageText, config);
  } else if (input.validity.patternMismatch) {
    showInputError(errorElement, input.dataset.errorMessage, config);
  } else if (!input.validity.valid) {
    showInputError(errorElement, input.validationMessage, config);
  } else {
    hideInputError(errorElement, config);
  }

  toggleButtonState(currentForm, config);
}

/**
 * Отображает сообщение об ошибке для поля ввода.
 *
 * @param {HTMLElement} errorElement - Элемент для отображения ошибки.
 * @param {string} errorMessage - Сообщение об ошибке.
 * @param {Object} config - Конфигурационный объект с классами.
 * @param {string} config.errorClass - Класс для отображения ошибки.
 */
function showInputError(errorElement, errorMessage, config) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

/**
 * Переключает состояние кнопки отправки в зависимости от валидности формы.
 *
 * @param {HTMLElement} currentForm - Форма для проверки валидности.
 * @param {Object} config - Конфигурационный объект с селекторами и классами.
 */
function toggleButtonState(currentForm, config) {
  const submitButton = currentForm.querySelector(config.submitButtonSelector);
  const isFormValid = currentForm.checkValidity();

  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

/**
 * Скрывает сообщение об ошибке для поля ввода.
 *
 * @param {HTMLElement} errorElement - Элемент для скрытия ошибки.
 * @param {Object} config - Конфигурационный объект с классами.
 * @param {string} config.errorClass - Класс для отображения ошибки.
 */
function hideInputError(errorElement, config) {
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

/**
 * Очищает ошибки валидации и сбрасывает состояние кнопки отправки для формы.
 *
 * @param {HTMLElement} currentForm - Форма, для которой нужно сбросить валидацию.
 * @param {Object} config - Конфигурационный объект с селекторами и классами.
 */
export function clearValidation(currentForm, config) {
  const inputs = Array.from(currentForm.querySelectorAll(config.inputSelector));

  inputs.forEach((input) => {
    const errorElement = currentForm.querySelector(
      `.${input.name}-input-error`
    );

    hideInputError(errorElement, config);
  });

  toggleButtonState(currentForm, config);
}

/**
 * Проверяет валидность данных карточки: наличие имени, ссылки и корректность формата изображения.
 *
 * @param {Object} cardData - Данные карточки.
 * @param {string} cardData.name - Название карточки.
 * @param {string} cardData.link - Ссылка на изображение карточки.
 * @returns {boolean} - Возвращает `true`, если данные карточки валидны, и `false` в противном случае.
 */
export function isValidCardData(cardData) {
  const { name, link } = cardData;

  if (!name || !link) {
    return false;
  }

  if (!isValidUrl(link)) {
    return false;
  }

  const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const url = new URL(link);

  return hasValidImageExtension(url.pathname, validExtensions);
}

/**
 * Проверяет, является ли строка допустимым URL-адресом.
 *
 * @param {string} urlString - Строка URL-адреса.
 * @returns {boolean} - Возвращает `true`, если строка является допустимым URL-адресом, и `false` в противном случае.
 */
function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

/**
 * Проверяет, имеет ли строка допустимое расширение изображения.
 *
 * @param {string} url - URL-адрес.
 * @param {Array<string>} validExtensions - Список допустимых расширений файлов.
 * @returns {boolean} - Возвращает `true`, если расширение изображения допустимо, и `false` в противном случае.
 */
function hasValidImageExtension(url, validExtensions) {
  const extension = url.split('.').pop().toLowerCase();
  return validExtensions.includes(extension);
}