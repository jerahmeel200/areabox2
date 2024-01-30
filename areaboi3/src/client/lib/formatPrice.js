function formatPrice(price) {
  if (price >= 1000000000) {
    return (price / 1000000000).toFixed(1) + 'B';
  } else if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + 'M';
  } else if (price >= 1000) {
    return (price / 1000).toFixed(1) + 'K';
  } else {
    return price.toLocaleString();
  }
}

export default formatPrice;
