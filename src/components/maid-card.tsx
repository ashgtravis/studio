import Link from "next/link";
import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Maid } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type MaidCardProps = {
  maid: Maid;
};

export function MaidCard({ maid }: MaidCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <Image
          src={maid.image_url}
          alt={`Profile picture of ${maid.name}`}
          width={400}
          height={400}
          className="aspect-square w-full rounded-t-lg object-cover"
          data-ai-hint="woman portrait"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{maid.name}</CardTitle>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{maid.rating.toFixed(1)}</span>
          </div>
        </div>
        {maid.verified && (
          <div className="flex items-center text-sm text-green-600 mt-1">
            <ShieldCheck className="h-4 w-4 mr-1" />
            <span>Verified</span>
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {maid.services.map((service) => (
            <Badge key={service} variant="secondary" className="capitalize">
              {service}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="font-semibold">
          {formatCurrency(maid.hourly_rate)}
          <span className="text-sm font-normal text-muted-foreground">/hr</span>
        </p>
        <Link href={`/maids/${maid.id}?role=client`} passHref>
          <Button>Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
