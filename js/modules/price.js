function priceFunction(price) {
  if (price === undefined) {
    return 'Price: N/A';
  } else if (price === 0) {
    return 'FREE!';
  } else {
    return `Price: $${price.toFixed(2)}`;
  }
}

export { priceFunction };
