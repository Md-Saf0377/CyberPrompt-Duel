import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Shield className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold tracking-wider text-glow">
            CyberPrompt Duel
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost" className="hidden text-foreground hover:text-primary hover:bg-transparent md:block">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground animate-pulse-glow">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
