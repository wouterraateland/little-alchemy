import { gameStore } from "app/items";
import { useLayoutEffect, useRef } from "react";

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const updateRect = () => {
      const rect = node.getBoundingClientRect();
      gameStore.update((s) => ({ ...s, rect }));
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
    };
  }, []);

  return (
    <div ref={ref} className="min-w-0 flex-grow bg-amber-200">
      {children}
    </div>
  );
}
