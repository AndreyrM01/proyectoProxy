import { dateInfo } from '../modules/dateData.js';
import { priceFunction } from '../modules/price.js';
import { eventProxy } from '../modules/api.js';
import { addToLocalStorage, getLocalStorageItems, clearLocalStorageOnReload } from '../storage/localStorage.js';

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

  function addButtonClickListener(button, event, actionType, storageMessage) {
    button.addEventListener('click', function () {
      const key = actionType + '_' + event.id;
      addToLocalStorage(key, event); 
      console.log(storageMessage);
    });
  }

  eventsData.forEach((event, index) => {
    var eventDiv = document.createElement('div');
    eventDiv.classList.add('event');

    var imageElement = document.createElement('img');
    imageElement.classList.add('event_image');
    imageElement.src = event.image;

    var imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    var imageElement2 = document.createElement('button');
    imageElement2.id = 'imageElement2_' + index;
    
    var imageIcon = document.createElement('img');
    imageIcon.classList.add('favorite_img');
    imageIcon.src = '../img/corazon.png';
    
    imageElement2.appendChild(imageIcon);
    imageContainer.appendChild(imageElement2);
    eventDiv.appendChild(imageElement);
    eventDiv.appendChild(imageContainer);
    
    imageElement2.addEventListener('click', function () {
      addToLocalStorage('favorites', event);
      console.log('Item added to Favorites');
    });
    
    imageElement2.appendChild(imageIcon);
    imageContainer.appendChild(imageElement2);
    eventDiv.appendChild(imageElement);
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
    button1.classList.add('custom-button', 'interest_btn');
    button1.id = 'button1_' + index;

    var button2 = document.createElement('button');
    button2.textContent = 'Going';
    button2.classList.add('custom-button', 'going_btn');
    button2.id = 'button2_' + index;

    buttonsContainer.appendChild(button1);
    buttonsContainer.appendChild(button2);
    eventDiv.appendChild(buttonsContainer);

    addButtonClickListener(button1, event, 'interested_' + index, 'Item added to Interest');
    addButtonClickListener(button2, event, 'going_' + index, 'Item added to Going');
    gridContainer.appendChild(eventDiv);
  });
}

async function handleClick(category) {
  try {
    activeCategory = category;
    const eventsData = await eventApi.getEventsByCategory(category);
    console.log('Events:', eventsData);
    showEvents(eventsData);
  } catch (error) {
    console.error(error);
  }
}

const storedFavorites = getLocalStorageItems('favorites');
console.log('Stored favorite events:', storedFavorites);

window.addEventListener('beforeunload', clearLocalStorageOnReload);

export { handleClick, showEvents };
