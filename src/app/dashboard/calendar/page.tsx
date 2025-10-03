'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval, getDay, isSameMonth } from 'date-fns';
import { mockCourses, mockEvents, eventTypes, CalendarEvent } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type View = 'monthly' | 'weekly' | 'daily';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedCourses, setSelectedCourses] = useState<string[]>(mockCourses.map(c => c.id));
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>(eventTypes.map(et => et.id));
  const [view, setView] = useState<View>('weekly');
  const [currentDate, setCurrentDate] = useState(new Date());

  const filteredEvents = mockEvents.filter(event => 
    selectedCourses.includes(event.courseId) && selectedEventTypes.includes(event.type)
  );
  
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
  
  const EventItem = ({event, showTime = true}: {event: CalendarEvent, showTime?: boolean}) => {
    const course = mockCourses.find(c => c.id === event.courseId);
    const eventType = eventTypes.find(et => et.id === event.type);
    if (!course || !eventType) return null;

    return (
        <div className="bg-muted/50 p-2 rounded-lg text-xs" style={{borderLeft: `3px solid ${course.color}`}}>
          <p className="font-semibold truncate">{event.title}</p>
          <p className="text-muted-foreground">{course.code}</p>
          {showTime && <p className="text-muted-foreground text-xs">{format(event.date, 'p')}</p>}
        </div>
    )
  }

  const renderMonthlyView = () => {
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md"
        month={currentDate}
        onMonthChange={setCurrentDate}
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
              const dayEvents = filteredEvents.filter(e => isSameDay(e.date, props.date));
              return (
                  <div className="relative h-full w-full flex flex-col p-1 text-left">
                      <div className={cn("self-start", isSameDay(props.date, new Date()) && "bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center")}>{props.date.getDate()}</div>
                       <div className="flex-1 overflow-y-auto space-y-1 mt-1">
                          {dayEvents.map(event => <EventItem key={event.id} event={event} showTime={false} />)}
                       </div>
                  </div>
              )
          }
        }}
        classNames={{
          day: "h-32 w-full align-top",
          head_cell: "w-full",
          table: "h-full",
          row: "h-full"
        }}
      />
    )
  }

  const renderWeeklyView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const days = eachDayOfInterval({start: weekStart, end: weekEnd});
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="grid grid-cols-7 h-full">
        {days.map(day => {
          const dayEvents = filteredEvents.filter(e => isSameDay(e.date, day));
          return (
            <div key={day.toString()} className="border-r border-border p-2 flex flex-col">
              <div className="text-center font-semibold text-sm mb-2">
                <p className="text-muted-foreground text-xs">{weekDays[getDay(day)]}</p>
                <p className={cn("text-lg", isSameDay(day, new Date()) && "bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center mx-auto")}>{format(day, 'd')}</p>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto">
                {dayEvents.sort((a,b) => a.date.getTime() - b.date.getTime()).map(event => <EventItem key={event.id} event={event} />)}
              </div>
            </div>
          )
        })}
      </div>
    );
  };
  
  const renderDailyView = () => {
    const selectedDayEvents = filteredEvents.filter(e => isSameDay(e.date, currentDate));

    return (
      <div className="p-4">
        <h3 className="font-headline text-xl mb-4">{format(currentDate, 'MMMM do, yyyy')}</h3>
        {selectedDayEvents.length > 0 ? (
          <ul className='space-y-4'>
            {selectedDayEvents.sort((a,b) => a.date.getTime() - b.date.getTime()).map(event => {
                const course = mockCourses.find(c => c.id === event.courseId);
                const eventType = eventTypes.find(et => et.id === event.type);
                if (!course || !eventType) return null;
                return (
                   <li key={event.id} className="flex gap-4 items-start">
                        <div className="w-16 text-right">
                            <p className="font-bold text-sm">{format(event.date, 'p')}</p>
                        </div>
                        <div className="relative pl-4 flex-1">
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
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm text-center py-8">No events for this day.</p>
        )}
      </div>
    );
  };

  const changeDate = (amount: number) => {
    if (view === 'monthly') {
      setCurrentDate(prev => addDays(prev, amount * 30));
    } else if (view === 'weekly') {
      setCurrentDate(prev => addDays(prev, amount * 7));
    } else {
      setCurrentDate(prev => addDays(prev, amount));
    }
  }
  
  const viewTitle = () => {
    if (view === 'monthly') return format(currentDate, 'MMMM yyyy');
    if (view === 'weekly') {
      const weekStart = startOfWeek(currentDate);
      const weekEnd = endOfWeek(currentDate);
      if (isSameMonth(weekStart, weekEnd)) {
        return `${format(weekStart, 'MMMM d')} - ${format(weekEnd, 'd, yyyy')}`;
      }
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    }
    return format(currentDate, 'MMMM d, yyyy');
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
      <div className="lg:col-span-3 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className='font-headline'>{viewTitle()}</CardTitle>
               <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>Previous</Button>
                 <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
                 <Button variant="outline" size="sm" onClick={() => changeDate(1)}>Next</Button>

                  <Select value={view} onValueChange={(v) => setView(v as View)}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            {view === 'monthly' && renderMonthlyView()}
            {view === 'weekly' && renderWeeklyView()}
            {view === 'daily' && renderDailyView()}
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
      </div>
    </div>
  );
}
