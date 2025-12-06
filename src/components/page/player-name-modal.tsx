
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import { usePlayer } from '@/context/player-context';

export function PlayerNameModal() {
  const { playerName, setPlayerName } = usePlayer();
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(!playerName);

  const handleSubmit = () => {
    if (name.trim()) {
      setPlayerName(name.trim());
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-sm border-primary/50 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-glow font-headline text-3xl">Enter the Arena</DialogTitle>
          <DialogDescription>
            What name shall be etched into the Hall of Fame?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Your player name..."
              className="bg-input/50 border-primary/30 focus-visible:ring-primary text-base"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="font-bold border-primary bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Begin Challenge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
