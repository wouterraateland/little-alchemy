import { useQuery } from "hooks/queries";
import { useSyncExternalStore } from "react";
import { stableHash } from "utils/hashing";
import type { AsyncStore } from "utils/stores";

export default function useAsyncStore<T>(store: AsyncStore<T>): T;
export default function useAsyncStore<T, S>(
  store: AsyncStore<T>,
  selector: (state: T) => S,
): S;
export default function useAsyncStore<T, S>(
  store: AsyncStore<T>,
  selector: (state: T) => S = (s) => s as unknown as S,
): S {
  const initial = useQuery(`async-store-${stableHash(store)}`, store.get);

  return useSyncExternalStore(
    (s) => store.subscribe(s),
    () => selector("current" in store.ref ? store.ref.current : initial),
    () => selector("current" in store.ref ? store.ref.current : initial),
  );
}
