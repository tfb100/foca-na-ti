import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConfirmEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border bg-card text-center overflow-hidden">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
            <MailCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-black uppercase tracking-tight">Verifique seu e-mail</CardTitle>
          <CardDescription>
            Enviamos um link de confirmação para o endereço de e-mail informado.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-[13px] text-muted-foreground/80 leading-relaxed font-medium">
            Por favor, clique no link enviado para ativar sua conta e começar sua jornada no Foca na TI.
          </p>
          <Button asChild variant="outline" className="w-full border-white/5 hover:bg-white/5 h-11 font-bold">
            <Link href="/sign-in">VOLTAR PARA O LOGIN</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
