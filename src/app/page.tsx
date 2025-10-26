"use client";

import DiscoveryObserver from "app/discovery-observer";
import Main from "app/main";
import Sidebar from "app/sidebar";
import ThropyCase from "app/throphy-case";

export default function Page() {
  return (
    <html>
      <body className="flex h-dvh w-dvw select-none flex-col overscroll-contain">
        <div className="relative flex flex-grow overflow-hidden">
          <Sidebar />
          <div className="flex min-w-0 flex-grow flex-col">
            <ThropyCase />
            <Main />
          </div>
        </div>
        <DiscoveryObserver />
      </body>
    </html>
  );
}
