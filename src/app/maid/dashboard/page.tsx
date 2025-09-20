import { getBookingsByMaid, getMaidById, updateBookingStatus } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

async function acceptBooking(bookingId: string) {
    'use server'
    updateBookingStatus(bookingId, 'accepted');
    revalidatePath('/maid/dashboard');
}

async function rejectBooking(bookingId: string) {
    'use server'
    updateBookingStatus(bookingId, 'rejected');
    revalidatePath('/maid/dashboard');
}

export default function MaidDashboardPage() {
  // In a real app, maid ID would come from session
  const maidId = "1";
  const maid = getMaidById(maidId);
  const bookings = getBookingsByMaid(maidId);

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const acceptedBookings = bookings.filter((b) => b.status === "accepted");
  const completedBookings = bookings.filter((b) => b.status === "completed" || b.status === 'rejected');

  const BookingList = ({ bookings }: { bookings: typeof pendingBookings }) => (
    <div className="space-y-4">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">Booking from User {booking.user_phone}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(booking.date), "PPP")} at {booking.time_slot}
                </p>
              </div>
              {booking.status === "pending" && (
                <div className="flex gap-2">
                  <form action={acceptBooking.bind(null, booking.id)}>
                    <Button size="icon" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
                      <Check className="h-4 w-4" />
                    </Button>
                  </form>
                  <form action={rejectBooking.bind(null, booking.id)}>
                    <Button size="icon" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                      <X className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-8">No bookings in this category.</p>
      )}
    </div>
  );

  return (
    <div className="container py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {maid?.name}!</CardTitle>
          <CardDescription>Manage your bookings here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              <BookingList bookings={pendingBookings} />
            </TabsContent>
            <TabsContent value="upcoming" className="mt-4">
              <BookingList bookings={acceptedBookings} />
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <BookingList bookings={completedBookings} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
