
import Link from 'next/link';
import { Github, MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-black/30 backdrop-blur-sm mt-24">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-6 px-4 md:px-6 text-sm text-primary">
        <p className="text-foreground/70">© 2025 Made by Safwan and Dushyant | Designed for Community Day</p>
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <Link href="#" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors" prefetch={false}>
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors" prefetch={false}>
            <MessageSquare className="h-5 w-5" />
            <span>Discord</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
