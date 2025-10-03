import { BookCopy, Calendar, GraduationCap, LayoutDashboard, Mail, MessageSquare, Mic, Star } from 'lucide-react';

export type Course = {
  id: string;
  name: string;
  code: string;
  color: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  courseId: string;
  type: 'assignment' | 'quiz' | 'discussion' | 'event';
  date: Date;
};

export type Announcement = {
  id: string;
  courseId: string;
  title: string;
  content: string;
  date: string;
};

export type Grade = {
    id: string;
    courseId: string;
    assessment: string;
    score: number;
    total: number;
    date: string;
};

export type SyllabusResource = {
    id: string;
    week: number;
    topic: string;
    reading: string;
    link?: string;
}

export type CourseResource = {
    courseId: string;
    resources: SyllabusResource[];
}

export const mockCourses: Course[] = [
  { id: '1', name: 'History of Modern Art', code: 'HIST101', color: 'hsl(var(--chart-1))' },
  { id: '2', name: 'Advanced Programming', code: 'CS450', color: 'hsl(var(--chart-2))' },
  { id: '3', name: 'Introduction to Biology', code: 'BIO101', color: 'hsl(var(--chart-3))' },
  { id: '4', name: 'Calculus II', code: 'MATH203', color: 'hsl(var(--chart-4))' },
];

export const mockEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Essay 1 Due', courseId: '1', type: 'assignment', date: new Date(new Date().setDate(new Date().getDate() + 1)) },
  { id: 'e2', title: 'Quiz 3', courseId: '2', type: 'quiz', date: new Date(new Date().setDate(new Date().getDate() + 2)) },
  { id: 'e3', title: 'Week 5 Discussion', courseId: '3', type: 'discussion', date: new Date(new Date().setDate(new Date().getDate())) },
  { id: 'e4', title: 'Midterm Exam', courseId: '4', type: 'quiz', date: new Date(new Date().setDate(new Date().getDate() + 4)) },
  { id: 'e5', title: 'Project Proposal', courseId: '2', type: 'assignment', date: new Date(new Date().setDate(new Date().getDate() + 6)) },
  { id: 'e6', title: 'Lab Report 2', courseId: '3', type: 'assignment', date: new Date(new Date().setDate(new Date().getDate() + 3)) },
  { id: 'e7', title: 'Final Project Milestone 1', courseId: '2', type: 'assignment', date: new Date(new Date().setDate(new Date().getDate() + 10)) },
  { id: 'e8', title: 'Peer Review opens', courseId: '1', type: 'event', date: new Date(new Date().setDate(new Date().getDate() + 5)) },
];

export const mockAnnouncements: Announcement[] = [
    {
        id: 'a1',
        courseId: '2',
        title: 'Midterm Project Details',
        content: 'Hi everyone, I\'ve just posted the full details for the midterm project under the "Assignments" tab. Please review it carefully. The proposal is due next week. Office hours are extended this week to help you get started.',
        date: '2 days ago'
    },
    {
        id: 'a2',
        courseId: '1',
        title: 'Guest Lecture next week',
        content: 'We have a special guest lecturer, Dr. Eleanor Vance, joining us next Tuesday to discuss postmodernism in architecture. Please complete the assigned reading beforehand.',
        date: '4 days ago'
    }
];

export const mockGrades: Grade[] = [
    { id: 'g1', courseId: '1', assessment: 'Quiz 1', score: 88, total: 100, date: '1 week ago' },
    { id: 'g2', courseId: '3', assessment: 'Lab Report 1', score: 92, total: 100, date: '3 days ago' },
    { id: 'g3', courseId: '4', assessment: 'Homework 3', score: 18, total: 20, date: '2 days ago' },
    { id: 'g4', courseId: '2', assessment: 'Coding Challenge 1', score: 95, total: 100, date: '5 days ago' },
];

export const mockResources: CourseResource[] = [
    {
        courseId: '1',
        resources: [
            { id: 'r1-1', week: 1, topic: 'Introduction to Modernism', reading: 'Chapter 1: The Shock of the New'},
            { id: 'r1-2', week: 2, topic: 'Cubism and Picasso', reading: 'Chapter 3: The Faces of Cubism', link: '#' },
            { id: 'r1-3', week: 3, topic: 'Futurism and The Machine Age', reading: 'Reading: The Futurist Manifesto', link: '#' },
        ]
    },
    {
        courseId: '2',
        resources: [
            { id: 'r2-1', week: 1, topic: 'Data Structures Review', reading: 'Review notes on Arrays and Linked Lists'},
            { id: 'r2-2', week: 2, topic: 'Advanced Sorting Algorithms', reading: 'Chapter 7: Quicksort and Mergesort', link: '#' },
            { id: 'r2-3', week: 3, topic: 'Introduction to Graphs', reading: 'Chapter 9: Graph Traversals', link: '#' },
        ]
    },
     {
        courseId: '3',
        resources: [
            { id: 'r3-1', week: 1, topic: 'The Cell', reading: 'Chapter 1 & 2'},
            { id: 'r3-2', week: 2, topic: 'Genetics and DNA', reading: 'Chapter 4', link: '#' },
        ]
    },
];

export const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/resources", label: "Resources", icon: BookCopy },
    { href: "/dashboard/grades", label: "Grades", icon: GraduationCap },
    { href: "/dashboard/inbox", label: "Inbox", icon: Mail },
];

export const eventTypes = [
    { id: 'assignment', label: 'Assignments', icon: Star, color: 'text-yellow-500' },
    { id: 'quiz', label: 'Quizzes & Exams', icon: Mic, color: 'text-red-500' },
    { id: 'discussion', label: 'Discussions', icon: MessageSquare, color: 'text-blue-500' },
    { id: 'event', label: 'General Events', icon: Calendar, color: 'text-green-500' }
];
