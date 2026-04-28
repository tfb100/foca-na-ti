"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ChevronDown, 
  Trash2, 
  BrainCircuit,
  Terminal,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MarkdownReader } from "@/features/library/components/markdown-reader";

import { askAdaAction, ChatMessage } from "../actions/ask-ada-action";

interface Message {
  role: "user" | "assistant";
  content: string;
  thoughts?: string[];
  sources?: { title: string; url: string }[];
  feedback?: "like" | "dislike" | null;
}

export function AdaChatPane({ summaryId, title }: { summaryId?: string; title?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: title 
        ? `Olá! Sou a Ada. Estou lendo "${title}" com você. Tem alguma dúvida técnica sobre este conteúdo ou quer que eu crie um simulado?`
        : "Olá! Sou a Ada, sua mentora de TI. Como posso te ajudar hoje?",
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [expandedThoughts, setExpandedThoughts] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleFeedback = (idx: number, type: "like" | "dislike") => {
    setMessages(prev => prev.map((msg, i) => {
      if (i === idx) {
        return { ...msg, feedback: msg.feedback === type ? null : type };
      }
      return msg;
    }));
  };

  const handleSend = async (overrideInput?: string | React.MouseEvent | React.KeyboardEvent) => {
    const textToSend = typeof overrideInput === "string" ? overrideInput : input;
    if (!textToSend.trim() || isTyping) return;
    
    const userContent = textToSend;
    const userMsg: Message = { role: "user", content: userContent };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const history: ChatMessage[] = messages.map(m => ({ 
        role: m.role, 
        content: m.content 
      }));

      const response = await askAdaAction(userContent, summaryId, history);

      const assistantMsg: Message = {
        role: "assistant",
        content: response.answer,
        thoughts: response.thoughts,
        sources: response.sources.map(s => ({ title: s.title, url: s.url }))
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Ops, perdi o contato com meus servidores. Pode tentar novamente em instantes?"
      }]);
    } finally {
      setIsTyping(false);
    }
  };


  return (
    <div className="flex flex-col h-full bg-background border-l border-white/5">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <BrainCircuit className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Ada AI</h3>
            <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-mono uppercase tracking-tighter">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Sincronizada ao texto
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/40 hover:text-red-500 transition-colors" onClick={() => setMessages([messages[0]])}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" viewportRef={scrollRef}>
        <div className="space-y-6 max-w-2xl mx-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("flex flex-col", msg.role === "user" ? "items-end" : "items-start")}>
              <div className={cn(
                "flex gap-3",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border",
                  msg.role === "assistant" ? "bg-primary/10 border-primary/20" : "bg-white/10 border-white/5"
                )}>
                  {msg.role === "assistant" ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-muted-foreground" />}
                </div>
                
                <div className={cn(
                  "p-4 rounded-2xl text-[14px] leading-relaxed shadow-lg",
                  msg.role === "assistant" 
                    ? "bg-card border border-white/5 text-zinc-100" 
                    : "bg-primary text-white font-semibold shadow-primary/20"
                )}>
                  {msg.role === "assistant" ? (
                    <MarkdownReader content={msg.content} className="prose-sm!" />
                  ) : (
                    msg.content
                  )}
                </div>


              </div>

              {/* Thoughts (Reasoning Logs) */}
              {msg.thoughts && (
                <div className="mt-2 ml-11 w-full max-w-sm">
                  <button 
                    onClick={() => setExpandedThoughts(expandedThoughts === idx ? null : idx)}
                    className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/40 hover:text-primary transition-colors uppercase tracking-widest"
                  >
                    <Terminal className="h-3 w-3" />
                    {expandedThoughts === idx ? "Ocultar Raciocínio" : "Ver Raciocínio (Log)"}
                    <ChevronDown className={cn("h-3 w-3 transition-transform", expandedThoughts === idx && "rotate-180")} />
                  </button>
                  
                  {expandedThoughts === idx && (
                    <div className="mt-2 p-3 bg-black/40 border border-white/5 rounded-xl text-[11px] font-mono text-muted-foreground/80 leading-tight">
                      {msg.thoughts.map((thought, tIdx) => (
                        <div key={tIdx} className="flex gap-2 mb-1 last:mb-0">
                          <span className="text-primary/50 shrink-0">›</span>
                          <span>{thought}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Message Actions (Sources & Feedback) */}
              {msg.role === "assistant" && (
                <div className="mt-3 ml-11 flex flex-wrap items-center gap-4">
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((source, sIdx) => (
                        <a key={sIdx} href={source.url} target="_blank" rel="noopener noreferrer">
                          <Badge variant="outline" className="text-[10px] bg-white/5 border-white/5 hover:border-primary/50 transition-colors cursor-pointer gap-1.5 py-1">
                            <ExternalLink className="h-3 w-3" />
                            {source.title}
                          </Badge>
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {/* Feedback */}
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn("h-6 w-6 rounded-full hover:bg-white/10 hover:text-emerald-400 transition-colors text-muted-foreground/40", msg.feedback === "like" && "text-emerald-400 bg-emerald-500/10")}
                      onClick={() => handleFeedback(idx, "like")}
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn("h-6 w-6 rounded-full hover:bg-white/10 hover:text-red-400 transition-colors text-muted-foreground/40", msg.feedback === "dislike" && "text-red-400 bg-red-500/10")}
                      onClick={() => handleFeedback(idx, "dislike")}
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-pulse">
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input & Quick Actions */}
      <div className="p-4 border-t border-white/5 bg-background/50 backdrop-blur-sm flex flex-col gap-3">
        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-[11px] bg-white/5 border-white/5 hover:border-primary/50 hover:bg-primary/10 rounded-full gap-1.5"
              onClick={() => handleSend("👶 Me explique esse conteúdo de forma bem simples (ELI5).")}
            >
              <Lightbulb className="h-3 w-3 text-amber-400" />
              Explicar Simples
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-[11px] bg-white/5 border-white/5 hover:border-primary/50 hover:bg-primary/10 rounded-full gap-1.5"
              onClick={() => handleSend("💡 Me dê um exemplo prático focado em provas de concurso.")}
            >
              <Sparkles className="h-3 w-3 text-primary" />
              Exemplo Prático
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-[11px] bg-white/5 border-white/5 hover:border-primary/50 hover:bg-primary/10 rounded-full gap-1.5"
              onClick={() => handleSend("📝 Crie um mini-simulado com 3 questões difíceis sobre este resumo.")}
            >
              <MessageSquare className="h-3 w-3 text-emerald-400" />
              Criar Simulado
            </Button>
          </div>
        )}

        <div className="relative group">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Pergunte sobre este tema..."
            className="pr-12 bg-white/5 border-white/5 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary h-11 rounded-xl group-hover:border-primary/50 transition-all font-semibold"
          />


          <Button 
            size="icon" 
            className="absolute right-1.5 top-1.5 h-8 w-8 transition-transform active:scale-90"
            disabled={!input.trim() || isTyping}
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center mt-3 text-muted-foreground/40 font-bold uppercase tracking-widest">
          A Ada usa IA para sintetizar conteúdo. Verifique informações importantes.
        </p>
      </div>
    </div>
  );
}
