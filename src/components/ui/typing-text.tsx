"use client";

import { motion, useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

export function TypingText({ text, className }: { text: string; className?: string }) {
  const count = useMotionValue(0);
  const [displayText, setDisplayText] = useState("");

  useMotionValueEvent(count, "change", (latest) => {
    setDisplayText(text.slice(0, Math.round(latest)));
  });

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: 1.5,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [text, count]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-primary ml-1 translate-y-[10%]"
      />
    </span>
  );
}
