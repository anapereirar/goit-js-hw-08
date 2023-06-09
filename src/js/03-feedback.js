import throttle from 'lodash.throttle';

const value = document.querySelector('.feedback-form');
const children = value.children;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Agregar selectores de clase a los elementos de formulario
for (let element of children) {
  if (element.firstElementChild != null) {
    element.firstElementChild.classList.add(
      `feedback-form__${element.firstElementChild.getAttribute('name')}`
    );
  } else {
    element.classList.add(`feedback-form__${element.getAttribute('type')}`);
  }
}

//Obtención de las referencias clase de los selectores del formulario
const [emailSelector, messageSelector, btnSelector] = value.querySelectorAll(
  '.feedback-form__email, .feedback-form__message, .feedback-form__submit'
);

//Objeto inicio de valores
let formValues = {
  email: 'pepitoperez@gmail.com',
  message: 'test message',
};

// Mantener valores guardados en localStorage en el formulario
const formValueSaved = localStorage.getItem('feedback-form-state');
const feedback = JSON.parse(formValueSaved);
if (formValueSaved != null) {
  emailSelector.value = feedback.email;
  messageSelector.value = feedback.message;
}

// Guardar valores en localStorage
const setFormValues = () => {
  formValues = { email: emailSelector.value, message: messageSelector.value };
  localStorage.setItem('feedback-form-state', JSON.stringify(formValues));
};

// Borrar los valores del localStorage y mostrar en consola
const removePrintFormValues = event => {
  if (emailRegex.test(emailSelector.value)) {
    event.preventDefault();
    console.log(formValues);
    emailSelector.value = '';
    messageSelector.value = '';
    localStorage.removeItem('feedback-form-state');
  } else {
    alert('El correo no tiene formato adecuado');
  }
};

//Evento input dispara funcion callback cada que se teclea
value.addEventListener('input', throttle(setFormValues, 500));
//Evento dispara funcion callback al hacer click
btnSelector.addEventListener('click', removePrintFormValues);
