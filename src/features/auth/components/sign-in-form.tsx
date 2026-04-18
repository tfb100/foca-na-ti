"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { signInAction } from "../actions/sign-in";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SocialAuthButtons } from "./social-auth-buttons";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInValues) {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const response = await signInAction(formData);

      if (response.success) {
        toast.success("Login realizado com sucesso!");
        router.push("/");
        router.refresh(); // Refresh to update auth state
      } else {
        toast.error(response.error || "Erro ao entrar.");
      }
    } catch (error) {
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-border bg-card/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-ti-orange to-ti-red bg-clip-text text-transparent">
          Bem-vindo de volta
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Entre com suas credenciais para continuar seus estudos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} className="bg-background/50 border-border" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} className="bg-background/50 border-border" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-ti-orange to-ti-red hover:opacity-90 font-semibold shadow-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6">
          <SocialAuthButtons />
        </div>
      </CardContent>
    </Card>
  );
}
