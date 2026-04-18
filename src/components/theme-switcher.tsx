"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"} className="rounded-full w-8 h-8 hover:bg-white/10 transition-colors">
          {theme === "light" ? (
            <Sun
              key="light"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : theme === "dark" ? (
            <Moon
              key="dark"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : theme === "cyberpunk" ? (
            <Terminal
              key="cyberpunk"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="tech-card bg-background/90 backdrop-blur-xl" align="end">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <DropdownMenuRadioItem className="flex gap-2 text-xs focus:bg-primary/10 focus:text-primary cursor-pointer" value="light">
            <Sun size={ICON_SIZE} className="text-muted-foreground group-focus:text-primary" />{" "}
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2 text-xs focus:bg-primary/10 focus:text-primary cursor-pointer" value="dark">
            <Moon size={ICON_SIZE} className="text-muted-foreground group-focus:text-primary" />{" "}
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2 text-xs focus:bg-primary/10 focus:text-primary cursor-pointer" value="cyberpunk">
            <Terminal size={ICON_SIZE} className="text-muted-foreground group-focus:text-primary" />{" "}
            <span>Cyberpunk</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2 text-xs focus:bg-primary/10 focus:text-primary cursor-pointer" value="system">
            <Laptop size={ICON_SIZE} className="text-muted-foreground group-focus:text-primary" />{" "}
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
