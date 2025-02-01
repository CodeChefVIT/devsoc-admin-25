// app/components/navigation-wrapper.tsx
"use client"

import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login' || pathname === '/';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-8 overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}