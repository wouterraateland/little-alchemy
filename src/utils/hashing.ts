export const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
};

let current = 0;
const cache = new Map<unknown, number>();

export const stableHash = (x: unknown) => {
  if (!cache.has(x)) cache.set(x, current++);
  return cache.get(x)!;
};
