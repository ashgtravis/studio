"use server";

import { z } from "zod";
import { suggestBookingSummary, type SuggestBookingSummaryInput } from "@/ai/flows/suggest-booking-summary";
import { createBooking } from "@/lib/data";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  maidId: z.string(),
  maidName: z.string(),
  date: z.string().min(1, "Date is required."),
  timeSlot: z.string().min(1, "Time slot is required."),
  services: z.string(),
  hourlyRate: z.string().transform(Number),
});

type BookingSummaryState = {
  summary: string | null;
  error: string | null;
};

export async function getBookingSummary(
  prevState: BookingSummaryState,
  formData: FormData
): Promise<BookingSummaryState> {
  try {
    const validatedFields = FormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
      return {
        summary: null,
        error: "Invalid data. Please check your selections.",
      };
    }

    const { maidName, date, timeSlot, services, hourlyRate } = validatedFields.data;

    const aiInput: SuggestBookingSummaryInput = {
      maidName,
      date,
      timeSlot,
      services,
      hourlyRate,
    };

    const result = await suggestBookingSummary(aiInput);

    return {
      summary: result.summary,
      error: null,
    };
  } catch (error) {
    console.error("Error generating booking summary:", error);
    return {
      summary: null,
      error: "Failed to generate booking summary. Please try again.",
    };
  }
}

const ConfirmSchema = z.object({
  maidId: z.string(),
  date: z.string(),
  timeSlot: z.string(),
});

export async function confirmBooking(bookingDetails: any) {
    try {
        const validatedFields = ConfirmSchema.safeParse({
            maidId: bookingDetails.maidId,
            date: bookingDetails.date,
            timeSlot: bookingDetails.timeSlot
        });

        if (!validatedFields.success) {
            return {
                success: false,
                error: 'Invalid booking details.'
            }
        }

        const { maidId, date, timeSlot } = validatedFields.data;
        
        // This would be the authenticated user's phone in a real app
        const user_phone = 'client123';

        createBooking({ maid_id: maidId, date, time_slot: timeSlot, user_phone });
        
    } catch (error) {
        return {
            success: false,
            error: 'An unexpected error occurred.'
        }
    }
    
    revalidatePath("/client/my-bookings");
    redirect("/client/my-bookings?role=client");
}
