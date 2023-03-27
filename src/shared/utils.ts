export function randomBetween(min: number, max: number) {
  const diff = Math.abs(max - min);
  return Math.random() * diff + Math.min(min, max);
}

export function range(start: number, end: number): number[] {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);
}

export function formatNumber(n: number, minimumFractionDigits: number, maximumFractionDigits: number): string {
  if (isNaN(n)) return '';

  return n.toLocaleString(undefined, { minimumFractionDigits, maximumFractionDigits });
}

export function autoFormatNumber(n: number): string {
  const min = (n >= 1 ? 0 : 1);
  const max = (n > 100 ?
    0 :
    (n > 1 ? 1 : 2)
  );
  return formatNumber(n, min, max);
}

export function enumFromKey<T> (enm: { [s: string]: T}, value: string): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? value as unknown as T
    : undefined;
}