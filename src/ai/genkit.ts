import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Explicitly pass the API key from Vercel's environment variables
// to ensure it's picked up by the Genkit plugin.
const apiKey = process.env.GEMINI_API_KEY;

export const ai = genkit({
  plugins: [googleAI({apiKey})],
  model: 'googleai/gemini-2.5-flash',
});
