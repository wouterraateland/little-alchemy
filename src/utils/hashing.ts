let current = 0;
const cache = new Map<unknown, number>();

export const stableHash = (x: unknown) => {
  if (!cache.has(x)) cache.set(x, current++);
  return cache.get(x)!;
};
