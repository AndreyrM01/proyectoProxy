// const state = {
//   favorites: [],
//   interested: [],
//   going: [],
// };

// const stateInfo = {
//   getdata(value) {
//     return [...state[value]];
//   },
//   addEvent(value, event) {
//     if (state[value] && Array.isArray(state[value])) {
//       state[value].push(event);
//       if (value === 'interested') {
//         state.going = state.going.filter((element) => element.id !== event.id);
//       } else if (value === 'image_click') {
//       } else {
//         state.interested = state.interested.filter((element) => element.id !== event.id);
//       }
//       this.saveState();
//     } else {
//       console.error(`Invalid value '${value}' or state property not found.`);
//     }
//   },
  
//   getLocalState() {
//     const localState = JSON.parse(localStorage.getItem("state"));
//     if (localState) {
//       state.favorites = localState.favorites || [];
//       state.interested = localState.interested || [];
//       state.going = localState.going || [];
//       this.saveState();
//     }
//   },
//   removeGoingEvent(event) {
//     state.going = state.going.filter((element) => element.id !== event.id);
//     this.saveState();
//   },
//   removeInterestedEvent(event) {
//     state.interested = state.interested.filter((element) => element.id !== event.id);
//     this.saveState();
//   },
//   removeEvent(category, event) {
//     this.getLocalState();
//     state[category] = state[category].filter((element) => element.id !== event.id);
//     this.saveState();
//   },
//   saveState() {
//     localStorage.setItem("state", JSON.stringify(state));
//   },
//   setState(newState) {
//     state.favorites = newState.favorites || [];
//     state.interested = newState.interested || [];
//     state.going = newState.going || [];
//     this.saveState();
//   },
// };

// stateInfo.getLocalState();

// const stateImmutable = Object.freeze(stateInfo);

// import { getLocalStorageItems } from "../storage/localStorage.js";

// const favoritesTab = document.getElementById('favorites-tab');
// const interestedTab = document.getElementById('interest-tab');
// const goingTab = document.getElementById('going-tab');

// function displayItems() {
//   const container = document.getElementById('container');
//   if (container !== null) {
//     const storedItems = getLocalStorageItems('yourLocalStorageKey');
//     let html = '';
//     storedItems.forEach((item) => {
//       for (const key in item) {
//         if (Object.hasOwnProperty.call(item, key)) {
//           html += `<div>${key}: ${item[key]}</div>`;
//         }
//       }
//     });
//     container.innerHTML = html;
//   }
// }

// // Create a container element
// const container = document.createElement('div');
// container.id = 'container';
// document.body.appendChild(container);

// displayItems();

// export { stateImmutable };

import { getLocalStorageItems } from "../storage/localStorage.js";

const state = {
  favorites: [],
  interested: [],
  going: [],
};

const stateInfo = {
  getdata(value) {
    return [...state[value]];
  },
  addEvent(value, event) {
    if (state[value] && Array.isArray(state[value])) {
      state[value].push(event);
      if (value === 'interested') {
        state.going = state.going.filter((element) => element.id !== event.id);
      } else if (value === 'image_click') {
        // Add any specific logic for 'image_click' category
      } else {
        state.interested = state.interested.filter((element) => element.id !== event.id);
      }
      this.saveState();
    } else {
      console.error(`Invalid value '${value}' or state property not found.`);
    }
  },
  getLocalState() {
    const localState = JSON.parse(localStorage.getItem("state"));
    if (localState) {
      state.favorites = localState.favorites || [];
      state.interested = localState.interested || [];
      state.going = localState.going || [];
      this.saveState();
    }
  },
  removeGoingEvent(event) {
    state.going = state.going.filter((element) => element.id !== event.id);
    this.saveState();
  },
  removeInterestedEvent(event) {
    state.interested = state.interested.filter((element) => element.id !== event.id);
    this.saveState();
  },
  removeEvent(category, event) {
    this.getLocalState();
    state[category] = state[category].filter((element) => element.id !== event.id);
    this.saveState();
  },
  saveState() {
    localStorage.setItem("state", JSON.stringify(state));
  },
  setState(newState) {
    state.favorites = newState.favorites || [];
    state.interested = newState.interested || [];
    state.going = newState.going || [];
    this.saveState();
  },
};

stateInfo.getLocalState();

const stateImmutable = Object.freeze(stateInfo);

const favoritesTab = document.getElementById('favorites-tab');
const interestedTab = document.getElementById('interest-tab');
const goingTab = document.getElementById('going-tab');

function displayItems() {
  const container = document.getElementById('container');
  if (container !== null) {
    const storedItems = getLocalStorageItems('yourLocalStorageKey');
    let html = '';
    storedItems.forEach((item) => {
      for (const key in item) {
        if (Object.hasOwnProperty.call(item, key)) {
          html += `<div>${key}: ${item[key]}</div>`;
        }
      }
    });
    container.innerHTML = html;
  }
}

// Create a container element
const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

displayItems();

export { stateImmutable };
