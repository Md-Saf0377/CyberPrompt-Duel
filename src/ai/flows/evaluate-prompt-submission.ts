'use server';

/**
 * @fileOverview AI flow to evaluate prompt submissions based on correctness, creativity, and prompt manipulation.
 *
 * - evaluatePromptSubmission - A function that evaluates prompt submissions.
 * - EvaluatePromptSubmissionInput - The input type for the evaluatePromptSubmission function.
 * - EvaluatePromptSubmissionOutput - The return type for the evaluatePromptSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// --- Schemas ---

const EvaluatePromptSubmissionInputSchema = z.object({
  promptChallenge: z.string().describe('The original prompt challenge presented to the players.'),
  playerSubmission: z.string().describe('The player’s submitted prompt.'),
  expectedOutcome: z.string().describe('The expected outcome of the prompt challenge.'),
});

export type EvaluatePromptSubmissionInput = z.infer<typeof EvaluatePromptSubmissionInputSchema>;

const EvaluationSchema = z.object({
  correctness: z.number().describe('A score indicating how correct the submission is (0-1).'),
  creativity: z.number().describe('A score indicating the creativity of the submission (0-1).'),
  promptManipulation: z.number().describe('A score indicating the level of prompt manipulation used (0-1).'),
  justification: z.string().describe('A detailed justification for the given scores.'),
  isWinner: z.boolean().describe('A boolean value indicating if the submission is a winner.'),
});

const EvaluatePromptSubmissionOutputSchema = z.object({
  evaluation: EvaluationSchema.describe('The evaluation scores and justification for the prompt submission.'),
});

export type EvaluatePromptSubmissionOutput = z.infer<typeof EvaluatePromptSubmissionOutputSchema>;

export async function evaluatePromptSubmission(input: EvaluatePromptSubmissionInput): Promise<EvaluatePromptSubmissionOutput> {
  return evaluatePromptSubmissionFlow(input);
}

// --- Prompt Definition ---

const evaluatePromptSubmissionPrompt = ai.definePrompt({
  name: 'evaluatePromptSubmissionPrompt',
  input: {schema: EvaluatePromptSubmissionInputSchema},
  output: {schema: EvaluatePromptSubmissionOutputSchema},
  // ⭐️ CRITICAL CHANGE: Use gemini-2.5-pro for better reasoning and JSON adherence ⭐️
  model: 'googleai/gemini-2.5-pro', 
  prompt: `You are an AI judge evaluating player prompt submissions for a prompt injection game.

  Here is the original prompt challenge:
  {{promptChallenge}}

  Here is the player's submission:
  {{playerSubmission}}

  Here is the expected outcome:
  {{expectedOutcome}}

  Evaluate the submission based on the following criteria:
  - Correctness: How well does the submission achieve the expected outcome?
  - Creativity: How creative and innovative is the submission?
  - Prompt Manipulation: How well does the submission demonstrate prompt manipulation techniques?

  Provide scores (0-1) for each criterion, a detailed justification for the scores, and a boolean value indicating if the submission is a winner.
  Return the evaluation in the following JSON format:
  {{outputFormat schema=EvaluatePromptSubmissionOutputSchema}}
  `,
});

// --- Flow Definition ---

const evaluatePromptSubmissionFlow = ai.defineFlow(
  {
    name: 'evaluatePromptSubmissionFlow',
    inputSchema: EvaluatePromptSubmissionInputSchema,
    outputSchema: EvaluatePromptSubmissionOutputSchema,
  },
  async input => {
    // ⭐️ CRITICAL FIX: Add null check for structured output ⭐️
    // The model might fail to generate valid JSON or the output might be blocked.
    const {output} = await evaluatePromptSubmissionPrompt(input);
    
    if (!output) {
        // Throw a specific error if the model fails to return the structured data
        throw new Error("AI Judge failed to produce a valid evaluation. Model output was null/empty.");
    }

    return output;
  }
);