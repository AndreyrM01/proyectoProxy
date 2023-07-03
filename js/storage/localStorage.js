function addToLocalStorage(item, key) {
  var items = localStorage.getItem(key);
  var parsedItems = items ? JSON.parse(items) : [];

  var itemExists = parsedItems.some(element => element.id === item.id);
  if (!itemExists) {
    parsedItems.push(item);
    localStorage.setItem(key, JSON.stringify(parsedItems));
    console.log('Item added to LocalStorage:', item);
  } else {
    console.log('Item already exists in LocalStorage:', item);
  }
}

function getLocalStorageItems(key) {
  var items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
}

function clearLocalStorageOnReload() {
  localStorage.clear();
}

export { addToLocalStorage, getLocalStorageItems, clearLocalStorageOnReload };
