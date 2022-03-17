export function randomBetween(min: number, max: number) {
  const diff = Math.abs(max - min);
  return Math.random() * diff + Math.min(min, max);
}