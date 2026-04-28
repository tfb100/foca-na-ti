import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { AuthButton } from "./auth-button";
import { Suspense } from "react";
import { Terminal } from "lucide-react";

export function MainHeader() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/50 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-all">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight cyberpunk:text-glow">Foca na TI</span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-6 mr-4">
            <Link href="/library" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Biblioteca</Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Preços</Link>
            <Link href="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Meu Painel</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Suspense fallback={<div className="w-20 h-8 bg-muted animate-pulse rounded-full" />}>
              <AuthButton />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
