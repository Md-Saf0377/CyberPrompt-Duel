
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Section } from './section';
import { usePlayer } from '@/context/player-context';
import { Trophy } from 'lucide-react';

export function HallOfFameSection() {
  const { champions } = usePlayer();

  return (
    <Section>
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-glow">Hall of Fame</h2>
        <p className="mt-2 text-lg text-foreground/80">Champions who have conquered the duel.</p>
      </div>
      <div className="rounded-xl border-2 border-primary/30 bg-card/50 p-2 backdrop-blur-sm opacity-0 animate-fade-in-up shadow-2xl shadow-primary/10">
        {champions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-b-primary/30 hover:bg-transparent">
                <TableHead className="w-[100px] font-headline text-primary">Rank</TableHead>
                <TableHead className="font-headline text-primary">Champion</TableHead>
                <TableHead className="text-right font-headline text-primary">Date Achieved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {champions.map((player, index) => (
                <TableRow key={index} className="border-primary/20 hover:bg-primary/10">
                  <TableCell className="font-medium text-xl font-headline text-glow">{index + 1}</TableCell>
                  <TableCell className="text-lg font-bold">{player.name}</TableCell>
                  <TableCell className="text-right font-mono text-sm text-accent text-glow-accent">{player.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center text-foreground/70">
              <Trophy className="h-16 w-16 mb-4 text-primary/50" />
              <h3 className="font-headline text-2xl text-glow">The Hall Awaits</h3>
              <p>No champions have emerged yet. Be the first to conquer all levels!</p>
          </div>
        )}
      </div>
    </Section>
  );
}
