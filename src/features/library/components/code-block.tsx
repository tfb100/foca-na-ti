"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    // Extrair texto dos children
    const text = (children as any)?.props?.children || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/code my-6">
      <button
        onClick={onCopy}
        className={cn(
          "absolute right-4 top-4 p-2 rounded-lg bg-background/50 border border-border opacity-0 group-hover/code:opacity-100 transition-all z-10 hover:bg-background",
          copied && "text-primary border-primary/50 opacity-100"
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className={cn("bg-card/30 p-6 rounded-2xl border border-border overflow-x-auto shadow-2xl relative", className)}>
        {children}
      </pre>
    </div>
  );
}
