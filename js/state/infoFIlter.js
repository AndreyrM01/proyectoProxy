// import { stateImmuted } from "./state.js";
// import { addToLocalStorage } from "../storage/localStorage.js";

// const addButtonClickListener = (elementId, stateKey, newItemText) => {
//   document.getElementById(elementId).addEventListener("click", (event) => {
//     event.preventDefault();
//     const currentState = stateImmuted.getState();
//     const items = currentState[stateKey] || [];
//     const newState = { ...currentState, [stateKey]: [...items, newItemText] };
//     stateImmuted.setState(newState);
//     addToLocalStorage(newItemText, stateKey);
//   });
// };

// // export { addButtonClickListener };
// import { stateImmuted } from "./state.js";
// import { addToLocalStorage } from "../storage/localStorage.js";

// const addButtonClickListener = (elementId, stateKey, newItemText, action) => {
//   document.getElementById(elementId).addEventListener("click", () => {
//     const currentState = stateImmuted.getState();
//     const items = currentState[stateKey] || [];
//     const newState = { ...currentState, [stateKey]: [...items, newItemText] };
//     stateImmuted.setState(newState);
//     addToLocalStorage(newItemText, action);
//   });
// };

// export { addButtonClickListener };