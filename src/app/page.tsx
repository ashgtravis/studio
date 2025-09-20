import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMaids } from "@/lib/data";
import { ArrowRight, Star, ShieldCheck, Calendar, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MaidCard } from "@/components/maid-card";

export default function Home() {
  const topMaids = getMaids().slice(0, 3);

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary-foreground-dark">
                    Trusted Help for a Sparkling Home
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MaidLink connects you with reliable, verified maids for
                    all your household needs. Book with confidence and enjoy a
                    cleaner home today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/maids">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Find a Maid Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/hero/600/600"
                alt="Hero"
                width={600}
                height={600}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="woman cleaning"
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Finding your perfect home help is as easy as 1-2-3.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3 lg:gap-16">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">1. Browse & Select</h3>
                <p className="text-muted-foreground">
                  Explore profiles of our verified and reviewed maids.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">2. Pick a Time</h3>
                <p className="text-muted-foreground">
                  Choose a date and time slot that works for you.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">3. Book & Relax</h3>
                <p className="text-muted-foreground">
                  Confirm your booking and get ready for a sparkling clean home.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="top-maids" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Top-Rated Maids
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topMaids.map((maid) => (
                <MaidCard key={maid.id} maid={maid} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/maids">
                <Button variant="outline">
                  View All Maids <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
