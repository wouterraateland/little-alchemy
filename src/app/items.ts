import { createCookieStore, createStore } from "utils/stores";

export type Item = {
  emoji: string; // Key
  name: string;
};

export const items: Array<Item> = [
  { emoji: "🪨", name: "Steen" },
  { emoji: "💧", name: "Water" },
  { emoji: "🌱", name: "Plant" },
  { emoji: "🔥", name: "Vuur" },
  { emoji: "🌬️", name: "Lucht" },
  { emoji: "🌳", name: "Boom" },
  { emoji: "🌻", name: "Zonnebloem" },
  { emoji: "🍞", name: "Brood" },
  { emoji: "🏠", name: "Huis" },
  { emoji: "🚗", name: "Auto" },
  { emoji: "🧱", name: "Baksteen" },
  { emoji: "🛤️", name: "Spoor" },
  { emoji: "🏭", name: "Fabriek" },
  { emoji: "🌋", name: "Vulkaan" },
  { emoji: "⚡", name: "Elektriciteit" },
  { emoji: "🎨", name: "Kunst" },
  { emoji: "🗼", name: "Eiffeltoren" },
  { emoji: "🚂", name: "Trein" },
  { emoji: "🎂", name: "Taart" },
];

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

export const itemMap: Map<string, Item> = new Map(
  items.map((item) => [item.emoji, item]),
);

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
  rect: null as DOMRect | null,
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
  const selected = state.field.find((item) => item.id === state.focus);
  if (
    !selected ||
    !state.rect ||
    selected.x < state.rect.left ||
    selected.x > state.rect.right ||
    selected.y < state.rect.top ||
    selected.y > state.rect.bottom
  ) {
    gameStore.update((s) => ({
      ...s,
      field: s.field.filter((other) => other !== selected),
      focus: null,
    }));
    return;
  }
  gameStore.update((s) => ({ ...s, focus: null }));

  const target = state.field.findLast(
    (item) =>
      item.id !== selected.id &&
      Math.hypot(selected.x - item.x, selected.y - item.y) <= 48,
  );
  if (!target) return;

  const resultEmoji = getCombinationResult(selected.emoji, target.emoji);
  if (!resultEmoji) return;

  const id = crypto.randomUUID();
  const newItem: FieldItem = {
    emoji: resultEmoji,
    id,
    x: (selected.x + target.x) / 2,
    y: (selected.y + target.y) / 2,
  };

  await discoveredItemsStore.update((s) => new Set(s).add(resultEmoji));

  gameStore.update((s) => ({
    ...s,
    field: [
      ...s.field.filter((f) => f.id !== selected.id && f.id !== target.id),
      newItem,
    ],
  }));
};
