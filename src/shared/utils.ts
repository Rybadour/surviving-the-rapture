export function randomBetween(min: number, max: number) {
  const diff = Math.abs(max - min);
  return Math.random() * diff + Math.min(min, max);
}

export function range(start: number, end: number): number[] {
  return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
}