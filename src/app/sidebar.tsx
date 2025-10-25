import { discoveredItemsStore, items, usedItemsStore } from "app/items";
import SidebarItem from "app/sidebar-item";
import useAsyncStore from "hooks/use-async-store";
import { firstBy } from "thenby";

export default function Sidebar() {
  const discoveredItems = useAsyncStore(discoveredItemsStore);
  const usedItems = useAsyncStore(usedItemsStore);

  return (
    <div className="w-32 overflow-y-auto bg-amber-400 text-amber-950">
      {items
        .filter((item) => discoveredItems.has(item.emoji))
        .toSorted(firstBy((item) => item.name))
        .map((item) => (
          <SidebarItem
            key={item.emoji}
            item={item}
            used={usedItems.has(item.emoji)}
          />
        ))}
    </div>
  );
}
