import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <FileQuestion className="w-24 h-24 text-primary mb-4" />
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Oops! The page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
