import { config } from 'dotenv';
config();

import '@/ai/flows/evaluate-prompt-submission.ts';
import '@/ai/flows/generate-prompt-injection-challenges.ts';
import '@/ai/flows/level-2-challenge.ts';
