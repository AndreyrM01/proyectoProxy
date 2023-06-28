import { handleClick } from '../modules/dinamicTap.js'

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