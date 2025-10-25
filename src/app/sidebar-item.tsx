import type { Item } from "app/items";
import { gameStore, handleDrop, handleMove } from "app/items";

export default function SidebarItem({
  item,
  used,
}: {
  item: Item;
  used: boolean;
}) {
  return (
    <div
      className="flex cursor-grab touch-none items-center gap-1 p-2 hover:bg-amber-500"
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        const id = crypto.randomUUID();
        gameStore.update((s) => ({
          field: [
            ...s.field,
            { emoji: item.emoji, id, x: event.clientX, y: event.clientY },
          ],
          focus: id,
        }));
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        handleMove(event.movementX, event.movementY);
      }}
      onPointerUp={handleDrop}
    >
      <span className="text-2xl">{item.emoji}</span>
      <span className="min-w-0 truncate">{item.name}</span>
      {!used && (
        <div className="ml-auto rounded bg-red-600 px-1 text-xs text-white">
          New
        </div>
      )}
    </div>
  );
}
