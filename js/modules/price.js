function priceFunction(price) {
  if (price === 0) {
    return 'FREE!';
  } else {
    return `Price: $${price.toFixed(2)}`;
  }
}

export {priceFunction};
