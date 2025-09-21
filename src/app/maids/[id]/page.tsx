import { getMaidById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, HandCoins, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BookingForm from "@/components/booking-form";
import { formatCurrency } from "@/lib/utils";

export default function MaidDetailPage({ params }: { params: { id: string } }) {
  const maid = getMaidById(params.id);

  if (!maid) {
    notFound();
  }
  
  const getImageHint = (id: string) => {
    switch (id) {
        case '1': return 'woman cooking';
        case '2': return 'woman cleaning';
        case '3': return 'woman sweeping';
        default: return 'indian woman';
    }
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                src={maid.image_url}
                alt={`Profile of ${maid.name}`}
                width={300}
                height={300}
                className="w-full aspect-square rounded-lg object-cover shadow-lg"
                data-ai-hint={getImageHint(maid.id)}
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold">{maid.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{maid.rating.toFixed(1)}</span>
                </div>
                {maid.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-semibold">Verified</span>
                  </div>
                )}
                 <div className="flex items-center gap-1">
                  <IndianRupee className="w-5 h-5" />
                  <span className="font-semibold">{formatCurrency(maid.monthly_rate, false)}/month</span>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">{maid.description}</p>
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {maid.services.map((service) => (
                    <Badge key={service} variant="outline" className="text-sm capitalize">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div>
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <p className="text-muted-foreground">Reviews are coming soon.</p>
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Book {maid.name}</CardTitle>
              <p className="text-sm text-muted-foreground pt-1">Get a monthly estimate for your home.</p>
            </CardHeader>
            <CardContent>
              <BookingForm maid={maid} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
