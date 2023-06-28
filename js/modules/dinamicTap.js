import { dateInfo } from './dateData.js';
import { priceFunction } from './price.js';
import { eventProxy } from './api.js';

const eventApi = new eventProxy();

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
  

  eventsData.forEach((event) => {
    var eventDiv = document.createElement('div');
    eventDiv.classList.add('event');

    var imageElement = document.createElement('img');
    imageElement.classList.add('event_image');
    imageElement.src = event.image;

    var titleElement = document.createElement('p');
    titleElement.classList.add('event_title');
    titleElement.textContent = event.title;

    var dateElement = document.createElement('p');
    dateElement.textContent = dateInfo(event.date);

    var priceElement = document.createElement('p');
    priceElement.textContent = priceFunction(event.price);

    var locationElement = document.createElement('p');
    locationElement.textContent = 'Location: ' + event.location.city + ', ' + event.location.state + ', ' + event.location.address;

    eventDiv.appendChild(imageElement);
    eventDiv.appendChild(titleElement);
    eventDiv.appendChild(dateElement);
    eventDiv.appendChild(priceElement);
    eventDiv.appendChild(locationElement);

    gridContainer.appendChild(eventDiv);
  });
}

async function handleClick(category) {
  try {
    const eventsData = await eventApi.getEventsByCategory(category);
    console.log('Events:', eventsData);
    showEvents(eventsData);
  } catch (error) {
    console.error(error);
  }
}

export {handleClick, showEvents};