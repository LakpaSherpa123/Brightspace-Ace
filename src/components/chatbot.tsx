'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { handleUserMessage } from '@/app/actions/chatbot';
import { ScrollArea } from './ui/scroll-area';
import { Icons } from './icons';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  role: 'user' | 'bot';
  content: string;
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { id: Date.now(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const botResponseContent = await handleUserMessage(input);
      const botMessage: Message = { id: Date.now() + 1, role: 'bot', content: botResponseContent };
      setMessages((prev) => [...prev, botMessage]);
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to bottom after new message is rendered
        setTimeout(() => {
             if (scrollAreaRef.current) {
                const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
                if (viewport) {
                    viewport.scrollTop = viewport.scrollHeight;
                }
             }
        }, 100);
    }
  }, [messages]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary/90">
          <Bot className="h-8 w-8 text-primary-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="font-headline flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Your AI Assistant
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 space-y-6">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8 border-2 border-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot size={18} />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg max-w-xs">
                <p className="text-sm">
                  Hello! How can I help you today? You can ask me about your grades or to summarize course announcements.
                </p>
              </div>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn('flex items-start gap-3', message.role === 'user' && 'justify-end')}
              >
                {message.role === 'bot' && (
                  <Avatar className="w-8 h-8 border-2 border-primary">
                     <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'p-3 rounded-lg max-w-xs whitespace-pre-wrap',
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                 {message.role === 'user' && (
                   <Avatar className="w-8 h-8">
                     <AvatarFallback>
                        <User size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isPending && (
                <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot size={18} />
                        </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg max-w-xs">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your grades..."
              className="flex-1"
              disabled={isPending}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isPending}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
