// app/components/navigation-wrapper.tsx
"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login' || pathname === '/';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-black ">
      {/* Sidebar is hidden on smaller screens and visible on medium screens and larger */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-8 overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
