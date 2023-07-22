function addToLocalStorage(item, key) {
  try {
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
  } catch (error) {
    console.error('Error adding item to LocalStorage:', error);
  }
}

function getLocalStorageItems(key) {
  try {
    var items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error getting items from LocalStorage:', error);
    return [];
  }
}

function clearLocalStorageOnReload() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing LocalStorage:', error);
  }
}

export { addToLocalStorage, getLocalStorageItems};
