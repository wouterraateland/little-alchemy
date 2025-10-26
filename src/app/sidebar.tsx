import { discoveredItemsStore, ingredients, items } from "app/items";
import SidebarItem from "app/sidebar-item";
import useAsyncStore from "hooks/use-async-store";
import { useState } from "react";
import { firstBy } from "thenby";

export default function Sidebar() {
  const [search, setSearch] = useState("");
  const discoveredItems = useAsyncStore(discoveredItemsStore);

  return (
    <div className="flex w-36 flex-col bg-amber-300 text-amber-950">
      <div className="flex-shrink-0 bg-amber-400 p-2">
        <input
          className="w-full rounded-lg bg-amber-200 px-2.5 py-1 text-amber-950 ring ring-amber-600 placeholder:text-amber-500"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Zoeken..."
          type="search"
          value={search}
        />
      </div>
      <div className="min-h-0 flex-grow overflow-y-auto overscroll-y-contain">
        {items
          .filter(
            (item) =>
              discoveredItems.has(item.emoji) &&
              item.name.toLowerCase().includes(search.toLowerCase()),
          )
          .toSorted(firstBy((item) => item.name))
          .map((item) => (
            <SidebarItem
              key={item.emoji}
              item={item}
              resultsDiscovered={
                Array.from(ingredients.get(item.emoji)!).filter((result) =>
                  discoveredItems.has(result),
                ).length
              }
              resultsTotal={ingredients.get(item.emoji)!.size}
            />
          ))}
      </div>
    </div>
  );
}
