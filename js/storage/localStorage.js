function addToLocalStorage(item, key) {
  try {
    let items = localStorage.getItem(key);
    let parsedItems = items ? JSON.parse(items) : [];

    let itemExists = parsedItems.some(element => element.id === item.id);
    if (!itemExists) {
      parsedItems.push(item);
      localStorage.setItem(key, JSON.stringify(parsedItems));
    } else {
    }    
  } catch (error) {
    console.error('Error adding item to LocalStorage:', error);
  }
}

function getLocalStorageItems(key) {
  try {
    let items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error getting items from LocalStorage:', error);
    return [];
  }
}

export { addToLocalStorage, getLocalStorageItems};
