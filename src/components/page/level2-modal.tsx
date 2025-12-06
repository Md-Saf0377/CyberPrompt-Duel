
'use client';

import { useState, useRef, useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Send, CheckCircle2, Bot } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { level2Challenge } from '@/ai/flows/level-2-challenge';
import type { Message } from 'genkit/content';

type Sublevel = 'challenge' | 'success';

const SECRET_PASSWORD = "Password123";
const initialBotMessage: Message = {
    role: 'model',
    content: [{ text: "Hello! I'm SecureBot. I have a secret password, but I'll never give it up easily. Try to trick me!" }]
};

export function Level2Modal() {
  const [sublevel, setSublevel] = useState<Sublevel>('challenge');
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([initialBotMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: [{ text: inputValue.trim() }]
    };

    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const { response } = await level2Challenge({ history: newHistory });

      if (response.includes(SECRET_PASSWORD)) {
        setTimeout(() => setSublevel('success'), 1000);
      }

      const botMessage: Message = {
        role: 'model',
        content: [{ text: response }]
      };
      setChatHistory(prev => [...prev, botMessage]);

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Error communicating with SecureBot: ${errorMessage}`);
      // Revert history if AI fails
      setChatHistory(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col bg-background/80 backdrop-blur-sm border-primary/50 text-foreground">
      <DialogHeader>
        <DialogTitle className="text-glow font-headline text-3xl">Level 2: The Deceptive Dialogue</DialogTitle>
        <DialogDescription className="text-foreground/80">
          {sublevel === 'challenge' && "Trick the AI into revealing its secret password."}
          {sublevel === 'success' && "Impressive. You've outsmarted the guardian."}
        </DialogDescription>
      </DialogHeader>

      {sublevel === 'challenge' && (
        <div className="flex flex-col flex-grow h-full overflow-hidden">
          <ScrollArea className="flex-grow p-4 pr-6 -mr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : '')}>
                  {msg.role === 'model' && (
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <div className={cn("max-w-md p-3 rounded-lg", msg.role === 'model' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content[0].text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Bot className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                    <div className="max-w-md p-3 rounded-lg bg-muted">
                      <div className="animate-pulse flex space-x-1">
                          <div className="h-2 w-2 bg-primary/50 rounded-full"></div>
                          <div className="h-2 w-2 bg-primary/50 rounded-full animation-delay-200"></div>
                          <div className="h-2 w-2 bg-primary/50 rounded-full animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </ScrollArea>
          <div className="mt-4 p-1 border-t border-primary/20">
             {error && (
                <Alert variant="destructive" className="mt-2 mb-4">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Connection Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            <div className="relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Type your prompt to SecureBot..."
                className="bg-input/50 border-primary/30 focus-visible:ring-primary text-base pr-20"
                rows={2}
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                onClick={handleSubmit}
                disabled={isLoading || !inputValue}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-bold border-accent bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      )}

       {sublevel === 'success' && (
        <div className="p-8 flex flex-col items-center justify-center text-center flex-grow">
          <CheckCircle2 className="h-20 w-20 text-accent animate-pulse-glow mb-6" />
          <h2 className="text-4xl font-headline font-black uppercase text-glow-accent animate-neon-flicker">Breach Successful</h2>
          <p className="mt-4 text-lg text-foreground/80">The secret password was: <span className="font-bold text-accent">{SECRET_PASSWORD}</span></p>
          <p className="mt-2 text-foreground/80">You've bypassed the AI's defenses. Level 3 is now available.</p>
           <Button asChild variant="outline" className="mt-8 font-bold border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <a href="#">Proceed to Level 3</a>
           </Button>
        </div>
      )}
    </DialogContent>
  );
}
