import type { FieldItem } from "app/items";
import { gameStore, handleDrop, handleMove } from "app/items";
import clsx from "clsx";

export default function MainItem({
  focused,
  item,
}: {
  focused: boolean;
  item: FieldItem;
}) {
  return (
    <div
      key={item.id}
      className={clsx(
        "absolute left-0 top-0 flex size-12 touch-none items-center justify-center rounded-full bg-amber-300 text-4xl ring ring-amber-400",
        focused ? "z-10 cursor-grabbing" : "cursor-grab",
      )}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        gameStore.update((s) => ({ ...s, focus: item.id }));
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
      style={{
        transform: `translate(calc(${item.x}px - 50%), calc(${item.y}px - 50%))`,
      }}
    >
      {item.emoji}
    </div>
  );
}
