import Link from "next/link";
import { Sparkles } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="border-t mt-auto">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Sparkles className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} MaidLink. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4 sm:ml-auto">
           <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About Us
          </Link>
           <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
            FAQ
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
