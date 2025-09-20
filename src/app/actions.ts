"use server";

import { z } from "zod";
import { estimateMonthlyPrice, type EstimateMonthlyPriceInput } from "@/ai/flows/estimate-monthly-price";
import { createBooking } from "@/lib/data";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  maidId: z.string(),
  maidName: z.string(),
  maidBaseRate: z.string().transform(Number),
  homeBhk: z.string().min(1, "Home size (BHK) is required."),
  homeSqFt: z.string().min(1, "Home area (sq ft) is required."),
  services: z.string().min(1, "Please select at least one service."),
});

type PriceEstimateState = {
  estimatedPrice: number | null;
  priceBreakdown: string | null;
  error: string | null;
  formData: any | null;
};

export async function getPriceEstimate(
  prevState: PriceEstimateState,
  formData: FormData
): Promise<PriceEstimateState> {
  try {
    const validatedFields = FormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        const errorMessages = validatedFields.error.errors.map(e => e.message).join(', ');
        return {
            estimatedPrice: null,
            priceBreakdown: null,
            error: `Invalid data: ${errorMessages}`,
            formData: null,
        };
    }

    const { maidName, maidBaseRate, homeBhk, homeSqFt, services } = validatedFields.data;

    const serviceList = services.split(',');

    const aiInput: EstimateMonthlyPriceInput = {
      maidName,
      maidBaseRate,
      homeBhk,
      homeSqFt,
      services: serviceList
    };

    const result = await estimateMonthlyPrice(aiInput);

    return {
      estimatedPrice: result.estimatedPrice,
      priceBreakdown: result.priceBreakdown,
      error: null,
      formData: validatedFields.data,
    };
  } catch (error) {
    console.error("Error generating price estimate:", error);
    return {
      estimatedPrice: null,
      priceBreakdown: null,
      error: "Failed to generate price estimate. Please try again.",
      formData: null,
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
