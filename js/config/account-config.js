import { eventProxy } from '../modules/api.js';
import { showEvents } from '../modules/dinamicTap.js'

function accountTabsGenerator() {
  const container = document.createElement('div');
  container.id = 'tab-container';
  document.body.appendChild(container);

  const accountContainer = document.createElement('div');
  accountContainer.classList.add('account-container', 'position-left');

  const accountLink = document.createElement('a');
  accountLink.href = '../../index.html';
  accountLink.innerHTML = 'Back to events';
  accountLink.classList.add('back-to-event');

  const accountImage = document.createElement('img');
  accountImage.src = '../../img/white-left-arrow.png';
  accountImage.alt = 'My Account';
  accountImage.classList.add('left-arrow');

  accountContainer.appendChild(accountImage);
  accountContainer.appendChild(accountLink);

  container.insertBefore(accountContainer, container.firstChild);

  const eventCategories = ['Favorite', 'Interested', 'Going', 'Calendar'];
  const buttons = [];
  const tabNames = [];

  const handleCategoryClick = (category) => {
    const events = JSON.parse(localStorage.getItem(category.toLowerCase()));
    const buttons = container.getElementsByClassName('tab-button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('default-tab-button');
    }
    const selectedButton = document.getElementById(category);
    selectedButton.classList.add('default-tab-button');
    showEvents(events);
  };

  eventCategories.forEach((category) => {
    const button = document.createElement('button');
    button.id = category.toLowerCase();
    button.innerHTML = category;
    button.addEventListener('click', () => {
      if (category.toLowerCase() === 'calendar') {
        calendarContainer.classList.remove('hidden');
        var gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = '';
      } else {
        handleCategoryClick(category.toLowerCase());
        calendarContainer.classList.add('hidden');
      }
    });
    container.appendChild(button);

    buttons.push(button);
    tabNames.push(category);
  });

  container.classList.add('flex-container');

  const buttonElements = container.getElementsByTagName('button');
  for (let i = 0; i < buttonElements.length; i++) {
    buttonElements[i].classList.add('tab-button');
  }

  handleCategoryClick('favorite');

  const calendarContainer = document.createElement('div');
  calendarContainer.id = 'calendar-tab';
  calendarContainer.classList.add('hidden');
  document.body.appendChild(calendarContainer);

  const calendarTitle = document.createElement('h2');
  calendarTitle.innerHTML = 'Month and Year'; 
  calendarTitle.classList.add('calendar-title');
  calendarContainer.appendChild(calendarTitle);

  const previousButton = document.createElement('button');
  previousButton.innerHTML = 'Previous Month';
  previousButton.classList.add('btn-calendar');
  calendarContainer.appendChild(previousButton);

  const nextButton = document.createElement('button');
  nextButton.innerHTML = 'Next Month';
  nextButton.classList.add('btn-calendar');
  calendarContainer.appendChild(nextButton);

  const calendar = document.createElement('div');
  calendar.classList.add('calendar');
  calendarContainer.appendChild(calendar);

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();

  function generateCalendar(year, month) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date(year, month);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  calendarTitle.innerHTML = `${monthNames[currentMonth]} ${currentYear}`;

  calendar.innerHTML = '';

  for (let i = 0; i < dayNames.length; i++) {
    const dayNameCell = document.createElement('div');
    dayNameCell.classList.add('day-name-cell');
    dayNameCell.innerHTML = dayNames[i];
    calendar.appendChild(dayNameCell);
  }

  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('empty-cell');
    emptyCell.style.backgroundColor = 'transparent';
    calendar.appendChild(emptyCell);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day-cell');
    dayCell.innerHTML = day;
    calendar.appendChild(dayCell);
  }  
}

generateCalendar(currentYear, currentMonth);

previousButton.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
});

nextButton.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
});


  return { buttons, tabNames };
}

const tabs = accountTabsGenerator();
const { buttons: tabButtons, tabNames } = tabs;

export { tabButtons, tabNames };