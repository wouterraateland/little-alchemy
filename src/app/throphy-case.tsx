import { discoveredItemsStore, targetItems } from "app/items";
import clsx from "clsx";
import useAsyncStore from "hooks/use-async-store";

export default function ThropyCase() {
  const discoveredItems = useAsyncStore(discoveredItemsStore);

  return (
    <div className="flex flex-shrink-0 justify-center gap-2 bg-amber-300 p-2">
      {targetItems.map((emoji) => (
        <div
          key={emoji}
          className={clsx(
            "flex size-8 items-center justify-center rounded-full text-2xl",
            discoveredItems.has(emoji) ? "bg-amber-500" : "bg-amber-700",
          )}
        >
          {discoveredItems.has(emoji) ? emoji : "?"}
        </div>
      ))}
    </div>
  );
}
