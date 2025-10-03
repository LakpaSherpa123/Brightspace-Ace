'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format, isSameDay } from 'date-fns';
import { mockCourses, mockEvents, eventTypes, CalendarEvent } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedCourses, setSelectedCourses] = useState<string[]>(mockCourses.map(c => c.id));
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>(eventTypes.map(et => et.id));

  const filteredEvents = mockEvents.filter(event => 
    selectedCourses.includes(event.courseId) && selectedEventTypes.includes(event.type)
  );

  const selectedDayEvents = date ? filteredEvents.filter(e => isSameDay(e.date, date)) : [];

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const handleEventTypeToggle = (typeId: string) => {
    setSelectedEventTypes(prev => 
      prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]
    );
  };
  
  const EventItem = ({event}: {event: CalendarEvent}) => {
    const course = mockCourses.find(c => c.id === event.courseId);
    const eventType = eventTypes.find(et => et.id === event.type);
    if (!course || !eventType) return null;

    return (
        <li className="flex gap-4 items-start py-3">
            <div className="w-12 text-right">
                <p className="font-bold text-sm">{format(event.date, 'p')}</p>
            </div>
            <div className="relative pl-4">
              <div className="absolute left-[-7px] top-1 h-4 w-4 rounded-full border-2 border-background" style={{backgroundColor: course.color}} />
              <div className="absolute left-0 top-1 h-full w-px bg-border" />
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-muted-foreground">{course.name}</p>
              <Badge variant="outline" className="mt-1">
                  <eventType.icon className={`h-3 w-3 mr-1 ${eventType.color}`} />
                  {eventType.label}
              </Badge>
            </div>
        </li>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 h-full">
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              modifiers={{
                hasEvent: filteredEvents.map(e => e.date)
              }}
              modifiersStyles={{
                hasEvent: {
                    position: 'relative',
                }
              }}
              components={{
                DayContent: (props) => {
                    const hasEvent = filteredEvents.some(e => isSameDay(e.date, props.date));
                    return (
                        <div className="relative h-full w-full flex items-center justify-center">
                            <span>{props.date.getDate()}</span>
                            {hasEvent && <div className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />}
                        </div>
                    )
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6">
        <Card>
            <CardHeader>
                <CardTitle className='font-headline'>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold mb-2 text-sm">Courses</h4>
                    <div className="space-y-2">
                        {mockCourses.map(course => (
                            <div key={course.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`course-${course.id}`} 
                                  checked={selectedCourses.includes(course.id)} 
                                  onCheckedChange={() => handleCourseToggle(course.id)}
                                  style={{borderColor: course.color, backgroundColor: selectedCourses.includes(course.id) ? course.color : 'transparent'}}
                                />
                                <Label htmlFor={`course-${course.id}`} className="text-sm">{course.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2 text-sm">Event Type</h4>
                    <div className="space-y-2">
                        {eventTypes.map(type => (
                            <div key={type.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`type-${type.id}`} 
                                  checked={selectedEventTypes.includes(type.id)}
                                  onCheckedChange={() => handleEventTypeToggle(type.id)}
                                />
                                <Label htmlFor={`type-${type.id}`} className="text-sm">{type.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className='font-headline'>
              Agenda for {date ? format(date, 'MMMM do') : 'Today'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayEvents.length > 0 ? (
                <ul>
                    {selectedDayEvents.sort((a,b) => a.date.getTime() - b.date.getTime()).map(event => (
                        <EventItem key={event.id} event={event} />
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground text-sm text-center py-8">No events for this day.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
