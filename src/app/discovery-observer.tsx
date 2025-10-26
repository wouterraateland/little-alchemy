import { discoveredItemsStore, itemMap, targetItems } from "app/items";
import SunshineBackground from "app/sunshine-background";
import useAsyncStore from "hooks/use-async-store";
import { useState } from "react";

export default function DiscoveryObserver() {
  const discoveredItems = useAsyncStore(discoveredItemsStore);
  const [previouslyDiscoveredItems, setPreviouslyDiscoveredItems] =
    useState(discoveredItems);

  return Array.from(discoveredItems)
    .filter((item) => !previouslyDiscoveredItems.has(item))
    .map((item) => (
      <div
        key={item}
        className="animate-pop-in fixed inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-amber-600 to-amber-700"
      >
        <SunshineBackground />
        <div className="h-10" />
        {targetItems.includes(item) ? (
          <p className="text-amber-50">Nieuwe sleutel-ontdekking!</p>
        ) : (
          <p className="text-amber-50">Nieuwe ontdekking!</p>
        )}
        {targetItems.includes(item) ? (
          <p className="rounded-full bg-amber-200 p-8 text-6xl">{item}</p>
        ) : (
          <p className="rounded-full bg-amber-700 p-8 text-6xl">{item}</p>
        )}
        <p className="text-2xl font-bold text-amber-50">
          {itemMap.get(item)?.name}
        </p>
        <button
          className="rounded bg-amber-50 px-3.5 py-2"
          onClick={() => {
            setPreviouslyDiscoveredItems((current) =>
              new Set(current).add(item),
            );
          }}
        >
          Doorgaan
        </button>
      </div>
    ));
}
