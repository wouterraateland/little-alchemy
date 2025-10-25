import type { Item } from "app/items";
import { baseItems, gameStore, handleDrop, handleMove } from "app/items";

export default function SidebarItem({
  item,
  resultsDiscovered,
  resultsTotal,
}: {
  item: Item;
  resultsDiscovered: number;
  resultsTotal: number;
}) {
  return (
    <div
      className="flex cursor-grab touch-pan-y items-center gap-2 p-2 hover:bg-amber-500"
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        const id = crypto.randomUUID();
        gameStore.update((s) => ({
          ...s,
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
      onPointerUp={async (event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        event.currentTarget.releasePointerCapture(event.pointerId);
        await handleDrop();
      }}
    >
      <span className="text-2xl">{item.emoji}</span>
      <div className="flex min-w-0 flex-grow flex-col items-start">
        <p className="truncate">{item.name}</p>
        {resultsTotal === 0 ? (
          <div className="rounded bg-gray-600 px-1 text-xs text-white">
            Final
          </div>
        ) : resultsDiscovered >= resultsTotal ? (
          <div className="rounded bg-lime-600 px-1 text-xs text-white">
            Completed
          </div>
        ) : (
          resultsDiscovered === 0 &&
          !baseItems.includes(item.emoji) && (
            <div className="rounded bg-red-600 px-1 text-xs text-white">
              New
            </div>
          )
        )}
      </div>
    </div>
  );
}
