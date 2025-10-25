export default function SunshineBackground() {
  return (
    <div
      className="fixed -inset-[50%] animate-spin"
      style={{
        animationDuration: "20s",
        background:
          "repeating-conic-gradient(from 0deg at 50% 50%, #0003 0deg 10deg, #0000 10deg 20deg)",
        zIndex: -1,
      }}
    />
  );
}
