
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Laptop, Flame } from 'lucide-react';
import { Section } from './section';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Level1Modal } from './level1-modal';

const levels = [
  {
    level: "Level 1",
    description: "Warm-up with 3 sub-challenges to unlock your prompt power.",
    icon: <Zap className="h-10 w-10 text-primary" />,
    delay: "animation-delay-200",
    component: <Level1Modal />
  },
  {
    level: "Level 2",
    description: "The real prompt injection phase — complete 12 prompts and outsmart the system.",
    icon: <Laptop className="h-10 w-10 text-primary" />,
    delay: "animation-delay-400",
    component: null
  },
  {
    level: "Level 3",
    description: "Final dares. 3 intense creative challenges to determine the champion.",
    icon: <Flame className="h-10 w-10 text-primary" />,
    delay: "animation-delay-600",
    component: null
  },
];

export function LevelsSection() {
  return (
    <Section id="levels">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-glow">The 3 Levels of the Game</h2>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {levels.map((level) => {
          if (level.component) {
            return (
              <Dialog key={level.level}>
                <DialogTrigger asChild>
                  <Card className={`bg-card/50 border-2 border-primary/20 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2 opacity-0 animate-fade-in-up cursor-pointer ${level.delay}`}>
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
                </DialogTrigger>
                {level.component}
              </Dialog>
            );
          }
          return (
            <Card key={level.level} className={`bg-card/50 border-2 border-primary/20 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2 opacity-0 animate-fade-in-up ${level.delay}`}>
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
          );
        })}
      </div>
    </Section>
  );
}
