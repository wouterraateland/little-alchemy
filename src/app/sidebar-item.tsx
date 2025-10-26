import AgeLabel from "app/age-label";
import type { Item } from "app/items";
import {
  baseItems,
  gameStore,
  handleDrop,
  handleMove,
  itemLocks,
} from "app/items";
import clsx from "clsx";

export default function SidebarItem({
  item,
  resultsDiscovered,
  resultsTotal,
}: {
  item: Item;
  resultsDiscovered: number;
  resultsTotal: number;
}) {
  const locked =
    itemLocks.has(item.emoji) && itemLocks.get(item.emoji)! > new Date();

  return (
    <div
      className={clsx(
        "flex cursor-grab touch-pan-y items-center gap-2 p-2 text-sm hover:bg-amber-500",
        locked && "pointer-events-none",
      )}
      onPointerCancel={() => {
        gameStore.update((s) => ({
          ...s,
          field: s.field.filter((other) => other.id !== s.focus),
          focus: null,
        }));
      }}
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
      <div className="grid *:col-start-1 *:row-start-1">
        <div className={clsx("text-3xl", locked && "opacity-50")}>
          {item.emoji}
        </div>
        {locked && <div className="self-start justify-self-end">🔒</div>}
      </div>
      <div className="flex min-w-0 flex-grow flex-col items-start">
        <p className="truncate">{item.name}</p>
        {locked ? (
          <div className="rounded bg-gray-600 px-1 text-xs text-white">
            <AgeLabel date={itemLocks.get(item.emoji)!} />
          </div>
        ) : resultsDiscovered >= resultsTotal ? (
          <div className="rounded bg-lime-600 px-1 text-xs text-white">
            Compleet
          </div>
        ) : (
          resultsDiscovered === 0 &&
          !baseItems.includes(item.emoji) && (
            <div className="rounded bg-red-600 px-1 text-xs text-white">
              Nieuw
            </div>
          )
        )}
      </div>
    </div>
  );
}
