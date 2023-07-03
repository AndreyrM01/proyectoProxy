// LocalStorageManager.js
class LocalStorageManager {
  constructor() {
    if (LocalStorageManager.instance) {
      return LocalStorageManager.instance;
    }
    LocalStorageManager.instance = this;

    this.data = {
      favorite: [],
      interest: [],
      going: [],
    };

    const storedData = localStorage.getItem('storedData');
    if (storedData) {
      this.data = JSON.parse(storedData);
    }

    this.saveData();
  }

  saveData() {
    localStorage.setItem('storedData', JSON.stringify(this.data));
  }

  addToLocalStorage(event, category) {
    const events = this.data[category];
    if (!events.includes(event)) {
      events.push(event);
      this.saveData();
      console.log('Item added to LocalStorage:', event);
    } else {
      console.log('Item already exists in LocalStorage:', event);
    }
  }

  getLocalStorageItems(category) {
    return this.data[category] || [];
  }

  clearLocalStorageOnReload() {
    localStorage.removeItem('storedData');
    this.data = {
      favorite: [],
      interest: [],
      going: [],
    };
  }
}

const localStorageManager = new LocalStorageManager();
export {localStorageManager};
