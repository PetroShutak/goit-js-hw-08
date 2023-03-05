import throttle from 'lodash.throttle';

// 2.0.
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');


const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

const savedFormState = localStorage.getItem('feedback-form-state');
if (savedFormState) {
  const formState = JSON.parse(savedFormState);
  emailInput.value = formState.email || '';
  messageInput.value = formState.message || '';
}

emailInput.addEventListener('input', saveFormState);
messageInput.addEventListener('input', saveFormState);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });
});


// 2.1
// const form = document.querySelector('.feedback-form');
// const formInput = document.querySelector('.feedback-form input');
// const formTextarea = document.querySelector('.feedback-form textarea');

// form.addEventListener('submit', throttle(onSubmit, 500));

// function onSubmit(event) {
//     event.preventDefault();
    
//     const formData = {
//         email: formInput.value,
//         message: formTextarea.value,
//     };
    
//     localStorage.setItem('feedback-form-state', JSON.stringify(formData));
//     form.reset();
//     }

// window.addEventListener('load', () => {
//     const formData = JSON.parse(localStorage.getItem('feedback-form-state'));
//     if (formData) {
//         formInput.value = formData.email;
//         formTextarea.value = formData.message;
//     }
// }
// );

