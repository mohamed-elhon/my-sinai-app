"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Contact,
  Download,
  Github,
  Home,
  Info,
  LogOut,
  Menu,
  UserCircle,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { Logo } from "../logo";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Services", icon: Wrench },
  { href: "/about", label: "About Me", icon: Info },
  { href: "/downloads", label: "Downloads", icon: Download },
  { href: "/contact", label: "Contact Us", icon: Contact },
  { href: "/github", label: "GitHub", icon: Github },
];

export function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push("/auth/signin");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} icon={link.icon}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <UserMenu onSignOut={handleSignOut} email={user.email} />
          ) : (
            <div className="hidden md:flex md:items-center md:gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/auth/signin")}
              >
                Sign In
              </Button>
              <Button onClick={() => router.push("/auth/signup")}>
                Sign Up
              </Button>
            </div>
          )}

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                <div className="mb-6">
                  <Logo />
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <MobileNavLink
                      key={link.href}
                      href={link.href}
                      icon={link.icon}
                      onNavigate={() => setSheetOpen(false)}
                    >
                      {link.label}
                    </MobileNavLink>
                  ))}
                  <hr className="my-2" />
                  {user ? (
                    <Button onClick={() => { handleSignOut(); setSheetOpen(false); }}>Sign Out</Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                       <Button variant="outline" onClick={() => { router.push("/auth/signin"); setSheetOpen(false); }}>
                          Sign In
                        </Button>
                        <Button onClick={() => { router.push("/auth/signup"); setSheetOpen(false); }}>
                          Sign Up
                        </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: React.ElementType; }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 transition-colors hover:text-foreground/80",
        isActive ? "text-foreground" : "text-foreground/60"
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, icon: Icon, onNavigate }: { href: string; children: React.ReactNode; icon: React.ElementType; onNavigate: () => void; }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-md p-2 text-lg font-semibold transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent"
      )}
    >
      <Icon className="h-5 w-5" />
      {children}
    </Link>
  );
}


function UserMenu({
  onSignOut,
  email,
}: {
  onSignOut: () => void;
  email: string | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{email || "My Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
