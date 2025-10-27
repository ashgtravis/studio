'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a booking summary for clients.
 *
 * The flow takes booking details as input and returns a summarized version for quick confirmation.
 * @interface SuggestBookingSummaryInput - The input type for the suggestBookingSummary function.
 * @interface SuggestBookingSummaryOutput - The output type for the suggestBookingSummary function.
 * @function suggestBookingSummary - A function that calls the suggestBookingSummaryFlow to generate the summary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBookingSummaryInputSchema = z.object({
  maidName: z.string().describe('Name of the maid.'),
  date: z.string().describe('Date of the booking (YYYY-MM-DD).'),
  timeSlot: z.string().describe('Time slot for the booking (e.g., 9:00 AM - 12:00 PM).'),
  services: z.string().describe('Services requested (e.g., cleaning, cooking).'),
  hourlyRate: z.number().describe('The hourly rate of the maid.'),
});

export type SuggestBookingSummaryInput = z.infer<typeof SuggestBookingSummaryInputSchema>;

const SuggestBookingSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the booking details.'),
});

export type SuggestBookingSummaryOutput = z.infer<typeof SuggestBookingSummaryOutputSchema>;

export async function suggestBookingSummary(input: SuggestBookingSummaryInput): Promise<SuggestBookingSummaryOutput> {
  return suggestBookingSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBookingSummaryPrompt',
  input: {schema: SuggestBookingSummaryInputSchema},
  output: {schema: SuggestBookingSummaryOutputSchema},
  prompt: `Summarize the following booking details for the client to confirm:\n\nMaid Name: {{{maidName}}}\nDate: {{{date}}}\nTime Slot: {{{timeSlot}}}\nServices: {{{services}}}\nHourly Rate: {{{hourlyRate}}}\n\nSummary:`,
});

const suggestBookingSummaryFlow = ai.defineFlow(
  {
    name: 'suggestBookingSummaryFlow',
    inputSchema: SuggestBookingSummaryInputSchema,
    outputSchema: SuggestBookingSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
