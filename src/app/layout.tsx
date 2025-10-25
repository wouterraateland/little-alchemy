import "styles.css";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Little Alchemy",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
