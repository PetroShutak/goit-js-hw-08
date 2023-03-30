import Player from '@vimeo/player'; // імпорт класу Player з бібліотеки vimeo-player
import throttle from 'lodash.throttle'; // імпорт throttle з бібліотеки lodash.throttle
 
// 2.0. 
const iframe = document.querySelector('#vimeo-player'); // отримуємо iframe з DOM
const player = new Player(iframe);  // створюємо новий екземпляр класу Player і передаємо в нього iframe
player.on('timeupdate', throttle(saveCurrentTime, 1000)); 
// викликаємо метод on() класу Player і передаємо в нього назву події timeupdate і функцію throttle() 
// яка викликається на saveCurrentTime() і передаємо в неї 1000мс

function saveCurrentTime() { // функція для збереження поточного часу відео в localStorage
    player.getCurrentTime().then(time => { 
      // викликаємо метод getCurrentTime() класу Player і передаємо в нього функцію . 
      // then() тут це проміс який викликається коли виконується метод getCurrentTime() і передаємо в нього час
      // метод getCurrentTime() повертає проміс і він виконується коли відео завантажується і він повертає час
      // це з документації яку дають в ТЗ
      localStorage.setItem('videoplayer-current-time', time); 
      // записуємо дані в localStorage методом setItem() який викликається на localStorage
      // localStorage.setItem() - це метод який записує дані в localStorage. Він приймає 2 параметри: ключ і значення
      // localStorage.setItem('key', 'value'); - це приклад запису в localStorage 
      // В даному випадку ключ - 'videoplayer-current-time', а значення - time. Це з документації https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage
    });
  }

  window.addEventListener('load', () => { // викликаємо метод addEventListener() класу window і передаємо в нього подію load і функцію яка викликається на анонімній функції
    const currentTime = localStorage.getItem('videoplayer-current-time'); // отримуємо дані з localStorage методом getItem() який викликається на localStorage
    if (currentTime) { // перевіряємо чи є дані в localStorage
      player.setCurrentTime(currentTime); // викликаємо метод setCurrentTime() класу Player і передаємо в нього дані з localStorage
    }
  });
  // таким чином ми зберігаємо поточний час відео в localStorage і при перезавантаженні сторінки відео починається з поточного часу


// 2.1. 
// const CURRENT_TIME_KEY = 'videoplayer-current-time';

// const iframe = document.querySelector('iframe');
// const player = new Player(iframe, {
//   loop: true,
//   fullscreen: true,
//   quality: '1080p',
// });

// const getCurrentTime = function (currentTime) {
//   const seconds = currentTime.seconds;
//   localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(seconds));
// };

// player.on('timeupdate', throttle(getCurrentTime, 1000));

// player.setCurrentTime(JSON.parse(localStorage.getItem(CURRENT_TIME_KEY)) || 0);

// player
//   .setColor('#d8e0ff')
//   .then(function (color) {
//     console.log('The new color value: #D8E0FF');
//   })
//   .catch(function (error) {
//     console.log('An error occurred while setting the color');
//   });
