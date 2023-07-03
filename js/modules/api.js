const apiUrl = 'https://knassbani2.execute-api.us-east-2.amazonaws.com/events/';

const cache = {};

const proxyCache = new Proxy(cache, {
  get: (obj, category) => {
    if (obj[category]) {
      console.log('Data obtained from cache.');
      return obj[category];
    } else {
      const url = `${apiUrl}${category}`;
      const dataPromise = fetch(url)
        .then(response => response.json())
        .then(data => {
          obj[category] = data;
          return data;
        });

      obj[category] = dataPromise;

      return dataPromise;
    }
  }
});

class eventProxy {
  constructor() {
    this.cache = cache;
  }

  async getEventsByCategory(category) {
    return await proxyCache[category];
  }

  getAllCategories() {
    return Object.keys(proxyCache);
  }

  clearCache() {
    for (const category in cache) {
      delete cache[category];
    }
  }
}

export { eventProxy };