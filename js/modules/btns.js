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

function initializeBtns() {
  var container = document.createElement('div');
  container.id = 'tab-container';
  document.body.appendChild(container);

  var eventCategories = ['Music', 'Sports', 'Business', 'Food', 'Art'];

  var handleCategoryClick = function (category) {
    console.log('Categoría seleccionada: ' + category);
    var buttons = container.getElementsByClassName('tab-button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('default-tab-button');
    }
    var selectedButton = document.getElementById(category);
    selectedButton.classList.add('default-tab-button');
    handleClick(category.toLowerCase());
  };

  eventCategories.forEach(function (category) {
    var button = document.createElement('button');
    button.id = category.toLowerCase();
    button.innerHTML = category;
    button.addEventListener('click', function () {
      handleCategoryClick(category.toLowerCase());
    });
    container.appendChild(button);
  });

  container.classList.add('flex-container');

  var buttons = container.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.add('tab-button');
  }

  handleCategoryClick('music');
}

export { initializeBtns};
