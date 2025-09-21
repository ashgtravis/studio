import { getAttendanceByBooking, getBookingById, markAttendance } from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, isBefore, startOfToday, subDays } from "date-fns";
import { Check, X } from "lucide-react";
import { revalidatePath } from "next/cache";

export default function AttendancePage({ params }: { params: { id: string } }) {
  const bookingId = params.id;
  const booking = getBookingById(bookingId);
  const attendance = getAttendanceByBooking(bookingId);

  if (!booking || !booking.maid) {
    notFound();
  }
  
  const today = startOfToday();
  const attendanceDates = new Set(attendance.map(a => format(new Date(a.date), 'yyyy-MM-dd')));

  async function handleMarkAttendance(status: 'present' | 'absent') {
    "use server";
    markAttendance({
        bookingId: bookingId,
        maidId: booking.maid_id,
        clientId: booking.user_phone,
        date: today.toISOString().split('T')[0],
        status,
    });
    revalidatePath(`/client/attendance/${bookingId}`);
  }

  const isTodayMarked = attendanceDates.has(format(today, 'yyyy-MM-dd'));
  const canMarkToday = isBefore(new Date(booking.date), addDays(today, 1));

  return (
    <div className="container py-8 md:py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Attendance for {booking.maid.name}</CardTitle>
          <CardDescription>
            Booking Date: {format(new Date(booking.date), "PPP")}
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 w-full">
                    <h3 className="text-lg font-semibold mb-2 text-center">Attendance Log</h3>
                    <Calendar
                        mode="multiple"
                        selected={attendance.map(a => new Date(a.date))}
                        month={subDays(today, 1)}
                        className="rounded-md border p-0 w-full"
                        disabled
                    />
                    <p className="text-xs text-muted-foreground text-center mt-2">Green indicates a 'present' day.</p>
                </div>
                <div className="flex-1 w-full space-y-4">
                    <h3 className="text-lg font-semibold mb-2">Mark Today's Attendance</h3>
                    <p className="text-sm text-muted-foreground">
                        Date: {format(today, 'PPP')}
                    </p>
                    {canMarkToday ? (
                        isTodayMarked ? (
                            <p className="p-4 bg-secondary rounded-md text-center text-sm font-medium">
                                Attendance for today has already been marked.
                            </p>
                        ) : (
                        <div className="flex gap-4">
                            <form action={handleMarkAttendance.bind(null, 'present')} className="w-full">
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    <Check className="mr-2 h-4 w-4" /> Present
                                </Button>
                            </form>
                             <form action={handleMarkAttendance.bind(null, 'absent')} className="w-full">
                                <Button className="w-full" variant="destructive">
                                    <X className="mr-2 h-4 w-4" /> Absent
                                </Button>
                            </form>
                        </div>
                        )
                    ) : (
                         <p className="p-4 bg-secondary rounded-md text-center text-sm font-medium">
                            You can only mark attendance after the booking starts.
                        </p>
                    )}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
