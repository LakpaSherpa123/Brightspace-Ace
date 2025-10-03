// 'use server';
/**
 * @fileOverview Retrieves a student's grade for a specific quiz or course.
 *
 * - getGrade - A function that retrieves a student's grade for a specific quiz or course.
 * - GradeInquiryInput - The input type for the getGrade function.
 * - GradeInquiryOutput - The return type for the getGrade function.
 */

'use server';
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GradeInquiryInputSchema = z.object({
  courseName: z.string().describe('The name of the course.'),
  quizName: z.string().optional().describe('The name of the quiz (optional).'),
});
export type GradeInquiryInput = z.infer<typeof GradeInquiryInputSchema>;

const GradeInquiryOutputSchema = z.object({
  grade: z.string().describe('The grade for the specified quiz or course.'),
});
export type GradeInquiryOutput = z.infer<typeof GradeInquiryOutputSchema>;

export async function getGrade(input: GradeInquiryInput): Promise<GradeInquiryOutput> {
  return gradeInquiryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gradeInquiryPrompt',
  input: {schema: GradeInquiryInputSchema},
  output: {schema: GradeInquiryOutputSchema},
  prompt: `You are a helpful AI assistant that retrieves grades for students.

  {{#if quizName}}
  What is the grade for {{quizName}} in {{courseName}}?
  {{else}}
  What is the overall grade for {{courseName}}?
  {{/if}}
  `,
});

const gradeInquiryFlow = ai.defineFlow(
  {
    name: 'gradeInquiryFlow',
    inputSchema: GradeInquiryInputSchema,
    outputSchema: GradeInquiryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
