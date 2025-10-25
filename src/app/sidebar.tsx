import { discoveredItemsStore, ingredients, items } from "app/items";
import SidebarItem from "app/sidebar-item";
import useAsyncStore from "hooks/use-async-store";
import { firstBy } from "thenby";

export default function Sidebar() {
  const discoveredItems = useAsyncStore(discoveredItemsStore);

  return (
    <div className="w-40 overflow-y-auto bg-amber-400 text-amber-950">
      {items
        .filter((item) => discoveredItems.has(item.emoji))
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
  );
}
