import Player from '@vimeo/player'; 
import throttle from 'lodash.throttle'; 
 
// 2.0. 
const iframe = document.querySelector('#vimeo-player'); 
iframe.classList.add('centered');
const player = new Player(iframe); 
player.on('timeupdate', throttle(saveCurrentTime, 1000)); 

function saveCurrentTime() { 
    player.getCurrentTime().then(time => { 
      localStorage.setItem('videoplayer-current-time', time); 
    });
  }

  window.addEventListener('load', () => { 
    const currentTime = localStorage.getItem('videoplayer-current-time'); 
    if (currentTime) { 
      player.setCurrentTime(currentTime); 
    }
  });

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
