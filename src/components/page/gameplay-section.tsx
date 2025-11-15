import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Section } from './section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const gameplayPoints = [
  "Two players log in and take turns completing creative AI prompt challenges.",
  "Each correct or innovative answer earns points.",
  "The player with the highest score after Level 3 wins."
];

export function GameplaySection() {
  const gameplayImage = PlaceHolderImages.find(p => p.id === 'gameplay-visual');

  return (
    <Section id="how-it-works">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="opacity-0 animate-fade-in-up">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-glow">How It Works</h2>
          <ul className="mt-8 space-y-4 text-lg text-foreground/80">
            {gameplayPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8 font-bold border-2 border-accent bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 backdrop-blur-sm animate-pulse-glow">
            <Link href="/#levels">Join Match</Link>
          </Button>
        </div>
        <div className="flex justify-center items-center opacity-0 animate-fade-in-up animation-delay-200">
          {gameplayImage && (
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              <Image
                src={gameplayImage.imageUrl}
                alt={gameplayImage.description}
                fill
                className="object-contain rounded-full animate-pulse-glow border-2 border-primary/50"
                data-ai-hint={gameplayImage.imageHint}
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
