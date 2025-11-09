import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-fade-in-up">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-glow animate-neon-flicker">
          Prompt Injection
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
          Outsmart the AI. Outplay your opponent.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="font-bold border-2 border-primary bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 backdrop-blur-sm animate-pulse-glow">
            <Link href="/signup">Start the Game</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 backdrop-blur-sm">
            <Link href="#how-it-works">Learn How to Play</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
