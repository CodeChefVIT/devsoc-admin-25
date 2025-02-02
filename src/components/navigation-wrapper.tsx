// app/components/navigation-wrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/" || pathname === "/";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-screen bg-black">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="overflow-y-scroll p-8">{children}</main>
      </div>
    </div>
  );
}
