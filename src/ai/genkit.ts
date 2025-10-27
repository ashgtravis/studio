import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The API key is automatically read from the Vercel environment variables.
// No need for dotenv configuration here.

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
