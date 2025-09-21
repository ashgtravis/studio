'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles, LogIn, UserPlus, Info, HelpCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const fullHref = role ? `${href}?role=${role}` : href;

  return (
    <Link
      href={fullHref}
      className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
    >
      {children}
    </Link>
  );
};

const AuthLinks = () => (
  <>
    <Link href="/auth/login" passHref>
      <Button variant="ghost">
        <LogIn className="w-4 h-4 mr-2" />
        Login
      </Button>
    </Link>
    <Link href="/auth/signup" passHref>
      <Button>
        <UserPlus className="w-4 h-4 mr-2" />
        Sign Up
      </Button>
    </Link>
  </>
);

const ClientLinks = () => (
    <>
      <NavLink href="/maids">Find a Maid</NavLink>
      <NavLink href="/client/my-bookings">My Bookings</NavLink>
    </>
  );

const MaidLinks = () => (
    <>
        <NavLink href="/maid/dashboard">Dashboard</NavLink>
        <NavLink href="/maid/notifications">Notifications</NavLink>
    </>
);

export function AppHeader() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const renderLinks = () => {
    switch (role) {
      case 'client':
        return <ClientLinks />;
      case 'maid':
        return <MaidLinks />;
      default:
        return null;
    }
  };

  const renderAuth = () => {
      if (role) {
          return (
            <Link href="/" passHref>
                <Button variant="outline">Logout</Button>
            </Link>
          )
      }
      return <AuthLinks />
  }

  const CommonLinks = () => (
    <>
        <NavLink href="/about">About Us</NavLink>
        <NavLink href="/faq">FAQ</NavLink>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href={role ? `/?role=${role}`: '/'} className="mr-6 flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold">MaidLink</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {renderLinks()}
            <CommonLinks />
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            {renderAuth()}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {renderLinks()}
                <CommonLinks />
                <div className="mt-4 pt-4 border-t">
                  {renderAuth()}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
