import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "pop-in": "pop-in .2s ease-out",
      },
      keyframes: {
        "pop-in": {
          from: { opacity: "0", scale: "0.9" },
          to: { opacity: "1" },
        },
      },
    },
  },
};
export default config;
