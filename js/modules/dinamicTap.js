import { dateInfo } from '../modules/dateData.js';
import { priceFunction } from '../modules/price.js';
import { eventProxy } from '../modules/api.js';
import { getLocalStorageItems } from '../storage/localStorage.js';
import { goingBtn, interestBtn, favoriteBtn} from './handleBtns.js';

const eventApi = new eventProxy();
let activeCategory = 'all'; 

function showEvents(eventsData) {
  var gridContainer = document.getElementById('grid-container');

  if (!gridContainer) {
    createGridContainer();
  } else {
    clearGridContainer();
  }

  function createGridContainer() {
    gridContainer = document.createElement('div');
    gridContainer.id = 'grid-container';
    document.body.appendChild(gridContainer);
  }

  function clearGridContainer() {
    gridContainer.innerHTML = '';
  }

  eventsData.forEach((event, index) => {
    var eventDiv = document.createElement('div');
    eventDiv.classList.add('event');

    var imageElement = document.createElement('img');
    imageElement.classList.add('event_image');
    imageElement.src = event.image;

    var imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    eventDiv.appendChild(imageElement);
    
    var imageIcon = document.createElement('img');
    imageIcon.classList.add('favorite_img', event.id);
    imageIcon.src = '../img/corazon.png';
    imageIcon.addEventListener('click', favoriteBtn);
    
    imageContainer.appendChild(imageIcon);
    eventDiv.appendChild(imageContainer);

    var titleElement = document.createElement('h2');
    titleElement.classList.add('event_title');
    titleElement.textContent = event.title;
    eventDiv.appendChild(titleElement);

    var dateElement = document.createElement('p');
    dateElement.classList.add('event_date');
    dateElement.textContent = dateInfo(event.date);
    eventDiv.appendChild(dateElement);

    var priceElement = document.createElement('p');
    priceElement.classList.add('event_price');
    priceElement.textContent = priceFunction(event.price);
    eventDiv.appendChild(priceElement);

    var buttonsContainer = document.createElement('div'); 
    buttonsContainer.classList.add('buttons-container');

    var button1 = document.createElement('button');
    button1.textContent = 'Interest';
    button1.classList.add('custom-button', 'interest_btn', event.id);
    button1.id = 'button1_' + index;
    button1.addEventListener('click', interestBtn)

    var button2 = document.createElement('button');
    button2.textContent = 'Going';
    button2.classList.add('custom-button', 'going_btn', event.id);
    button2.id = 'button2_' + index;
    button2.addEventListener('click', goingBtn)

    buttonsContainer.appendChild(button1);
    buttonsContainer.appendChild(button2);
    eventDiv.appendChild(buttonsContainer);

    gridContainer.appendChild(eventDiv);
  });
}

async function handleClick(category) {
  try {
    activeCategory = category;
    const eventsData = await eventApi.getEventsByCategory(category);
    console.log('Events:', eventsData);
    showEvents(eventsData);
    localStorage.setItem(category, JSON.stringify(eventsData));
  } catch (error) {
    console.error(error);
  }
}

const storedFavorites = getLocalStorageItems('favorites');
console.log('Stored favorite events:', storedFavorites);


export { handleClick, showEvents };
