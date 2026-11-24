"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Send, Lightbulb, CheckCircle2, ArrowLeft, Trophy, Camera, HelpCircle, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  role: "assistant" | "user" | "hint" | "twin_challenge";
  content: string;
  hintLevel?: number;
}

export default function MissaoWorkspacePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Li a sua dúvida sobre equações. Antes de sairmos calculando, dê uma olhada no termo `2x + 5 = 15`. Se o nosso objetivo é descobrir o valor de `x`, o que está 'atrapalhando' o `2x` a ficar sozinho no lado esquerdo da igualdade?",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [missionStep, setMissionStep] = useState<"DIAGNOSING" | "CHALLENGING" | "AUTONOMY" | "COMPLETED">("DIAGNOSING");
  const [autonomySuccess, setAutonomySuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Resposta socrática simulada
    setTimeout(() => {
      if (missionStep === "DIAGNOSING") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Exatamente! O `+ 5` está somando ali. Numa equação, que é como uma balança de dois pratos, o que precisamos fazer nos dois lados para neutralizar esse `+ 5` sem desequilibrar a balança?",
          },
        ]);
        setMissionStep("CHALLENGING");
      } else if (missionStep === "CHALLENGING") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "twin_challenge",
            content: "Brilhante! Você concluiu que subtrair 5 dos dois lados dá `2x = 10`, logo `x = 5`.\n\nAgora vamos comprovar a sua AUTONOMIA com um desafio gêmeo criado exclusivamente para você:\n\n**Resolva agora sem pistas:**\n`3x + 4 = 19`\nQual é o valor de x e como você pensou?",
          },
        ]);
        setMissionStep("AUTONOMY");
      } else if (missionStep === "AUTONOMY") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Sensacional! `3x = 15`, logo `x = 5`. Você explicou exatamente o princípio da operação inversa e resolveu com total autonomia. Missão cumprida com sucesso!",
          },
        ]);
        setMissionStep("COMPLETED");
        setAutonomySuccess(true);
      }
    }, 800);
  };

  const handleRequestHint = () => {
    if (hintsUsed >= 3) return;
    const nextLevel = hintsUsed + 1;
    setHintsUsed(nextLevel);

    const hints = [
      "Pista Nível 1: Lembre-se da operação inversa da adição. Se algo está sendo somado (+5), qual operação desfaz essa soma?",
      "Pista Nível 2: A operação inversa da soma é a subtração. Tente subtrair 5 de ambos os lados da equação: (2x + 5 - 5 = 15 - 5).",
      "Pista Nível 3: Ficamos com 2x = 10. Agora pense: qual número multiplicado por 2 resulta em 10?",
    ];

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "hint",
        content: hints[nextLevel - 1],
        hintLevel: nextLevel,
      },
    ]);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      {/* Top Navigation */}
      <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/missao/nova"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                Equações do 1º Grau com Equivalência
              </h1>
              <span className="rounded-full bg-brand-100 text-brand-700 px-2 py-0.5 text-xs font-semibold">
                Matemática
              </span>
            </div>
            <p className="text-xs text-slate-500">Missão Socrática Ativa · Fundamental II</p>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="hidden sm:flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            missionStep === "COMPLETED"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-amber-100 text-amber-800"
          }`}>
            {missionStep === "DIAGNOSING" && "Etapa 1: Diagnóstico"}
            {missionStep === "CHALLENGING" && "Etapa 2: Investigação"}
            {missionStep === "AUTONOMY" && "Etapa 3: Teste de Autonomia"}
            {missionStep === "COMPLETED" && "Missão Concluída 🎉"}
          </span>
        </div>
      </header>

      {/* Chat Messages Scroll Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-4xl w-full mx-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            {m.role === "assistant" && (
              <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[75%]">
                <div className="h-8 w-8 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow">
                  AI
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white p-4 text-sm text-slate-800 shadow-sm border border-slate-200/80 leading-relaxed">
                  {m.content}
                </div>
              </div>
            )}

            {m.role === "user" && (
              <div className="rounded-2xl rounded-tr-sm bg-brand-600 p-4 text-sm text-white shadow-sm max-w-[85%] sm:max-w-[75%] leading-relaxed">
                {m.content}
              </div>
            )}

            {m.role === "hint" && (
              <div className="w-full max-w-2xl mx-auto my-2 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-amber-800 text-xs uppercase tracking-wider mb-1">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  <span>Pista Socrática {m.hintLevel} de 3</span>
                </div>
                <p className="leading-relaxed">{m.content}</p>
              </div>
            )}

            {m.role === "twin_challenge" && (
              <div className="w-full max-w-2xl mx-auto my-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-indigo-900 text-sm mb-2">
                  <Trophy className="h-5 w-5 text-indigo-600" />
                  <span>Desafio de Autonomia (Exercício Gêmeo)</span>
                </div>
                <div className="whitespace-pre-line text-sm text-slate-800 font-medium leading-relaxed">
                  {m.content}
                </div>
              </div>
            )}
          </div>
        ))}

        {autonomySuccess && (
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-300 p-6 text-center max-w-lg mx-auto shadow-sm my-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-emerald-950">Autonomia Comprovada!</h3>
            <p className="text-xs text-emerald-800 mt-1">
              Esta evidência foi gravada no seu histórico de competências e constará no relatório familiar.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Link
                href="/trilhas"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-500 transition"
              >
                Ver no Mapa de Trilhas
              </Link>
              <Link
                href="/missao/nova"
                className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition"
              >
                Nova Dúvida
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Input Action Bar */}
      <footer className="border-t border-slate-200 bg-white p-3 sm:p-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          {/* Action Helper Pills */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRequestHint}
                disabled={hintsUsed >= 3 || missionStep === "COMPLETED"}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50/80 px-3 py-1 font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-40 transition"
              >
                <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                <span>Pedir Pista ({3 - hintsUsed} restantes)</span>
              </button>
            </div>
            <span>Pressione Enter para enviar</span>
          </div>

          {/* Form input */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={missionStep === "COMPLETED"}
              placeholder={missionStep === "COMPLETED" ? "Missão concluída!" : "Digite sua resposta ou explique seu raciocínio..."}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || missionStep === "COMPLETED"}
              className="rounded-xl bg-brand-600 p-3 text-white shadow hover:bg-brand-500 disabled:opacity-40 transition"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
