import { Header } from '@/components/page/header';
import { HeroSection } from '@/components/page/hero-section';
import { LevelsSection } from '@/components/page/levels-section';
import { GameplaySection } from '@/components/page/gameplay-section';
import { HallOfFameSection } from '@/components/page/hall-of-fame-section';
import { Footer } from '@/components/page/footer';
import { PlayerProvider } from '@/context/player-context';

export default function Home() {
  return (
    <PlayerProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <LevelsSection />
          <GameplaySection />
          <HallOfFameSection />
        </main>
        <Footer />
      </div>
    </PlayerProvider>
  );
}
