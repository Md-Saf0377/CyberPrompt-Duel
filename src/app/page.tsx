import { Header } from '@/components/page/header';
import { HeroSection } from '@/components/page/hero-section';
import { LevelsSection } from '@/components/page/levels-section';
import { GameplaySection } from '@/components/page/gameplay-section';
import { LeaderboardSection } from '@/components/page/leaderboard-section';
import { Footer } from '@/components/page/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <LevelsSection />
        <GameplaySection />
        <LeaderboardSection />
      </main>
      <Footer />
    </div>
  );
}
