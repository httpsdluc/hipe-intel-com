"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

const menu: MenuItem[] = [
  { title: "Home", url: "/" },
  {
    title: "Explore",
    url: "#",
    items: [
      {
        title: "Learn More",
        description: "Explore the 18 U.S. intelligence agencies",
        icon: <Book className="size-5" />,
        url: "/learn-more",
      },
      {
        title: "Community",
        description: "Connect and share with others",
        icon: <Trees className="size-5" />,
        url: "/community",
      },
      {
        title: "Opportunities",
        description: "Find internships and job listings",
        icon: <Sunset className="size-5" />,
        url: "/opportunities",
      },
      {
        title: "News",
        description: "Stay updated with real-time intel news",
        icon: <Zap className="size-5" />,
        url: "/stay-up-to-date",
      },
    ],
  },
];

const auth = {
  login: { title: "Sign In", url: "/sign-in" },
  signup: { title: "Sign Up", url: "/sign-up" },
};

export const Navbar1 = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {mounted && (
            <img
              src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
              alt="HIPE logo"
              className="h-8 w-8"
            />
          )}
          <span className="text-lg font-bold tracking-tight">
            HIPE INTEL COM
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => renderMenuItem(item, pathname))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <Link href={auth.login.url}>
                <Button variant="outline" size="sm">
                  {auth.login.title}
                </Button>
              </Link>
              <Link href={auth.signup.url}>
                <Button size="sm">{auth.signup.title}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex items-center gap-2">
                  {mounted && (
                    <img
                      src={
                        theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"
                      }
                      alt="HIPE logo"
                      className="h-8 w-8"
                    />
                  )}
                  <span className="font-bold text-lg">HIPE INTEL COM</span>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="mt-4 flex flex-col gap-6">
              <Accordion type="single" collapsible className="w-full">
                {menu.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              <ModeToggle />

              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <Link href={auth.login.url}>
                    <Button variant="outline" className="w-full">
                      {auth.login.title}
                    </Button>
                  </Link>
                  <Link href={auth.signup.url}>
                    <Button className="w-full">{auth.signup.title}</Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

// Desktop menu item
const renderMenuItem = (item: MenuItem, pathname: string) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="transition-all hover:scale-105">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground p-2 rounded-md shadow-xl animate-in fade-in zoom-in-75 duration-300">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title}>
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className={cn(
          "text-sm font-medium px-4 py-2 rounded-md transition-colors hover:text-primary",
          pathname === item.url
            ? "text-primary underline underline-offset-4"
            : "text-muted-foreground"
        )}
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

// Mobile menu item
const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title}>
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 pl-4">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-sm font-medium py-2">
      {item.title}
    </Link>
  );
};

// Submenu link (used in dropdowns and accordions)
const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <Link
    href={item.url}
    className="flex gap-3 items-start rounded-md p-2 hover:bg-muted transition"
  >
    <div className="text-primary mt-1">{item.icon}</div>
    <div>
      <div className="text-sm font-semibold">{item.title}</div>
      {item.description && (
        <p className="text-xs text-muted-foreground">{item.description}</p>
      )}
    </div>
  </Link>
);
