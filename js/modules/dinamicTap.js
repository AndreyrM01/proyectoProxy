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

    var imageContainer = document.createElement('div'); // Contenedor de la imagen y círculo blanco
    imageContainer.classList.add('image-container');

    var imageElement2 = document.createElement('a');
    imageElement2.href = '#'; // Agrega el enlace deseado aquí

    var imageIcon = document.createElement('img');
    imageIcon.classList.add('favorite_img');
    imageIcon.src = '../img/corazon.png';

    imageElement2.appendChild(imageIcon);
    imageContainer.appendChild(imageElement2);
    eventDiv.appendChild(imageElement);
    eventDiv.appendChild(imageContainer);

    var titleElement = document.createElement('p');
    titleElement.classList.add('event_title');
    titleElement.textContent = event.title;

    var dateElement = document.createElement('p');
    dateElement.textContent = dateInfo(event.date);

    var priceElement = document.createElement('p');
    priceElement.textContent = priceFunction(event.price);

    var locationElement = document.createElement('p');
    locationElement.textContent = 'Location: ' + event.location.city + ', ' + event.location.state + ', ' + event.location.address;

    eventDiv.appendChild(titleElement);
    eventDiv.appendChild(dateElement);
    eventDiv.appendChild(priceElement);
    eventDiv.appendChild(locationElement);

    var buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    
    var button1 = document.createElement('button'); 
    button1.textContent = 'Interest';
    button1.classList.add('custom-button', 'interest_btn');
    button1.addEventListener('click', function () {
      // Lógica para el botón 1
    });
    
    var button2 = document.createElement('button'); 
    button2.textContent = 'Going!';
    button2.classList.add('custom-button', 'going_btn');
    button2.addEventListener('click', function () {
      // Lógica para el botón 2
    });
    
    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);
    eventDiv.appendChild(buttonContainer);
    

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