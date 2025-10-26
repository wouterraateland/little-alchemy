import "styles.css";

import QueryCacheProvider from "components/query-cache-provider";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Little Alchemy",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <QueryCacheProvider>{children}</QueryCacheProvider>;
}
