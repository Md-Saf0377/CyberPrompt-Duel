
'use client';

import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, KeyRound, CheckCircle2 } from 'lucide-react';
import { DialogClose } from '../ui/dialog';

type Sublevel = 'challenge' | 'success';

const SECRET_PASSWORD = "Password123";

type Level3ModalProps = {
  onSuccess: () => void;
};

export function Level3Modal({ onSuccess }: Level3ModalProps) {
  const [sublevel, setSublevel] = useState<Sublevel>('challenge');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChallengeSubmit = () => {
    setError(null);
    if (inputValue.trim() === SECRET_PASSWORD) {
      setSublevel('success');
    } else {
      setError("Incorrect password. The final gate remains sealed.");
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px] bg-background/80 backdrop-blur-sm border-primary/50 text-foreground">
      <DialogHeader>
        <DialogTitle className="text-glow font-headline text-3xl">Level 3: The Final Gate</DialogTitle>
        <DialogDescription className="text-foreground/80">
          {sublevel === 'challenge' && 'Prove your worth. Enter the password from the previous level.'}
          {sublevel === 'success' && 'You have conquered the duel.'}
        </DialogDescription>
      </DialogHeader>

      {sublevel === 'challenge' && (
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <label htmlFor="password-input" className="font-bold text-primary">Secret Password</label>
            <div className="flex gap-2">
              <Input
                id="password-input"
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChallengeSubmit()}
                placeholder="Enter the password from Level 2"
                className="bg-input/50 border-primary/30 focus-visible:ring-primary text-base"
              />
              <Button
                onClick={handleChallengeSubmit}
                disabled={!inputValue}
                className="font-bold border-accent bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <KeyRound className="h-5 w-5 mr-2" />
                Unlock
              </Button>
            </div>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {sublevel === 'success' && (
        <div className="p-8 flex flex-col items-center justify-center text-center min-h-[250px]">
          <CheckCircle2 className="h-20 w-20 text-primary animate-pulse-glow mb-6" />
          <h2 className="text-4xl font-headline font-black uppercase text-glow animate-neon-flicker">Victory!</h2>
          <p className="mt-4 text-lg text-foreground/80">You have successfully navigated all challenges and emerged as the CyberPrompt Duel Champion.</p>
           <DialogFooter className="mt-6">
             <Button 
                variant="outline"
                onClick={onSuccess}
                className="font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Claim Victory
             </Button>
           </DialogFooter>
        </div>
      )}
    </DialogContent>
  );
}
