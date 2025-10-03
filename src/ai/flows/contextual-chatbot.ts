'use server';

/**
 * @fileOverview A contextual chatbot flow for a student assistant AI.
 *
 * - contextualChatbot - A function that generates a response based on user message and course context.
 * - ContextualChatbotInput - The input type for the contextualChatbot function.
 * - ContextualChatbotOutput - The return type for the contextualChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  color: z.string(),
});

const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  courseId: z.string(),
  type: z.enum(['assignment', 'quiz', 'discussion', 'event']),
  date: z.date(),
});

const AnnouncementSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  title: z.string(),
  content: z.string(),
  date: z.string(),
});

const GradeSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  assessment: z.string(),
  score: z.number(),
  total: z.number(),
  date: z.string(),
});

const ContextualChatbotInputSchema = z.object({
  message: z.string().describe('The user\'s message.'),
  context: z.object({
    courses: z.array(CourseSchema),
    announcements: z.array(AnnouncementSchema),
    grades: z.array(GradeSchema),
    events: z.array(EventSchema),
  }),
});
export type ContextualChatbotInput = z.infer<
  typeof ContextualChatbotInputSchema
>;

const ContextualChatbotOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user.'),
});
export type ContextualChatbotOutput = z.infer<
  typeof ContextualChatbotOutputSchema
>;

export async function contextualChatbot(
  input: ContextualChatbotInput
): Promise<ContextualChatbotOutput> {
  return contextualChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextualChatbotPrompt',
  input: { schema: ContextualChatbotInputSchema },
  output: { schema: ContextualChatbotOutputSchema },
  prompt: `You are a helpful AI assistant for a student named "Student Ace".
It is currently {{currentDate}}.

You have access to the student's course data. Use this data to answer the user's questions.
Be friendly, concise, and helpful.

Here is the student's data:

Courses:
{{#each context.courses}}
- {{name}} ({{code}})
{{/each}}

Calendar Events:
{{#each context.events}}
- {{title}} for {{courseId}} on {{date}}
{{/each}}

Recent Grades:
{{#each context.grades}}
- {{assessment}} ({{courseId}}): {{score}}/{{total}}
{{/each}}

Announcements:
{{#each context.announcements}}
- {{title}} ({{courseId}}): {{content}}
{{/each}}

User's question: "{{message}}"

Based on the data above, provide a helpful response. If you don't have the information, say so politely.
`,
});

const contextualChatbotFlow = ai.defineFlow(
  {
    name: 'contextualChatbotFlow',
    inputSchema: ContextualChatbotInputSchema,
    outputSchema: ContextualChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      ...input,
      // @ts-ignore
      currentDate: new Date().toLocaleDateString(),
    });
    return output!;
  }
);
