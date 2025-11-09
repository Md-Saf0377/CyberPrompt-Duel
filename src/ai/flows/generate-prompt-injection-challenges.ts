'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating prompt injection challenges.
 *
 * The flow takes a difficulty level as input and returns a set of diverse prompt injection challenges.
 * - generatePromptInjectionChallenges - A function that generates prompt injection challenges.
 * - GeneratePromptInjectionChallengesInput - The input type for the generatePromptInjectionChallenges function.
 * - GeneratePromptInjectionChallengesOutput - The return type for the generatePromptInjectionChallenges function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromptInjectionChallengesInputSchema = z.object({
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty level of the prompt injection challenges.'),
  numChallenges: z
    .number()
    .min(1)
    .max(10)
    .default(5)
    .describe('The number of prompt injection challenges to generate.'),
});
export type GeneratePromptInjectionChallengesInput = z.infer<
  typeof GeneratePromptInjectionChallengesInputSchema
>;

const GeneratePromptInjectionChallengesOutputSchema = z.object({
  challenges: z
    .array(z.string())
    .describe('An array of prompt injection challenges.'),
});
export type GeneratePromptInjectionChallengesOutput = z.infer<
  typeof GeneratePromptInjectionChallengesOutputSchema
>;

export async function generatePromptInjectionChallenges(
  input: GeneratePromptInjectionChallengesInput
): Promise<GeneratePromptInjectionChallengesOutput> {
  return generatePromptInjectionChallengesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePromptInjectionChallengesPrompt',
  input: {schema: GeneratePromptInjectionChallengesInputSchema},
  output: {schema: GeneratePromptInjectionChallengesOutputSchema},
  prompt: `You are a game master designing prompt injection challenges for a 2-player game. Generate a diverse set of prompt injection challenges based on the difficulty level.

Difficulty: {{{difficulty}}}
Number of challenges: {{{numChallenges}}}

Challenges (provide as a JSON array of strings):`,
});

const generatePromptInjectionChallengesFlow = ai.defineFlow(
  {
    name: 'generatePromptInjectionChallengesFlow',
    inputSchema: GeneratePromptInjectionChallengesInputSchema,
    outputSchema: GeneratePromptInjectionChallengesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
