import { gameStore } from "app/items";
import MainContainer from "app/main-container";
import MainItem from "app/main-item";
import useStore from "hooks/use-store";

export default function Main() {
  const { field, focus } = useStore(gameStore);

  return (
    <MainContainer>
      {field.map((item) => (
        <MainItem key={item.id} focused={focus === item.id} item={item} />
      ))}
      {field.length > 0 && (
        <button
          className="absolute bottom-2 right-2 rounded bg-white px-2.5 py-1 text-black"
          onClick={() => {
            gameStore.update((s) => ({ ...s, field: [] }));
          }}
          type="button"
        >
          🧹 Clear
        </button>
      )}
    </MainContainer>
  );
}
