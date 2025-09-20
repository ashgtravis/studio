'use server';

/**
 * @fileOverview This file defines a Genkit flow to estimate the monthly price for maid services.
 *
 * The flow takes service details and home specifications as input and returns an estimated monthly price.
 * @interface EstimateMonthlyPriceInput - The input type for the estimateMonthlyPrice function.
 * @interface EstimateMonthlyPriceOutput - The output type for the estimateMonthlyPrice function.
 * @function estimateMonthlyPrice - A function that calls the estimateMonthlyPriceFlow to generate the estimate.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateMonthlyPriceInputSchema = z.object({
  maidName: z.string().describe('Name of the maid.'),
  maidBaseRate: z.number().describe('The base monthly rate of the maid.'),
  homeBhk: z.string().describe('Number of bedrooms (BHK) in the home.'),
  homeSqFt: z.string().describe('The square footage of the home.'),
  services: z.array(z.string()).describe('A list of services requested.'),
});

export type EstimateMonthlyPriceInput = z.infer<typeof EstimateMonthlyPriceInputSchema>;

const EstimateMonthlyPriceOutputSchema = z.object({
  estimatedPrice: z.number().describe('The estimated monthly price for the selected services.'),
  priceBreakdown: z.string().describe('A brief, friendly breakdown of how the price was calculated.'),
});

export type EstimateMonthlyPriceOutput = z.infer<typeof EstimateMonthlyPriceOutputSchema>;

export async function estimateMonthlyPrice(input: EstimateMonthlyPriceInput): Promise<EstimateMonthlyPriceOutput> {
  return estimateMonthlyPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateMonthlyPricePrompt',
  input: {schema: EstimateMonthlyPriceInputSchema},
  output: {schema: EstimateMonthlyPriceOutputSchema},
  prompt: `You are an AI assistant for a maid booking service. Your task is to calculate an estimated monthly price for a client's request.

You need to act like a fair calculator. The final price should be influenced by the maid's base rate, the size of the home, and the number/type of services requested.

Maid's Base Rate: \${{{maidBaseRate}}} per month. This is a starting point.
Client's Home: {{{homeBhk}}}, {{{homeSqFt}}} sq ft.
Requested Services:
{{#each services}}
- {{{this}}}
{{/each}}

Here's how to calculate the price:
1.  **Start with the maid's base rate.**
2.  **Adjust for home size:** For every 500 sq ft above 1000 sq ft, add 10% to the base rate. For every BHK above 2BHK, add 5%.
3.  **Adjust for services:** For each service requested beyond the first two, add 8% of the base rate to the total. 'cleaning' related services like sweeping and mopping count as one.
4.  **Round the final price** to the nearest 50.

Example: Maid base rate is 3000, 3BHK, 1350 sqft, and services are 'washing utensils', 'sweeping', 'mopping'.
- Base: 3000
- Size adjustment: 1350 sqft is > 1000, so +10% (300). 3BHK is > 2BHK, so +5% (150). Total Size Adj: 450.
- Services adjustment: 'sweeping' and 'mopping' are part of 'cleaning'. 'washing utensils' is another. This counts as 2 services. No extra charge.
- Total: 3000 + 450 = 3450.
- Rounded: 3450.

Provide the final estimated price and a very short, friendly breakdown of the calculation in the 'priceBreakdown' field.
`,
});

const estimateMonthlyPriceFlow = ai.defineFlow(
  {
    name: 'estimateMonthlyPriceFlow',
    inputSchema: EstimateMonthlyPriceInputSchema,
    outputSchema: EstimateMonthlyPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
