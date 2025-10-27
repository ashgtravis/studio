import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { TEMP_API_KEY } from './temp-key';

const apiKey = TEMP_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY");
}

// Create a named model instance that we can reference later
export const geminiPro = googleAI({apiKey});

export const ai = genkit({
  plugins: [geminiPro],
});
