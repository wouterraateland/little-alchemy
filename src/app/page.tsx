"use client";

import Main from "app/main";
import Sidebar from "app/sidebar";
import ThropyCase from "app/throphy-case";

export default function Page() {
  return (
    <html>
      <body className="flex h-dvh w-dvw select-none flex-col overscroll-contain">
        <div className="relative flex flex-grow flex-col overflow-hidden">
          <ThropyCase />
          <div className="flex min-h-0 flex-grow">
            <Main />
            <Sidebar />
          </div>
        </div>
      </body>
    </html>
  );
}
