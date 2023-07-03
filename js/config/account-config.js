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
  
    const eventCategories = ['Favorite', 'Interest', 'Going'];
    const buttons = [];
    const tabNames = [];
  
    const handleCategoryClick = (category) => {
      console.log('Categoría seleccionada: ' + category);
      const buttons = container.getElementsByClassName('tab-button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('default-tab-button');
      }
      const selectedButton = document.getElementById(category);
      selectedButton.classList.add('default-tab-button');
    };
  
    eventCategories.forEach((category) => {
      const button = document.createElement('button');
      button.id = category.toLowerCase();
      button.innerHTML = category;
      button.addEventListener('click', () => {
        handleCategoryClick(category.toLowerCase());
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
  
    return { buttons, tabNames };
  }
  
  const tabs = accountTabsGenerator();
  const { buttons: tabButtons, tabNames } = tabs;
  
  export { tabButtons, tabNames };
  