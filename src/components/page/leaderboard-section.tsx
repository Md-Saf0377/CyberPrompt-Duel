import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Section } from './section';

const leaderboardData = [
  { rank: 1, name: 'VoidWalker', score: 9850 },
  { rank: 2, name: 'GlitchMaster', score: 9780 },
  { rank: 3, name: 'Cipher', score: 9500 },
  { rank: 4, name: 'NeonSamurai', score: 9210 },
  { rank: 5, name: 'DataWraith', score: 8900 },
  { rank: 6, name: 'SyntaxShadow', score: 8750 },
  { rank: 7, name: 'BinaryBard', score: 8600 },
];

export function LeaderboardSection() {
  return (
    <Section>
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-glow">Leaderboard</h2>
        <p className="mt-2 text-lg text-foreground/80">Track real-time scores and rankings</p>
      </div>
      <div className="rounded-xl border-2 border-primary/30 bg-card/50 p-2 backdrop-blur-sm opacity-0 animate-fade-in-up shadow-2xl shadow-primary/10">
        <Table>
          <TableHeader>
            <TableRow className="border-b-primary/30 hover:bg-transparent">
              <TableHead className="w-[100px] font-headline text-primary">Rank</TableHead>
              <TableHead className="font-headline text-primary">Player</TableHead>
              <TableHead className="text-right font-headline text-primary">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((player) => (
              <TableRow key={player.rank} className="border-primary/20 hover:bg-primary/10">
                <TableCell className="font-medium text-xl font-headline text-glow">{player.rank}</TableCell>
                <TableCell className="text-lg font-bold">{player.name}</TableCell>
                <TableCell className="text-right font-mono text-lg text-accent text-glow-accent">{player.score.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
}
