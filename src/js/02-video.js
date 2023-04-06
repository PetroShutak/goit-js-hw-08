import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// 2.0.
const iframe = document.querySelector('#vimeo-player');
iframe.classList.add('centered');
const player = new Player(iframe);
player.on('timeupdate', throttle(saveCurrentTime, 1000));

function saveCurrentTime() {
  player.getCurrentTime().then(time => {
    localStorage.setItem('videoplayer-current-time', Math.round(time));
  });
}

window.addEventListener('load', () => {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
  player.play();
});

//===============================<by TEAM>========================================\\
// const iframe = document.querySelector('iframe');

// const player = new Player(iframe);
// const getCurrentTime = localStorage.getItem('videoplayer-current-time');

// if (getCurrentTime) {
//   player.setCurrentTime(getCurrentTime);
// }

// player.on('timeupdate', throttle(currentTime, 1000));

// function currentTime(data) {
//   let currentTime = data.seconds;
//   localStorage.setItem('videoplayer-current-time', Math.round(currentTime));
// }

//============================ </by TEAM>===========================================\\


// // 2.0.1. with comments
// import Player from '@vimeo/player'; //  встановити пакет @vimeo/player $ npm install @vimeo/player
// import throttle from 'lodash.throttle'; // встановити пакет lodash.throttle $ npm install lodash.throttle

// const iframe = document.querySelector('#vimeo-player'); // так ми отримуємо доступ до елемента по id
// iframe.classList.add('centered');// то я сам додав цей клас, щоб відео було по центру
// const player = new Player(iframe); // створюємо новий екземпляр класу Player це з документації
// player.on('timeupdate', throttle(saveCurrentTime, 1000)); // відслідковуємо подію timeupdate і викликаємо функцію saveCurrentTime
// // ця функція викликається не частіше ніж раз на 1000 мс
// // вона зберігає поточний час відтворення в localStorage
// // timeupdate - це подія, яка відбувається кожну секунду відтворення відео
// function saveCurrentTime() { //
//     player.getCurrentTime().then(time => { //отже, як ми це робимо? ми викликаємо метод getCurrentTime() класу Player
//         // цей метод повертає проміс, тому ми використовуємо then
//         // в then ми отримуємо значення поточного часу відтворення відео
//         // і зберігаємо його в localStorage відповідно до ключа 'videoplayer-current-time'
//       localStorage.setItem('videoplayer-current-time', time); // сетимо значення в localStorage
//       // videoplayer-current-time - це ключ, а time - це значення (videoplayer-current-time ми взяли з документації)
//     });
//   }
// // відслідковуємо подію 'load' і викликаємо функцію setCurrentTime
//   window.addEventListener('load', () => {
//     const currentTime = localStorage.getItem('videoplayer-current-time'); // отримуємо значення з localStorage
//     if (currentTime) { // якщо значення є, то викликаємо метод setCurrentTime класу Player
//       player.setCurrentTime(currentTime); // тут ми встановлюємо поточний час відтворення
//       // тобто ми звертаємось до класу Player і викликаємо метод setCurrentTime якой передаємо значення currentTime
//       // яке ми отримали з localStorage. Метод setCurrentTime ми взяли з документації до Player
//       // відтворюємо відео з поточного часу
//       // player.play();
//     }
//   });

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