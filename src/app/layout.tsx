// app/layout.tsx
import Providers from "@/lib/Providers";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HomeIcon,
  UsersIcon,
  GroupIcon,
  MenuIcon,
  LogOutIcon,
} from "lucide-react";


export const metadata: Metadata = {
  title: "CodeChef-VIT",
  description: "Made with ♡ by CodeChef-VIT",
  icons: [{ rel: "icon", url: "/cc-logo.svg" }],
  openGraph: {
    title: "CodeChef-VIT",
    images: [{ url: "/open-graph.png" }],
    url: "https://portal.codechefvit.com",
    type: "website",
    description: "Made with ♡ by CodeChef-VIT",
    siteName: "CodeChef-VIT",
  },
  applicationName: "CodeChef-VIT",
  keywords: [
    "CodeChef",
    "VIT",
    "Vellore Institute of Technology",
    "CodeChef-VIT",
  ],
};


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" className={`${GeistSans.variable}`}>
        <body >
            <Providers>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster position="top-right" toastOptions={{ id: "_toast" }} />
                <div className="flex h-screen bg-black">
                <Sidebar />
                      <div className="flex flex-col flex-1">
                        <Navbar />
                        <main className="flex-1 p-8">
                            {children}
                            </main>
                      </div>
                  </div>
              </ThemeProvider>
            </Providers>
        </body>
      </html>
    );
  }


  function Sidebar() {
    const navigation = [
      { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
      { name: "Users", href: "/users", icon: UsersIcon },
      { name: "Teams", href: "/teams", icon: GroupIcon },
    ];

    return (
      <aside className="border-r border-gray-200 h-full w-64  dark:border-gray-700">
        <ScrollArea className="h-full">
          <div className="p-4">
            <Link href="/" className="text-2xl font-bold mb-6 block">
                CodeChef Admin
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
  function Navbar() {
    return (
      <nav className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
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
          Admin Panel
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/api/auth/signout" className="flex items-center">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    );
}