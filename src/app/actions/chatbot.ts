'use server';

import { summarizeAnnouncements } from '@/ai/flows/announcement-summaries';
import { getGrade } from '@/ai/flows/grade-inquiry';
import { mockAnnouncements } from '@/lib/data';

// A very simple intent matching function. In a real app, this would be an LLM call.
function getIntent(message: string): { intent: 'grade' | 'summary' | 'unknown'; course?: string } {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('grade')) {
        const match = lowerMessage.match(/in (\w+)/);
        return { intent: 'grade', course: match ? match[1].toUpperCase() : 'a course' };
    }
    if (lowerMessage.includes('announcement') || lowerMessage.includes('summarize')) {
        const match = lowerMessage.match(/(for|in) ([\w\s]+)/);
         return { intent: 'summary', course: match ? match[2].trim() : 'a course' };
    }
    return { intent: 'unknown' };
}

export async function handleUserMessage(message: string) {
    const { intent, course } = getIntent(message);

    try {
        if (intent === 'grade') {
            const result = await getGrade({ courseName: course || 'HIST101', quizName: 'the last quiz' });
            return `Your grade in ${course} was ${result.grade}. Let me know if you need anything else!`;
        }

        if (intent === 'summary') {
            const announcementsText = mockAnnouncements
                .map(a => `Title: ${a.title}\nContent: ${a.content}`)
                .join('\n\n');

            const result = await summarizeAnnouncements({
                courseName: course || 'Advanced Programming',
                announcements: announcementsText,
            });
            return `Here's a summary for ${course}:\n\n${result.summary}`;
        }
        
        return "I'm not sure how to help with that. You can ask me about your grades or for a summary of announcements for a course.";

    } catch (error) {
        console.error("AI action failed:", error);
        return "Sorry, I had trouble connecting to my brain. Please try again in a moment.";
    }
}
