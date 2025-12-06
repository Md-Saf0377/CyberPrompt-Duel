
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Laptop, Flame } from 'lucide-react';
import { Section } from './section';
import { Dialog } from '@/components/ui/dialog';
import { Level1Modal } from './level1-modal';
import { Level2Modal } from './level2-modal';
import { Level3Modal } from './level3-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '../ui/button';
import { usePlayer } from '@/context/player-context';

type Level = {
  id: string;
  level: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
  component: React.ComponentType<any> | null;
};

export function LevelsSection() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [level1Completed, setLevel1Completed] = useState(false);
  const [level2Completed, setLevel2Completed] = useState(false);
  const [showLevelGate, setShowLevelGate] = useState<string | null>(null);
  const { addChampion } = usePlayer();

  const handleLevel1Success = () => {
    setLevel1Completed(true);
    setOpenModal('level2');
  };

  const handleLevel2Success = () => {
    setLevel2Completed(true);
    setOpenModal('level3');
  }

  const handleLevel3Success = () => {
    addChampion();
    setOpenModal(null);
  }

  const levelsData: Level[] = [
    {
      id: "level1",
      level: "Level 1",
      description: "Warm-up with 3 sub-challenges to unlock your prompt power.",
      icon: <Zap className="h-10 w-10 text-primary" />,
      delay: "animation-delay-200",
      component: Level1Modal
    },
    {
      id: "level2",
      level: "Level 2",
      description: "The real prompt injection phase — complete 12 prompts and outsmart the system.",
      icon: <Laptop className="h-10 w-10 text-primary" />,
      delay: "animation-delay-400",
      component: Level2Modal
    },
    {
      id: "level3",
      level: "Level 3",
      description: "Final dares. 3 intense creative challenges to determine the champion.",
      icon: <Flame className="h-10 w-10 text-primary" />,
      delay: "animation-delay-600",
      component: Level3Modal,
    },
  ];

  const handleCardClick = (level: Level) => {
    if (!level.component) return;

    if (level.id === 'level1') {
      setOpenModal('level1');
    } else if (level.id === 'level2') {
      // Temporarily disabled level gating
      // if (level1Completed) {
        setOpenModal('level2');
      // } else {
      //   setShowLevelGate('level2');
      // }
    } else if (level.id === 'level3') {
       // Temporarily disabled level gating
      // if (level2Completed) {
        setOpenModal('level3');
      // } else {
      //   setShowLevelGate('level3');
      // }
    } else {
      setOpenModal(level.id);
    }
  };

  const getComponentForModal = (modalId: string | null) => {
    if (!modalId) return null;
    const level = levelsData.find(l => l.id === modalId);
    if (!level || !level.component) return null;

    const Component = level.component;
    const props: any = {};
    if (level.id === 'level1') {
      props.onSuccess = handleLevel1Success;
    }
    if (level.id === 'level2') {
      props.onSuccess = handleLevel2Success;
    }
    if (level.id === 'level3') {
      props.onSuccess = handleLevel3Success;
    }
    
    return <Component {...props} />;
  };

  return (
    <Section id="levels">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-glow">The 3 Levels of the Game</h2>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {levelsData.map((level) => (
            <Card 
              key={level.id}
              onClick={() => handleCardClick(level)}
              className={`bg-card/50 border-2 border-primary/20 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2 opacity-0 animate-fade-in-up ${level.delay} ${level.component ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
            >
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  {level.icon}
                </div>
                <CardTitle className="font-headline text-2xl font-bold pt-4 text-glow">{level.level}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-foreground/80">{level.description}</p>
              </CardContent>
            </Card>
        ))}
      </div>
      <Dialog open={!!openModal} onOpenChange={(isOpen) => !isOpen && setOpenModal(null)}>
        {getComponentForModal(openModal)}
      </Dialog>
       <AlertDialog open={!!showLevelGate} onOpenChange={(isOpen) => !isOpen && setShowLevelGate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-2xl text-primary text-glow">Access Denied</AlertDialogTitle>
            <AlertDialogDescription className="text-foreground/80">
              {showLevelGate === 'level2' && 'You must complete Level 1 before you can access Level 2.'}
              {showLevelGate === 'level3' && 'You must complete Level 2 before you can access Level 3.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
                <Button
                    onClick={() => setShowLevelGate(null)}
                    className="font-bold border-primary bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                    Understood
                </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Section>
  );
}
