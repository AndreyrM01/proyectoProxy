import { handleClick } from '../modules/dinamicTap.js'

function initializeBtns() {
  let container = document.createElement('div');
  container.id = 'tab-container';
  document.body.appendChild(container);

  
  let accountContainer = document.createElement('div');
  accountContainer.classList.add('account-container', 'position-right');

  let accountLink = document.createElement('a');
  accountLink.href = '../../account.html';
  accountLink.textContent = 'My Account';
  accountLink.classList.add('account-link'); 

  let accountImage = document.createElement('img');
  accountImage.src = '../../img/white-right-arrow.png'; 
  accountImage.alt = 'My Account';
  accountImage.classList.add('right-arrow'); 

  accountContainer.appendChild(accountImage);
  accountContainer.appendChild(accountLink);

  container.insertBefore(accountContainer, container.firstChild);

  let eventCategories = ['Music', 'Sports', 'Business', 'Food', 'Art'];

  let handleCategoryClick = function (category) {



    let buttons = container.getElementsByClassName('tab-button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('default-tab-button');
    }
    let selectedButton = document.getElementById(category);
    selectedButton.classList.add('default-tab-button');
    handleClick(category.toLowerCase());
  };

  eventCategories.forEach(function (category) {
    let button = document.createElement('button');
    button.id = category.toLowerCase();
    button.innerHTML = category;
    button.addEventListener('click', function () {
      handleCategoryClick(category.toLowerCase());
    });
    container.appendChild(button);
  });

  container.classList.add('flex-container');

  let buttons = container.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add('tab-button');
  }

  handleCategoryClick('music');
}


export { initializeBtns};
