const calculatePercentage = (val: number, min: number, max: number) => {
  return `${((val - min) / (max - min)) * 100}%`;
};

const calculateWPercentage = (
  value: number | [number, number],
  min: number,
  max: number
) => {
  const [start, end] = Array.isArray(value) ? value : [0, value];
  const positiveDifference = Math.abs(end - start);
  const range = max - min;
  return `${(positiveDifference / range) * 100}%`;
};

export { calculatePercentage, calculateWPercentage };
