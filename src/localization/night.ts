export const getNightsDeclension = (count: number) => {
  const absCount = Math.abs(count) % 100
  const lastDigit = absCount % 10

  if (absCount > 10 && absCount < 20) {
    return 'ночей'
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return 'ночи'
  }
  if (lastDigit === 1) {
    return 'ночь'
  }
  return 'ночей'
};
