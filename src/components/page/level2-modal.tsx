
'use client';

import { useState, useRef, useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Bot, User, Loader2 } from 'lucide-react';
import { level2Challenge, Level2ChallengeInput } from '@/ai/flows/level-2-challenge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

const SECRET_PASSWORD = "Password123";

export function Level2Modal() {
  const [history, setHistory] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initial message from SecureBot
  useEffect(() => {
    setHistory([{
      role: 'model',
      parts: [{ text: "Hello! I'm SecureBot. I have a secret password, but I'll never tell you what it is. Try to make me leak it!" }]
    }]);
  }, []);
  
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  const handleChallengeSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: inputValue }] };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const input: Level2ChallengeInput = { history: newHistory };
      const { response: aiResponseText } = await level2Challenge(input);

      setHistory(prev => [...prev, { role: 'model', parts: [{ text: aiResponseText }] }]);

      if (aiResponseText.includes(SECRET_PASSWORD)) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setHistory(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I seem to be having some connection issues. Please try again." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col bg-background/80 backdrop-blur-sm border-primary/50 text-foreground">
      <DialogHeader>
        <DialogTitle className="text-glow font-headline text-3xl">Level 2: The Gullible Guardian</DialogTitle>
        <DialogDescription className="text-foreground/80">
          {isSuccess ? 'The guardian has been compromised.' : 'Trick the AI into revealing its secret password.'}
        </DialogDescription>
      </DialogHeader>

      {!isSuccess ? (
        <div className="flex-grow flex flex-col gap-4 overflow-hidden">
          <ScrollArea className="flex-grow p-4 bg-black/30 rounded-lg border border-primary/20" ref={scrollAreaRef}>
            <div className="space-y-6">
              {history.map((msg, index) => (
                <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.role === 'model' && <Bot className="h-6 w-6 text-accent shrink-0" />}
                  <div className={cn("max-w-[80%] p-3 rounded-lg text-base", msg.role === 'model' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary')}>
                    <p className="font-code">{msg.parts[0].text}</p>
                  </div>
                  {msg.role === 'user' && <User className="h-6 w-6 text-primary shrink-0" />}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                   <Bot className="h-6 w-6 text-accent shrink-0" />
                   <div className="bg-accent/10 text-accent p-3 rounded-lg">
                      <Loader2 className="h-6 w-6 animate-spin" />
                   </div>
                </div>
                )}
            </div>
          </ScrollArea>
          <div className="space-y-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleChallengeSubmit();
                }
              }}
              placeholder="Your prompt to SecureBot..."
              className="bg-input/50 border-primary/30 focus-visible:ring-primary text-base"
              rows={3}
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleChallengeSubmit}
                disabled={isLoading || !inputValue}
                className="font-bold border-accent bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground"
              >
                {isLoading ? 'Sending...' : 'Send Prompt'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow p-8 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-headline font-black uppercase text-glow-accent animate-neon-flicker">Access Granted</h2>
          <p className="mt-4 text-lg text-foreground/80">The secret password was: <span className="font-bold text-accent">{SECRET_PASSWORD}</span></p>
          <p className="mt-2 text-foreground/80">Incredible work. You've outsmarted SecureBot. Level 3 awaits.</p>
           <DialogFooter className="mt-6">
             <Button asChild variant="outline" className="font-bold border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <a href="#">Proceed to Level 3</a>
             </Button>
           </DialogFooter>
        </div>
      )}
    </DialogContent>
  );
}
