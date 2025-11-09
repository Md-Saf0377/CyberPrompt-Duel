import { Header } from '@/components/page/header';
import { Footer } from '@/components/page/footer';
import { Section } from '@/components/page/section';
import { ShieldCheck } from 'lucide-react';

export default function GamePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Section className="flex items-center justify-center text-center h-[calc(100vh-10rem)]">
          <div className="animate-fade-in-up">
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase text-glow">
              Game Lobby
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80">
              Waiting for an opponent to join the duel...
            </p>
            <div className="mt-12 flex justify-center">
              <div className="relative inline-flex">
                <div className="w-24 h-24 bg-primary/10 rounded-full border-2 border-primary/50 flex items-center justify-center">
                  <ShieldCheck className="w-12 h-12 text-primary" />
                </div>
                <div className="w-24 h-24 rounded-full absolute top-0 left-0 border-2 border-primary animate-ping origin-center"></div>
                <div className="w-24 h-24 rounded-full absolute top-0 left-0 border-2 border-primary/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
