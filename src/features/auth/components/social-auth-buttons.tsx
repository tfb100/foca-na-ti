"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogleAction } from "../actions/social-auth";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SocialAuthButtons() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await signInWithGoogleAction();
    // Redirect happens on server
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
          <span className="bg-background px-2 text-muted-foreground/60 tracking-[0.2em]">Ou continue com</span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isGoogleLoading}
        onClick={handleGoogleLogin}
        className="w-full border-white/5 bg-white/5 hover:bg-white/10 transition-all font-medium"
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
        )}
        Google
      </Button>
    </div>
  );
}
