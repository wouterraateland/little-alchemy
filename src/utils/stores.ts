import { clearCookie, readCookieIsomorphic, setCookie } from "utils/cookies";

type Subscription<T> = (state: T) => void;

export const createStore = <T>(
  initialData: T,
  equals: (current: T, next: T) => boolean = (current: T, next: T) =>
    current === next,
) => {
  let data = initialData;
  const subscriptions = new Set<Subscription<T>>();

  const set = (next: T) => {
    if (equals(data, next)) return;
    data = next;
    for (const subscription of subscriptions) subscription(data);
  };

  return {
    get: () => data,
    set,
    update(updater: (state: T) => T) {
      set(updater(data));
    },
    subscriptions,
    subscribe(subscription: Subscription<T>, runImmediately = false) {
      if (runImmediately) subscription(data);
      subscriptions.add(subscription);
      return () => {
        subscriptions.delete(subscription);
      };
    },
  };
};

export type Store<T> = ReturnType<typeof createStore<T>>;

export const createCookieStore = <T>(
  key: string,
  parse: (value: string | null) => T,
  serialize: (state: T) => string,
) => {
  const ref: { current?: T } = {};
  const subscriptions = new Set<Subscription<T>>();

  const get = async () => {
    ref.current = parse(await readCookieIsomorphic(key));
    return ref.current;
  };
  const set = (value: T) => {
    if (typeof document === "object") setCookie(key, serialize(value));
    ref.current = value;
    for (const subscription of subscriptions) subscription(value);
  };

  return {
    key,
    ref,
    get,
    set,
    clear() {
      if (typeof document === "object") clearCookie(key);
      ref.current = parse(null);
      for (const subscription of subscriptions) subscription(ref.current);
    },
    async update(updater: (state: T) => T) {
      const current = "current" in ref ? ref.current : await get();
      const next = updater(current);
      if (next !== current) set(next);
    },
    subscriptions,
    subscribe(subscription: Subscription<T>) {
      subscriptions.add(subscription);
      return () => {
        subscriptions.delete(subscription);
      };
    },
  };
};
export type AsyncStore<T> = ReturnType<typeof createCookieStore<T>>;
