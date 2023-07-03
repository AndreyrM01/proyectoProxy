import { dateInfo } from './dateData.js';
import { priceFunction } from './price.js';
import { eventProxy } from './api.js';
import { addToLocalStorage, getLocalStorageItems, clearLocalStorageOnReload } from '../storage/localStorage.js';

const eventApi = new eventProxy();
let activeCategory = 'all'; // Categoría activa inicial

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

    var imageElement2 = document.createElement('a');
    imageElement2.href = '#';
    imageElement2.id = 'imageElement2_' + index;
    imageElement2.addEventListener('click', function () {
      addToLocalStorage(event, 'image_click');
    });

    var imageIcon = document.createElement('img');
    imageIcon.classList.add('favorite_img');
    imageIcon.src = '../img/corazon.png';

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

    var button1 = document.createElement('button');
    button1.textContent = 'Interest';
    button1.classList.add('custom-button', 'interest_btn');
    button1.id = 'button1_' + index;

    var button2 = document.createElement('button');
    button2.textContent = 'Going!';
    button2.classList.add('custom-button', 'going_btn');
    button2.id = 'button2_' + index;

    eventDiv.appendChild(button1);
    eventDiv.appendChild(button2);

    addButtonClickListener(button1, event, 'interest', 'Item from interest');
    addButtonClickListener(button2, event, 'going', 'Item from going');

    gridContainer.appendChild(eventDiv);
  });
}

function addButtonClickListener(button, event, actionType, storageMessage) {
  button.addEventListener('click', function () {
    addToLocalStorage(event, actionType);
    if (actionType === 'favorite') {
      console.log('Item added from favorite');
    } else {
      console.log(storageMessage);
    }
  });
}

async function handleClick(category) {
  try {
    activeCategory = category; // Actualizar la categoría activa
    const eventsData = await eventApi.getEventsByCategory(category);
    console.log('Events:', eventsData);
    showEvents(eventsData);
  } catch (error) {
    console.error(error);
  }
}

const storedEvents = getLocalStorageItems();
console.log('Stored Events:', storedEvents);

window.addEventListener('beforeunload', clearLocalStorageOnReload);

export { handleClick, showEvents };


