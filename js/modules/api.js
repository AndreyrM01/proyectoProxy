// // class eventData {
// //   constructor(apiUrl) {
// //     this.eventCategories = ['music', 'art', 'food', 'business', 'sports'];
// //     this.dataCache = {};
// //     this.apiUrl = apiUrl;
// //   }

// //   async getEventsByCategory(category) {
// //     if (category in this.dataCache) {
// //       console.log('Data obtained from cache.');
// //       return this.dataCache[category];
// //     }

// //     const url = this.buildUrl(category);
// //     const data = await this.fetchData(url);

// //     this.dataCache[category] = data;

// //     return data;
// //   }

// //   async fetchData(url) {
// //     try {
// //       const response = await fetch(url);
// //       const data = await response.json();
// //       return data;
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //       throw error;
// //     }
// //   }

// //   buildUrl(category) {
// //     return `${this.apiUrl}${category}`;
// //   }

// //   getAllCategories() {
// //     return this.eventCategories;
// //   }
// // }

// const apiUrl = 'https://knassbani2.execute-api.us-east-2.amazonaws.com/events/';

// class eventProxy {
//   constructor() {
//     this.eventApi = new proxyCache(apiUrl);
//     this.cache = new Map();
//   }

//   async getEventsByCategory(category) {
//     if (this.cache.has(category)) {
//       console.log('Data obtained from cache.');
//       return this.cache.get(category);
//     }

//     const data = await this.eventApi.getEventsByCategory(category);
//     this.cache.set(category, data);

//     return data;
//   }

//   getAllCategories() {
//     return this.eventApi.getAllCategories();
//   }

//   clearCache() {
//     this.cache.clear();
//   }
// }

// export { proxyCache,eventProxy};

// const cache = {};

// const proxyCache = new Proxy({}, {
//   get: (obj, category) => {
//     if (obj[category]) {
//       return Reflect.get(obj, category);
//     } else {
//       const data = fetch(`https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${category}`)
//         .then(response => response.json())
//         .then(result => {
//           obj[category] = result;
//           return result;
//         });

//       obj[category] = data;

//       return data;
//     }
//   }
// });


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
    return proxyCache[category];
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


