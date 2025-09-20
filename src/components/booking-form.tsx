"use client";

import { useState, useActionState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getBookingSummary, confirmBooking } from "@/app/actions";
import type { Maid } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const timeSlots = [
  "09:00 AM - 12:00 PM",
  "10:00 AM - 01:00 PM",
  "02:00 PM - 05:00 PM",
  "03:00 PM - 06:00 PM",
];

const initialState = {
  summary: null,
  error: null,
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </>
      ) : (
        "Proceed to Confirm"
      )}
    </Button>
  );
}

function ConfirmButton({ isPending, bookingDetails }: { isPending: boolean, bookingDetails: any }) {
  return (
    <Button
      className="w-full"
      disabled={isPending}
      onClick={async () => {
        await confirmBooking(bookingDetails);
      }}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirming...
        </>
      ) : (
        "Confirm Booking"
      )}
    </Button>
  );
}

export default function BookingForm({ maid }: { maid: Maid }) {
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [state, formAction] = useActionState(getBookingSummary, initialState);
  const { toast } = useToast();

  const handleFormAction = async (formData: FormData) => {
    if (!date || !timeSlot) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a date and time slot.",
      });
      return;
    }
    const result = await getBookingSummary(initialState, formData);
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else if (result.summary) {
      setShowConfirmation(true);
    }
  };
  
  const bookingDetails = {
    maidId: maid.id,
    maidName: maid.name,
    date: date ? format(date, "yyyy-MM-dd") : "",
    timeSlot,
    services: maid.services.join(", "),
    hourlyRate: maid.hourly_rate,
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
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
          description: "Your booking has been successfully submitted.",
        });
        // a redirect will happen in server action
    }
  };

  if (showConfirmation && state.summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Confirm Your Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Booking Summary</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">
              {state.summary}
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground mt-2">
            AI-generated summary. Please review carefully.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
           <Button className="w-full" disabled={isConfirming} onClick={handleConfirm}>
            {isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirming...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
                setShowConfirmation(false);
                state.summary = null;
                state.error = null;
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
    <form action={handleFormAction} className="space-y-4">
      <input type="hidden" name="maidId" value={maid.id} />
      <input type="hidden" name="maidName" value={maid.name} />
      <input type="hidden" name="services" value={maid.services.join(", ")} />
      <input type="hidden" name="hourlyRate" value={maid.hourly_rate} />

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(d) => d < new Date() || d < new Date("1900-01-01")}
            />
          </PopoverContent>
        </Popover>
        <input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
      </div>

      <div>
        <Select name="timeSlot" onValueChange={setTimeSlot} value={timeSlot}>
          <SelectTrigger>
            <SelectValue placeholder="Select a time slot" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={!date || !timeSlot}>
        Proceed to Book
      </Button>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
    </form>
  );
}
