

export const PromptUserForPassword = () => {
  return new Promise((resolve, reject) => {
    // Create a div element for the modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center', 'bg-gray-900', 'bg-opacity-50');

    // Create a div element for the modal
    const modal = document.createElement('div');
    modal.classList.add('bg-white', 'p-4', 'rounded', 'shadow-lg');

    // Create an input element for the password field
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.classList.add('w-full', 'border', 'border-gray-400', 'p-2', 'mb-2', 'rounded');
    modal.appendChild(passwordInput);

    // Create a div element for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'justify-end');

    // Create a button element for the Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('px-4', 'py-2', 'mr-2', 'bg-gray-200', 'rounded', 'hover:bg-gray-300');
    cancelButton.addEventListener('click', () => {
      // Remove the modal overlay from the DOM
      modalOverlay.remove();
      reject();
    });
    buttonContainer.appendChild(cancelButton);

    // Create a button element for the Continue button
    const continueButton = document.createElement('button');
    continueButton.textContent = 'Continue';
    continueButton.classList.add('px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded', 'hover:bg-blue-600');
    continueButton.addEventListener('click', () => {
      // Remove the modal overlay from the DOM
      modalOverlay.remove();
      resolve(passwordInput.value);
    });
    buttonContainer.appendChild(continueButton);

    modal.appendChild(buttonContainer);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
  });
}

