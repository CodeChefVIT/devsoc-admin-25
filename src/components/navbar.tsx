"use client";

import { logout } from "@/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOutIcon, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [theName, setTheName] = useState("");
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (pathname == "/users") {
      setTheName("Users");
    } else if (pathname == "/teams") {
      setTheName("Teams");
    } else if (pathname == "/idea") {
      setTheName("Ideas");
    }else if(pathname=="/leaderboard"){
      setTheName("Leaderboard")
    }
  });
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="text-xl font-semibold text-gray-700 dark:text-white">
        {theName}
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleLogout()}
              className="flex cursor-pointer items-center"
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
