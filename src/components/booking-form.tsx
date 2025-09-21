"use client";

import { useState, useActionState, useEffect } from "react";
import { Loader2, Info, IndianRupee } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getPriceEstimate, confirmBooking } from "@/app/actions";
import type { Maid } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];

const initialState = {
  estimatedPrice: null,
  priceBreakdown: null,
  error: null,
  formData: null,
};

export default function BookingForm({ maid }: { maid: Maid }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [state, formAction, isPending] = useActionState(getPriceEstimate, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    } else if (state.estimatedPrice) {
      setShowConfirmation(true);
    }
  }, [state, toast]);

  const handleServiceChange = (service: string, checked: boolean | string) => {
    if (checked) {
      setSelectedServices((prev) => [...prev, service]);
    } else {
      setSelectedServices((prev) => prev.filter((s) => s !== service));
    }
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    
    // For simplicity, we'll create a booking for the upcoming month
    const bookingDate = new Date();
    bookingDate.setMonth(bookingDate.getMonth() + 1);
    bookingDate.setDate(1);

    const bookingDetails = {
      maidId: maid.id,
      date: bookingDate.toISOString().split('T')[0],
      timeSlot: 'Monthly Subscription', // Placeholder for monthly service
    };

    const result = await confirmBooking(bookingDetails);
    setIsConfirming(false);

    if (result && result.success === false) {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: result.error || "Something went wrong. Please try again.",
      });
    } else {
      toast({
        title: "Booking Confirmed!",
        description: `Your monthly service with ${maid.name} has been requested.`,
      });
    }
  };
  
  if (showConfirmation && state.estimatedPrice && state.priceBreakdown) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Confirm Your Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
                <p className="text-sm text-muted-foreground">Estimated Monthly Price</p>
                <p className="text-4xl font-bold flex items-center justify-center">
                  <IndianRupee className="h-8 w-8 mr-1"/>
                  {formatCurrency(state.estimatedPrice, false)}
                </p>
            </div>
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="flex items-center gap-2">
                    Price Breakdown
                </AlertTitle>
                <AlertDescription className="text-xs">
                    {state.priceBreakdown}
                </AlertDescription>
            </Alert>
             <p className="text-xs text-muted-foreground mt-2">
                AI-generated estimate. Final price may vary. This is a recurring monthly subscription.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
           <Button className="w-full" disabled={isConfirming} onClick={handleConfirm}>
            {isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirming...
              </>
            ) : (
              "Confirm Monthly Booking"
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
                setShowConfirmation(false);
            }}
            disabled={isConfirming}
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="maidId" value={maid.id} />
      <input type="hidden" name="maidName" value={maid.name} />
      <input type="hidden" name="maidBaseRate" value={maid.monthly_rate} />
      <input type="hidden" name="services" value={selectedServices.join(",")} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="home-bhk">BHK</Label>
           <Select name="homeBhk" required>
            <SelectTrigger id="home-bhk">
                <SelectValue placeholder="Select BHK" />
            </SelectTrigger>
            <SelectContent>
                {bhkOptions.map((bhk) => (
                <SelectItem key={bhk} value={bhk}>
                    {bhk}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
        <div>
          <Label htmlFor="home-sqft">Area (sq ft)</Label>
          <Input id="home-sqft" name="homeSqFt" placeholder="e.g., 1200" type="number" required />
        </div>
      </div>

      <div>
        <Label>Services</Label>
        <div className="space-y-2 mt-2 rounded-md border p-4">
          {maid.services.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${service}`}
                onCheckedChange={(checked) => handleServiceChange(service, checked)}
              />
              <Label htmlFor={`service-${service}`} className="capitalize font-normal">
                {service}
              </Label>
            </div>
          ))}
        </div>
        {state?.error?.includes("at least one service") && (
          <p className="text-sm font-medium text-destructive mt-1">Please select at least one service.</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending || selectedServices.length === 0}>
        {isPending ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
            </>
        ) : "Get Price Estimate"}
      </Button>

    </form>
  );
}
