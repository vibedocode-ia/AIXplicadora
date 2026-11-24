"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, School, BookOpen, Lightbulb, Copy, Check, ArrowRight, Download } from "lucide-react";

export default function ModoProfessorPage() {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("ensino_medio");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setGeneratedPlan({
        topic: topic,
        analogies: [
          {
            title: "Analogia 1: O Quarto Bagunçado (Cotidiana)",
            concept: "Entropia como tendência estatística à desordem.",
            explanation: "Existe apenas 1 maneira de ter o quarto perfeitamente arrumado (cada coisa no seu lugar exato), mas existem bilhões de combinações de roupas jogadas no chão. A desordem é muito mais provável estatisticamente.",
            limit: "Atenção ao limite didático: na física real, entropia envolve energia dispersa e microestados moleculares, não vontade humana de limpar.",
          },
          {
            title: "Analogia 2: Gotas de Corante na Água (Microscópica)",
            concept: "Difusão e irreversibilidade térmica.",
            explanation: "Ao pingar uma gota de tinta na água, as moléculas se espalham sozinhas. Você nunca vê as partículas de tinta se reunirem sozinhas de volta em uma gota.",
            limit: "Excelente para mostrar que processos naturais têm sentido único no tempo.",
          },
        ],
        socraticQuestions: [
          "1. Abertura: 'Se eu jogar este baralho para cima, qual a chance de todas as cartas caírem empilhadas em ordem numérica?'",
          "2. Investigação: 'O que torna o estado desarrumado tão mais comum do que o estado arrumado?'",
          "3. Conexão Física: 'Como isso se aplica ao calor de uma xícara de café esfriando na sala?'",
          "4. Fechamento: 'A energia sumiu ou ela se espalhou de uma forma que não conseguimos mais concentrar?'",
        ],
        misconceptions: [
          "Mito comum: 'Entropia é apenas bagunça física visível'. Correção: É dispersão de energia nos microestados do sistema.",
          "Mito comum: 'A entropia nunca pode diminuir'. Correção: Ela pode diminuir localmente (como ao limpar o quarto ou num congelador), mas aumenta no ambiente total.",
        ],
      });
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!generatedPlan) return;
    const text = `Plano de Aula Socrático: ${generatedPlan.topic}\n\nANALOGIAS:\n${generatedPlan.analogies.map((a: any) => `${a.title}\n${a.explanation}\nLimite: ${a.limit}`).join("\n\n")}\n\nPERGUNTAS SOCRÁTICAS:\n${generatedPlan.socraticQuestions.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow">
              <School className="h-5 w-5" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              AI<span className="text-purple-600">Xplicadora</span>
            </span>
          </Link>
          <span className="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 border border-purple-200">
            Laboratório do Professor
          </span>
        </div>

        <Link
          href="/missao/nova"
          className="text-xs font-semibold text-slate-600 hover:text-purple-600"
        >
          Ir para Mesa do Aluno
        </Link>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Laboratório Didático de Perguntas Socráticas
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Gere analogias com limites pedagógicos claros e sequências de perguntas que fazem seus alunos pensarem ativamente.
          </p>
        </div>

        {/* Formulário de Planejamento */}
        <form onSubmit={handleGenerate} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tópico ou Conceito da Aula
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: Entropia, Fotossíntese, Teorema de Pitágoras, Separação de Poderes..."
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Público / Nível da Turma
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-purple-500 focus:outline-none bg-white"
              >
                <option value="fundamental_2">Ensino Fundamental II</option>
                <option value="ensino_medio">Ensino Médio</option>
                <option value="graduacao">Ensino Superior / Graduação</option>
                <option value="pos_graduacao">Pós-Graduação / Mestrado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Objetivo Pedagógico Central (O que o aluno deve entender ao final?)
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Ex: Entender que calor flui espontaneamente do corpo mais quente para o mais frio."
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-purple-500 disabled:opacity-50 transition"
            >
              {loading ? "Estruturando Didática..." : "Gerar Roteiro Socrático"}
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Resultado Gerado */}
        {generatedPlan && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Roteiro Didático para: <span className="text-purple-600">{generatedPlan.topic}</span>
              </h2>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "Copiado!" : "Copiar Roteiro"}</span>
              </button>
            </div>

            {/* Analogias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedPlan.analogies.map((a: any, idx: number) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">{a.concept}</span>
                  <h3 className="font-bold text-slate-900 text-base mt-1 mb-2">{a.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{a.explanation}</p>
                  <div className="text-xs bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900 font-medium">
                    {a.limit}
                  </div>
                </div>
              ))}
            </div>

            {/* Perguntas Socráticas em Sequência */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Sequência de Perguntas para Conduzir a Aula
              </h3>
              <div className="space-y-2.5">
                {generatedPlan.socraticQuestions.map((q: string, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-100">
                    {q}
                  </div>
                ))}
              </div>
            </div>

            {/* Mitos e Concepções Equivocadas */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
              <h3 className="text-base font-bold text-rose-950 mb-2">
                Antecipação de Erros Comuns dos Alunos
              </h3>
              <ul className="space-y-2 text-sm text-rose-900">
                {generatedPlan.misconceptions.map((m: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
