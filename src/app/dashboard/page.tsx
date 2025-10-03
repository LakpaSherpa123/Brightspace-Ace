import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCourses, mockEvents, mockGrades, mockAnnouncements } from "@/lib/data";
import { cn } from "@/lib/utils";
import { format, isToday, isTomorrow } from "date-fns";
import { ArrowRight, Bell, BookOpen, Calendar, Star } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const todayEvents = mockEvents.filter(e => isToday(e.date));
    const tomorrowEvents = mockEvents.filter(e => isTomorrow(e.date));

    const getCourseById = (id: string) => mockCourses.find(c => c.id === id);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="font-headline text-3xl md:text-4xl font-semibold">Welcome back, Student!</h1>
                <p className="text-muted-foreground">Here's what's happening today.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Calendar className="h-5 w-5 text-primary" />
                           Schedule At a Glance
                        </CardTitle>
                        <CardDescription>What's on your plate for today and tomorrow.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Today</h3>
                            {todayEvents.length > 0 ? (
                                <ul className="space-y-2">
                                    {todayEvents.map(event => {
                                        const course = getCourseById(event.courseId);
                                        return (
                                            <li key={event.id} className="flex items-center gap-3 text-sm">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: course?.color }} />
                                                <span className="font-medium">{event.title}</span>
                                                <span className="text-muted-foreground">{course?.code}</span>
                                                <span className="ml-auto text-muted-foreground">{format(event.date, 'p')}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : <p className="text-sm text-muted-foreground">No events scheduled for today.</p>}
                        </div>
                         <div>
                            <h3 className="font-semibold mb-2">Tomorrow</h3>
                             {tomorrowEvents.length > 0 ? (
                                <ul className="space-y-2">
                                    {tomorrowEvents.map(event => {
                                        const course = getCourseById(event.courseId);
                                        return (
                                            <li key={event.id} className="flex items-center gap-3 text-sm">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: course?.color }} />
                                                <span className="font-medium">{event.title}</span>
                                                <span className="text-muted-foreground">{course?.code}</span>
                                                <span className="ml-auto text-muted-foreground">{format(event.date, 'p')}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : <p className="text-sm text-muted-foreground">Nothing on the agenda for tomorrow.</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/dashboard/calendar">Full Calendar <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Recent Grades
                        </CardTitle>
                         <CardDescription>Newly posted scores.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {mockGrades.slice(0, 4).map(grade => {
                                const course = getCourseById(grade.courseId);
                                const percentage = (grade.score / grade.total) * 100;
                                return (
                                    <li key={grade.id} className="text-sm">
                                        <div className="flex justify-between">
                                            <p className="font-medium truncate">{grade.assessment}</p>
                                            <p className={cn("font-semibold", percentage > 89 ? 'text-green-600' : percentage > 79 ? 'text-yellow-600' : 'text-red-600')}>
                                                {grade.score}/{grade.total}
                                            </p>
                                        </div>
                                        <p className="text-muted-foreground">{course?.name}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-accent" />
                            Latest Announcements
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockAnnouncements.map(ann => {
                             const course = getCourseById(ann.courseId);
                            return (
                                <div key={ann.id}>
                                    <div className="flex items-center gap-2 mb-1">
                                         <div className="h-2 w-2 rounded-full" style={{ backgroundColor: course?.color }} />
                                         <h4 className="font-semibold">{ann.title}</h4>
                                         <p className="text-xs text-muted-foreground ml-auto">{ann.date}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground pl-4 border-l-2 ml-1" style={{borderColor: course?.color}}>{ann.content}</p>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            My Courses
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                       {mockCourses.map(course => (
                           <div key={course.id} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                               <div className="h-8 w-8 rounded-md flex-shrink-0" style={{backgroundColor: course.color}}></div>
                               <div>
                                   <p className="font-semibold">{course.name}</p>
                                   <p className="text-sm text-muted-foreground">{course.code}</p>
                               </div>
                               <Button asChild variant="ghost" size="icon" className="ml-auto">
                                   <Link href="/dashboard/resources"><ArrowRight className="h-4 w-4" /></Link>
                               </Button>
                           </div>
                       ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
