import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCourses, mockResources } from "@/lib/data";
import { BookText, LinkIcon } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="font-headline text-3xl md:text-4xl font-semibold">Resource Hub</h1>
                <p className="text-muted-foreground">Key topics and reading materials from your syllabus, organized by week.</p>
            </div>

            <Card>
                <CardContent className="p-0">
                     <Accordion type="single" collapsible className="w-full">
                        {mockCourses.map(course => {
                            const courseResources = mockResources.find(r => r.courseId === course.id);
                            return (
                                <AccordionItem key={course.id} value={`item-${course.id}`}>
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="h-3 w-3 rounded-full" style={{backgroundColor: course.color}} />
                                            <span className="font-semibold text-lg">{course.name}</span>
                                            <Badge variant="outline">{course.code}</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6">
                                        {courseResources && courseResources.resources.length > 0 ? (
                                            <div className="space-y-4 border-l-2 pl-6" style={{borderColor: course.color}}>
                                                {courseResources.resources.map(resource => (
                                                    <div key={resource.id} className="relative">
                                                         <div className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full bg-background border-2" style={{borderColor: course.color}}/>
                                                        <p className="text-sm font-bold text-primary">Week {resource.week}</p>
                                                        <h4 className="font-semibold">{resource.topic}</h4>
                                                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                                            <BookText className="h-4 w-4" />
                                                            <p className="text-sm">{resource.reading}</p>
                                                            {resource.link && (
                                                                <Link href={resource.link} target="_blank" className="flex items-center gap-1 text-sm text-primary hover:underline">
                                                                    <LinkIcon className="h-3 w-3" />
                                                                    View
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground text-center py-4">Syllabus for this course has not been processed yet.</p>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
