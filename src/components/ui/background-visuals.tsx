"use client";

import { motion } from "framer-motion";

export function BackgroundVisuals() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Dark Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Gradient Orbs - Subtler in Light Mode */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ti-orange/10 dark:bg-ti-orange/20 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-ti-crimson/5 dark:bg-ti-crimson/10 blur-[150px] rounded-full animate-float" style={{ animationDelay: "-5s" }} />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-ti-red/10 dark:bg-ti-red/15 blur-[100px] rounded-full animate-float" style={{ animationDelay: "-10s" }} />

      {/* Radial Gradient for Focus - Adaptive */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background)/0.6)_80%)]" />
    </div>
  );
}
