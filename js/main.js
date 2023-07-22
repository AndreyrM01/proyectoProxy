import { initializeBtns } from './config/config.js';

initializeBtns();

if(localStorage.getItem('interested') === null){
  localStorage.setItem('interested', '[]');
  localStorage.setItem('going', '[]');
  localStorage.setItem('favorite', '[]');
}