export const getColorFromValueFromZeroToOne = (value) => {
  if (value >= 0.6) return '#2ecc71';
  if (value >= 0.4) return '#f1c40f';
  if (value >= 0.1) return '#e74c3c';
  return '#c0392b';
};

export const getRandomNumberFromTo = (min, max) => (
  Math.floor(Math.random() * (max - min + 1)) + min
);
