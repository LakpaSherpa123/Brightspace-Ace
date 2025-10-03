'use server';

/**
 * @fileOverview Provides a Genkit flow for summarizing course announcements.
 *
 * - summarizeAnnouncements - A function that summarizes announcements for a given course.
 * - SummarizeAnnouncementsInput - The input type for the summarizeAnnouncements function.
 * - SummarizeAnnouncementsOutput - The return type for the summarizeAnnouncements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAnnouncementsInputSchema = z.object({
  courseName: z.string().describe('The name of the course to summarize announcements for.'),
  announcements: z.string().describe('The announcements for the week for the course.'),
});
export type SummarizeAnnouncementsInput = z.infer<typeof SummarizeAnnouncementsInputSchema>;

const SummarizeAnnouncementsOutputSchema = z.object({
  summary: z.string().describe('A summary of the week\'s announcements for the course.'),
});
export type SummarizeAnnouncementsOutput = z.infer<typeof SummarizeAnnouncementsOutputSchema>;

export async function summarizeAnnouncements(input: SummarizeAnnouncementsInput): Promise<SummarizeAnnouncementsOutput> {
  return summarizeAnnouncementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAnnouncementsPrompt',
  input: {schema: SummarizeAnnouncementsInputSchema},
  output: {schema: SummarizeAnnouncementsOutputSchema},
  prompt: `You are an AI assistant helping students quickly catch up on important updates.

  Summarize the following announcements for the course "{{courseName}}" this week:

  {{announcements}}

  Provide a concise summary of the key information students need to know.`,
});

const summarizeAnnouncementsFlow = ai.defineFlow(
  {
    name: 'summarizeAnnouncementsFlow',
    inputSchema: SummarizeAnnouncementsInputSchema,
    outputSchema: SummarizeAnnouncementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
