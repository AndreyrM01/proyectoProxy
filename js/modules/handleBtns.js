export function interestBtn(event) {
  const interestList = localStorage.getItem('interested');
  let interestArr = interestList ? JSON.parse(interestList) : [];

  const interestBtns = event.target;
  const categoria = document.querySelector('.default-tab-button').id;
  const selectedEvent = interestBtns.classList.item(2);

  let eventos = localStorage.getItem(categoria);
  eventos = JSON.parse(eventos);
  const eventAdd = eventos.find(element => element.id === selectedEvent);
  
  const isEventAlreadyAdded = interestArr.some(element => element.id === selectedEvent);
  if (!isEventAlreadyAdded) {
    interestArr.push(eventAdd);
    localStorage.setItem('interested', JSON.stringify(interestArr));
    interestBtns.textContent = 'Changed your mind?';
  } else {
    const index = interestArr.findIndex(element => element.id === selectedEvent);
    interestArr.splice(index, 1); 
    localStorage.setItem('interested', JSON.stringify(interestArr));
    interestBtns.textContent = 'Interest'; 
  }
}

export function goingBtn(event) {
  let goingList = localStorage.getItem('going');
  goingList = goingList ? JSON.parse(goingList) : [];

  const goingBtns = event.target;
  let categoria = document.querySelector('.default-tab-button');
  categoria = categoria.id;
  const selectedEvent = goingBtns.classList.item(2);

  let eventos = localStorage.getItem(categoria);
  eventos = eventos ? JSON.parse(eventos) : [];
  const eventAdd = eventos.find(element => element.id === selectedEvent);

  const isEventAlreadyAdded = goingList.some(element => element.id === selectedEvent);
  if (!isEventAlreadyAdded) {
    goingList.push(eventAdd);
    localStorage.setItem('going', JSON.stringify(goingList));
    goingBtns.textContent = 'Changed your mind?'; 
  } else {
    const index = goingList.findIndex(element => element.id === selectedEvent);
    goingList.splice(index, 1); 
    localStorage.setItem('going', JSON.stringify(goingList));
    goingBtns.textContent = 'Going'; 
  }
}

export function favoriteBtn(event) {
  let favoriteList = localStorage.getItem('favorite');
  favoriteList = JSON.parse(favoriteList);
  const favoriteBtns = event.target;
  let categoria = document.querySelector('.default-tab-button');
  categoria = categoria.id;
  const selectedEvent = favoriteBtns.classList.item(1);
  let eventos = localStorage.getItem(categoria);
  eventos = JSON.parse(eventos);
  const eventAdd = eventos.find(element => element.id === selectedEvent);

  const eventInListIndex = favoriteList.findIndex(element => element.id === selectedEvent);
  if (eventInListIndex === -1) {
    favoriteList.push(eventAdd);
  } else {
    favoriteList.splice(eventInListIndex, 1);
  }

  localStorage.setItem('favorite', JSON.stringify(favoriteList));
}
