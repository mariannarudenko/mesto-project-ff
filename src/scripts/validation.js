// Включение валидации
export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(form => {
    const inputs = form.querySelectorAll(config.inputSelector);

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, form, config);
      });
    });
  });
}

function showInputError(errorElement, errorMessage, config) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function checkInputValidity(input, form, config) {
  const errorElement = form.querySelector(`.${input.name}-input-error`);
  
  // Проверка на несоответствие паттерну (кастомная проверка регулярного выражения)
  if (input.validity.patternMismatch) {
    toggleButtonState(form, config);
    showInputError (errorElement, input.dataset.errorMessage, config);
  } else if (!input.validity.valid) {
    toggleButtonState(form, config);
    showInputError(errorElement, input.validationMessage, config);
  } else {
    hideInputError(errorElement, config); // Скрываем ошибку, если поле валидно
  }
  toggleButtonState(form, config);
}

function toggleButtonState(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  if (isFormValid) {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  }
}

function hideInputError(errorElement, config) {
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}