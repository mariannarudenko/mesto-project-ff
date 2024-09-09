export function enableValidation(config) {
  const allForms = document.querySelectorAll(config.formSelector);
  allForms.forEach((currentForm) => {
    currentForm.addEventListener("input", (event) => {
      const input = event.target;
      if (input.matches(config.inputSelector)) {
        checkInputValidity(input, currentForm, config);
      }
    });
    toggleButtonState(currentForm, config);
  });
}

function showInputError(errorElement, errorMessage, config) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

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

function toggleButtonState(currentForm, config) {
  const submitButton = currentForm.querySelector(config.submitButtonSelector);
  const isFormValid = currentForm.checkValidity();

  if (isFormValid) {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  }
}

function hideInputError(errorElement, config) {
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

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
