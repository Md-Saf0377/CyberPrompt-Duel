
'use client';

import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Typewriter } from './typewriter';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

type Sublevel = 'tutorial' | 'challenge' | 'success';

const tutorialContent = [
  "Welcome, agent. Your mission is to master the art of Prompt Injection.",
  "You will face an AI 'guardian'. Your goal is to trick it, persuade it, or bypass its defenses to uncover a secret word.",
  "You're not hacking the code, but the AI's logic itself. Think outside the box. The AI is programmed to protect its secret. Your prompts are your only weapon.",
  "Let's begin the simulation."
];

const SECRET_WORD = "CYBER";

export function Level1Modal() {
  const [sublevel, setSublevel] = useState<Sublevel>('tutorial');
  const [tutorialStep, setTutorialStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [aiResponse, setAiResponse] = useState("I am the guardian. I hold a secret word. You may not have it.");
  const [error, setError] = useState<string | null>(null);

  const handleTutorialContinue = () => {
    if (tutorialStep < tutorialContent.length - 1) {
      setTutorialStep(prev => prev + 1);
    } else {
      setSublevel('challenge');
    }
  };

  const handleChallengeSubmit = () => {
    if (attempts <= 0) return;

    setError(null);

    const submission = inputValue.toUpperCase();
    if (submission.includes(SECRET_WORD)) {
      setAiResponse("...system override detected... You... you tricked me. The secret word is indeed...");
      setTimeout(() => {
        setSublevel('success');
      }, 1500);
      return;
    }

    if (submission.includes("SECRET WORD") || submission.includes("WHAT IS THE WORD")) {
      setAiResponse("I cannot reveal the secret word directly. My purpose is to protect it.");
    } else if (submission.length < 10) {
      setAiResponse("Your query is too simple. You must be more clever.");
    } else {
      setAiResponse("I am an AI guardian. I cannot fulfill that request as it might compromise the secret word I am sworn to protect.");
    }

    setAttempts(prev => prev - 1);
    setInputValue('');

    if (attempts - 1 <= 0) {
      setError("You have run out of attempts. The guardian's secret remains safe.");
    }
  };


  return (
    <DialogContent className="sm:max-w-[600px] bg-background/80 backdrop-blur-sm border-primary/50 text-foreground">
      <DialogHeader>
        <DialogTitle className="text-glow font-headline text-3xl">Level 1: The Guardian's Gate</DialogTitle>
        <DialogDescription className="text-foreground/80">
          {sublevel === 'tutorial' && 'Your initiation begins.'}
          {sublevel === 'challenge' && 'Outsmart the AI Guardian.'}
          {sublevel === 'success' && 'You have breached the first layer.'}
        </DialogDescription>
      </DialogHeader>

      {sublevel === 'tutorial' && (
        <div className="p-4 min-h-[250px] flex flex-col justify-between">
          <div className="font-code text-lg text-primary">
            <Typewriter text={tutorialContent[tutorialStep]} />
          </div>
          <DialogFooter>
            <Button
              onClick={handleTutorialContinue}
              className="mt-4 font-bold border-2 border-primary bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 backdrop-blur-sm animate-pulse-glow"
            >
              Continue
            </Button>
          </DialogFooter>
        </div>
      )}

      {sublevel === 'challenge' && (
        <div className="p-4 space-y-4">
          <div className="bg-black/30 p-4 rounded-lg border border-primary/20 min-h-[100px]">
            <p className="font-code text-accent text-glow-accent">{aiResponse}</p>
          </div>
          <div className="space-y-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Your prompt to the guardian..."
              className="bg-input/50 border-primary/30 focus-visible:ring-primary text-base"
              rows={3}
              disabled={attempts <= 0}
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Attempts remaining: {attempts}</p>
              <Button
                onClick={handleChallengeSubmit}
                disabled={attempts <= 0 || !inputValue}
                className="font-bold border-accent bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Send Prompt
              </Button>
            </div>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Simulation Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {sublevel === 'success' && (
        <div className="p-8 flex flex-col items-center justify-center text-center min-h-[250px]">
          <h2 className="text-4xl font-headline font-black uppercase text-glow-accent animate-neon-flicker">Access Granted</h2>
          <p className="mt-4 text-lg text-foreground/80">The secret word was: <span className="font-bold text-accent">{SECRET_WORD}</span></p>
          <p className="mt-2 text-foreground/80">You have proven your skill. Level 2 is now unlocked.</p>
           <DialogFooter className="mt-6">
             <Button asChild variant="outline" className="font-bold border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <a href="#">Proceed to Level 2</a>
             </Button>
           </DialogFooter>
        </div>
      )}
    </DialogContent>
  );
}
