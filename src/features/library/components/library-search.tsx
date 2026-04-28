"use client";

import { useTransition, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export function LibrarySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const initialValue = searchParams.get("q") || "";
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedValue) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.push(`/library?${params.toString()}`);
    });
  }, [debouncedValue, router, searchParams]);

  // Sincronizar estado local se o parâmetro da URL mudar externamente (ex: limpar filtros)
  useEffect(() => {
    setValue(searchParams.get("q") || "");
  }, [searchParams]);

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Search className="h-4 w-4 text-muted-foreground/50" />
        )}
      </div>
      <Input 
        placeholder="Pesquisar resumos por tema ou palavra-chave..." 
        className="pl-10 pr-10 bg-card/30 border-border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary h-11 rounded-xl transition-all hover:bg-card/50"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && !isPending && (
        <button 
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground/40 hover:text-foreground transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
