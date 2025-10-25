import { createCookieStore, createStore } from "utils/stores";

export type Item = {
  emoji: string; // Key
  name: string;
};

export const items: Array<Item> = [
  { emoji: "🪨", name: "Rock" },
  { emoji: "💧", name: "Water" },
  { emoji: "🌱", name: "Plant" },
  { emoji: "🔥", name: "Fire" },
  { emoji: "🌬️", name: "Air" },
  { emoji: "🌳", name: "Tree" },
  { emoji: "🌻", name: "Flower" },
  { emoji: "🍞", name: "Bread" },
  { emoji: "🏠", name: "House" },
  { emoji: "🚗", name: "Car" },
  { emoji: "🧱", name: "Brick" },
  { emoji: "🛤️", name: "Railroad" },
  { emoji: "🏭", name: "Factory" },
  { emoji: "🌋", name: "Volcano" },
  { emoji: "⚡", name: "Electricity" },
  { emoji: "🎨", name: "Painting" },
  { emoji: "🗼", name: "Eiffel Tower" },
  { emoji: "🚂", name: "Train" },
  { emoji: "🎂", name: "Cake" },
];

export const itemMap: Map<string, Item> = new Map(
  items.map((item) => [item.emoji, item]),
);

export const baseItems = ["🪨", "💧", "🔥", "🌬️"];
export const targetItems = ["🗼", "🎨", "🚂", "🎂"];

export const combinations = new Map<string, [string, string]>([
  ["🌱", ["🪨", "💧"]],
  ["🌳", ["🌱", "💧"]],
  ["🌻", ["🌱", "🌬️"]],
  ["🍞", ["🌱", "🔥"]],
  ["🏠", ["🪨", "🌱"]],
  ["🚗", ["🏠", "🪨"]],
  ["🧱", ["🪨", "🪨"]],
  ["🛤️", ["🧱", "🚗"]],
  ["🏭", ["🧱", "🔥"]],
  ["🌋", ["🪨", "🔥"]],
  ["⚡", ["🌬️", "🔥"]],
  ["🎨", ["🌻", "🏭"]],
  ["🗼", ["🛤️", "🏭"]],
  ["🚂", ["🛤️", "⚡"]],
  ["🎂", ["🍞", "💧"]],
]);

export const ingredients = new Map<string, Set<string>>();
for (const item of items) ingredients.set(item.emoji, new Set());
for (const [result, [input1, input2]] of combinations.entries()) {
  ingredients.get(input1)!.add(result);
  ingredients.get(input2)!.add(result);
}

export function getCombinationResult(
  item1: string,
  item2: string,
): string | null {
  for (const [result, [input1, input2]] of combinations.entries())
    if (
      (item1 === input1 && item2 === input2) ||
      (item1 === input2 && item2 === input1)
    )
      return result;
  return null;
}

export const discoveredItemsStore = createCookieStore(
  "discovered_items",
  (value) => new Set(value ? value.split(",") : baseItems),
  (value) => Array.from(value).join(","),
);

export type FieldItem = { emoji: string; id: string; x: number; y: number };

export const gameStore = createStore({
  field: new Array<FieldItem>(),
  focus: null as string | null,
});

export const handleMove = (dx: number, dy: number) => {
  gameStore.update((s) => ({
    ...s,
    field: s.field.map((item) =>
      item.id === s.focus ? { ...item, x: item.x + dx, y: item.y + dy } : item,
    ),
  }));
};

export const handleDrop = async () => {
  const state = gameStore.get();
  const item = state.field.find((item) => item.id === state.focus);
  if (!item) return;
  gameStore.update((s) => ({ ...s, focus: null }));

  for (const other of state.field) {
    if (other.id === item.id) continue;
    const distance = Math.hypot(item.x - other.x, item.y - other.y);
    if (distance > 80) continue;

    const resultEmoji = getCombinationResult(item.emoji, other.emoji);
    if (!resultEmoji) continue;

    const id = crypto.randomUUID();
    const newItem: FieldItem = {
      emoji: resultEmoji,
      id,
      x: (item.x + other.x) / 2,
      y: (item.y + other.y) / 2,
    };

    await discoveredItemsStore.update((s) => new Set(s).add(resultEmoji));

    gameStore.update((s) => ({
      ...s,
      field: [
        ...s.field.filter((f) => f.id !== item.id && f.id !== other.id),
        newItem,
      ],
      focus: id,
    }));
    break;
  }
};
