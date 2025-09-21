import { getMaidById, getReviewsByMaid } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, IndianRupee, Sparkles, ThumbsUp, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BookingForm from "@/components/booking-form";
import { formatCurrency, cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

const ReliabilityBadge = ({ score }: { score: number }) => {
  if (score >= 85) {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
        <Sparkles className="w-4 h-4 mr-2" />
        Excellent Reliability
      </Badge>
    );
  }
  if (score >= 70) {
    return (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
        <ThumbsUp className="w-4 h-4 mr-2" />
        Good Reliability
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
      <AlertTriangle className="w-4 h-4 mr-2" />
      Needs Improvement
    </Badge>
  );
};


export default function MaidDetailPage({ params }: { params: { id: string } }) {
  const maid = getMaidById(params.id);

  if (!maid) {
    notFound();
  }
  
  const reviews = getReviewsByMaid(maid.id);

  const getImageHint = (id: string) => {
    switch (id) {
        case '1': return 'woman cooking';
        case '2': return 'woman cleaning';
        case '3': return 'woman sweeping';
        default: return 'indian woman';
    }
  }

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );

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
            <div className="md:w-2/3 space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold">{maid.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{maid.rating.toFixed(1)}</span>
                  <span className="text-xs">({reviews.length} reviews)</span>
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

               <ReliabilityBadge score={maid.reliability_score} />

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
            <div className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="flex gap-4">
                            <Avatar>
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${review.client_id}`} />
                                <AvatarFallback>{review.client_id.slice(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                               <div className="flex justify-between items-center">
                                 <div>
                                    <p className="font-semibold">{review.client_id}</p>
                                    <p className="text-xs text-muted-foreground">{format(new Date(review.created_at), 'PPP')}</p>
                                 </div>
                                 <StarRating rating={review.rating} />
                               </div>
                                <p className="text-muted-foreground mt-2">{review.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                     <p className="text-muted-foreground">No reviews yet.</p>
                )}
            </div>
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
