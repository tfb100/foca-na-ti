"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";
import { cn } from "@/lib/utils";

interface MarkdownReaderProps {
  content: string;
  className?: string;
}

export function MarkdownReader({ content, className }: MarkdownReaderProps) {
  return (
    <div className={cn("prose prose-zinc dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ className, ...props }) => (
            <h1 className={cn("text-4xl font-black tracking-tighter text-foreground mb-8", className)} {...props} />
          ),
          h2: ({ className, ...props }) => (
            <h2 className={cn("text-2xl font-bold tracking-tight text-foreground mt-12 mb-6 border-b border-border pb-3", className)} {...props} />
          ),
          h3: ({ className, ...props }) => (
            <h3 className={cn("text-xl font-bold tracking-tight text-foreground mt-10 mb-4", className)} {...props} />
          ),
          p: ({ className, ...props }) => (
            <p className={cn("text-muted-foreground leading-relaxed mb-6 text-lg", className)} {...props} />
          ),
          ul: ({ className, ...props }) => (
            <ul className={cn("list-disc list-outside ml-6 mb-6 space-y-3 text-muted-foreground text-lg", className)} {...props} />
          ),
          ol: ({ className, ...props }) => (
            <ol className={cn("list-decimal list-outside ml-6 mb-6 space-y-3 text-muted-foreground text-lg", className)} {...props} />
          ),
          li: ({ className, ...props }) => (
            <li className={cn("pl-2", className)} {...props} />
          ),

          code: ({ className, children, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code className={cn("bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono text-sm", className)} {...props}>
                {children}
              </code>
            ) : (
              <code className={cn("font-mono text-sm", className)} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ className, ...props }) => (
            <pre className={cn("bg-card/30 p-4 rounded-lg border border-border overflow-x-auto my-6 shadow-2xl", className)} {...props} />
          ),
          table: ({ className, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className={cn("w-full border-collapse border border-border", className)} {...props} />
            </div>
          ),
          th: ({ className, ...props }) => (
            <th className={cn("bg-muted/30 border border-border p-3 text-left font-bold text-foreground", className)} {...props} />
          ),
          td: ({ className, ...props }) => (
            <td className={cn("border border-border p-3 text-muted-foreground", className)} {...props} />
          ),
          blockquote: ({ className, ...props }) => (
            <blockquote className={cn("border-l-4 border-primary pl-4 italic text-muted-foreground my-6 bg-muted py-4 pr-4 rounded-r-lg", className)} {...props} />
          ),
          img: ({ className, alt, ...props }) => (
            <div className="my-8 space-y-2">
              <img 
                className={cn("rounded-2xl border border-border shadow-glow w-full object-cover max-h-[500px]", className)} 
                alt={alt}
                {...props} 
              />
              {alt && (
                <p className="text-center text-[10px] text-muted-foreground/40 italic uppercase tracking-widest font-bold">
                  {alt}
                </p>
              )}
            </div>
          ),
          iframe: ({ className, ...props }) => (
            <div className="my-8 aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-glow">
              <iframe 
                className={cn("h-full w-full", className)} 
                {...props} 
              />
            </div>
          ),
        }}

      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
