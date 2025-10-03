'use server';

import { contextualChatbot } from '@/ai/flows/contextual-chatbot';
import {
  mockAnnouncements,
  mockCourses,
  mockEvents,
  mockGrades,
} from '@/lib/data';

export async function handleUserMessage(message: string) {
  try {
    const result = await contextualChatbot({
      message: message,
      context: {
        courses: mockCourses,
        announcements: mockAnnouncements,
        grades: mockGrades,
        events: mockEvents,
      },
    });
    return result.response;
  } catch (error) {
    console.error('AI action failed:', error);
    return 'Sorry, I had trouble connecting to my brain. Please try again in a moment.';
  }
}
