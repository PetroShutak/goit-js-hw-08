import throttle from 'lodash.throttle'; // імпортуємо throttle з бібліотеки lodash

// extra variant
const LOCAL_KEY = 'feedback-form-state'; // створюмо ключ для localStorage
const form = document.querySelector('.feedback-form'); // створюємо змінну для форми

populateFeedbackForm(); // викликаємо функцію для заповнення форми з localStorage
form.addEventListener('submit', onFormSubmit); // додаємо слухача на форму
form.addEventListener('input', throttle(onInputData, 500)); // додаємо слухача на форму з throttle (500мс) для збереження в localStorage

function onFormSubmit(e) { // функція для збереження даних в localStorage
  e.preventDefault(); // відміняємо дію по замовчуванню
  const { email, message } = e.currentTarget.elements; // деструктуризація об'єкта
  console.log({ email: email.value, message: message.value }); // виводимо в консоль
  localStorage.removeItem(LOCAL_KEY); // видаляємо з localStorage
  e.currentTarget.reset(); // очищаємо форму після відправки методом reset() який викликається на формі 
}

function onInputData(e) { // функція для збереження даних в localStorage 
  let data = localStorage.getItem(LOCAL_KEY);  // отримуємо дані з localStorage методом getItem() який викликається на localStorage
  data = data ? JSON.parse(data) : {}; // перевіряємо чи є дані в localStorage, якщо є то парсимо їх методом JSON.parse() який викликається на JSON, якщо немає то створюємо пустий об'єкт
  let { email, message } = form.elements; // деструктуризація об'єкта для отримання значень з форми
  data = { // створюємо об'єкт з даними з форми методом деструктуризації об'єкта data з даними з форми
    email: email.value.trim(), // видаляємо пробіли методом trim() який викликається на строкі
    message: message.value.trim(), // видаляємо пробіли методом trim() який викликається на строкі
  };

  //  data[e.target.name] = e.target.value.trim(); 
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data)); // записуємо дані в localStorage методом setItem() який викликається на localStorage
  // JSON.stringify() - це метод який перетворює об'єкт або масив в строку
}

function populateFeedbackForm() { 
  // функція для заповнення форми з localStorage яку викликаємо при завантаженні сторінки для 
  // заповнення форми даними з localStorage
  let data = localStorage.getItem(LOCAL_KEY); // отримуємо дані з localStorage методом getItem() який викликається на localStorage
  if (data) { // перевіряємо чи є дані в localStorage
    data = JSON.parse(data); // парсимо дані з localStorage методом JSON.parse() який викликається на JSON
    // JSON.parse() - це метод який перетворює строку в об'єкт або масив
    Object.entries(data).forEach(([name, value]) => { // перебираємо об'єкт з даними з localStorage методом Object.entries() який викликається на Object
      form.elements[name].value = value ?? ''; 
      // записуємо дані з localStorage в форму методом value який викликається на елементі форми і 
      // оператором ?? який викликається на строці якщо значення value не існує то записуємо пусту строку ''
      // ?? - це новий оператор який використовується для перевірки на nullish значення 
      // він відрізняється від || тим що || перевіряє на false значення, а ?? перевіряє на nullish значення 
      // наприклад 0, '', false, null, undefined, NaN
    });
  }
}


// 2.0.
// const form = document.querySelector('.feedback-form');
// const emailInput = form.querySelector('input[name="email"]');
// const messageInput = form.querySelector('textarea[name="message"]');


// const saveFormState = throttle(() => {
//   const formState = {
//     email: emailInput.value,
//     message: messageInput.value,
//   };
//   localStorage.setItem('feedback-form-state', JSON.stringify(formState));
// }, 500);

// const savedFormState = localStorage.getItem('feedback-form-state');
// if (savedFormState) {
//   const formState = JSON.parse(savedFormState);
//   emailInput.value = formState.email || '';
//   messageInput.value = formState.message || '';
// }

// emailInput.addEventListener('input', saveFormState);
// messageInput.addEventListener('input', saveFormState);

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   localStorage.removeItem('feedback-form-state');
//   emailInput.value = '';
//   messageInput.value = '';
//   console.log({
//     email: emailInput.value,
//     message: messageInput.value,
//   });
// });


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

// 2.2
// const STORAGE_KEY = 'feedback-form-state';
// const form = document.querySelector('.feedback-form');
// const allData = {};

// form.addEventListener('submit', onFormSubmit);
// form.addEventListener('input', throttle(onFormData, 500));

// function onFormData(event) {
//     allData[event.target.name] = event.target.value;   
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
// }

// function onFormSubmit(event) {
//     event.preventDefault();    
//     localStorage.removeItem(STORAGE_KEY);
//     const allElements = event.currentTarget.elements;
//     const formAll = {
//         email: allElements.email.value,
//         password: allElements.message.value,
//     };
//     console.log(formAll);
//     event.currentTarget.reset();
// };

// function populateAllData() {
//     const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
//     const email = document.querySelector('.feedback-form input');
//     const message = document.querySelector('.feedback-form textarea');
//     if (data.email) {
//       email.value = data.email;
//     };
//     if (data.message) {
//       message.value = data.message;
//     };
// };
// populateAllData();

// 3.0
// import throttle from 'lodash.throttle';

// const LOCALSTORAGE_KEY = 'selectedFilters';
// const formEl = document.querySelector('.feedback-form');

// initForm();

// formEl.addEventListener('submit', onFormSubmit);
// formEl.addEventListener('input', throttle(onFormInput, 500));

// function onFormSubmit(evt) {
//   evt.preventDefault();
//   const formData = new FormData(formEl);
//   formData.forEach((value, name) => console.log(value, name));
//   evt.currentTarget.reset();
//   localStorage.removeItem(LOCALSTORAGE_KEY);
// }

// function onFormInput(evt) {
//   let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
//   persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};
//   persistedFilters[evt.target.name] = evt.target.value;
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedFilters));
// }

// function initForm() {
//   let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
//   if (persistedFilters) {
//     persistedFilters = JSON.parse(persistedFilters);
//     Object.entries(persistedFilters).forEach(([name, value]) => {
//       formEl.elements[name].value = value;
//     });
//   }
// }