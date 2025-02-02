"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GroupIcon, Lightbulb, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Users", href: "/users", icon: UsersIcon },
    { name: "Teams", href: "/teams", icon: GroupIcon },
    { name: "Ideas", href: "/idea", icon: Lightbulb },
    { name: "Leaderboard", href: "/leaderboard", icon: Lightbulb },
  ];

  return (
    <aside className="h-full w-64 md:border-r md:border-gray-700">
      <ScrollArea className="h-full">
        <div className="p-4">
          <Link href="/" className="mb-6 block text-2xl font-bold">
            Devsoc Admin
          </Link>
        </div>
        <nav className="px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 font-medium transition-colors duration-200 ${isActive ? "bg-gray-200 text-black dark:bg-gray-800 dark:text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"}`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
