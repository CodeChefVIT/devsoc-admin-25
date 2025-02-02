"use client"

import { ScrollArea } from "@/components/ui/scroll-area";

import { GroupIcon, Lightbulb, UsersIcon } from "lucide-react";
import Link from "next/link";


export function Sidebar() {
  const navigation = [
    { name: "Users", href: "/users", icon: UsersIcon },
    { name: "Teams", href: "/teams", icon: GroupIcon },
    { name: "Ideas", href: "/idea", icon: Lightbulb },
    { name: "Leaderboard", href: "/leaderboard", icon: Lightbulb },

  ];

  return (
    <aside className="border-r border-gray-200 h-full w-64 dark:border-gray-700">
      <ScrollArea className="h-full">
        <div className="p-4">
          <Link href="/" className="text-2xl font-bold mb-6 block">
            Devsoc Admin
          </Link>
        </div>
        <nav className="px-2 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium text-gray-700 dark:text-gray-300"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}