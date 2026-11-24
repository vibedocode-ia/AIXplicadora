"use client";

import { MessageSquare, Lightbulb, CheckCircle, HelpCircle } from "lucide-react";

export function MethodDemo() {
  return (
    <section id="metodo" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100/70 px-3 py-1 rounded-full">
            Diferencial Pedagógico
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            A diferença entre copiar e realmente aprender
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Chatbots genéricos entregam a resposta pronta e deixam a sua dúvida para trás. A AIXplicadora guia você passo a passo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* O Chatbot Comum */}
          <div className="flex flex-col rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-rose-600 font-semibold text-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              Chatbot Comum (Cópia Passiva)
            </div>
            
            <div className="space-y-4 flex-1 text-sm">
              <div className="bg-slate-100 p-3 rounded-lg text-slate-800">
                <span className="font-semibold block text-xs text-slate-500 mb-1">Aluno:</span>
                &quot;Como resolvo 2x + 5 = 15?&quot;
              </div>

              <div className="bg-rose-50/60 border border-rose-100 p-3.5 rounded-lg text-slate-700">
                <span className="font-semibold block text-xs text-rose-600 mb-1">IA Genérica:</span>
                &quot;Subtraia 5 de ambos os lados: 2x = 10. Depois divida por 2: x = 5. A resposta é 5.&quot;
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                <HelpCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <span><strong>O que aconteceu:</strong> O aluno copiou 5 no caderno, mas na prova não saberá o que fazer se os números mudarem.</span>
              </div>
            </div>
          </div>

          {/* A AIXplicadora */}
          <div className="flex flex-col rounded-2xl border-2 border-brand-500 bg-white p-6 shadow-md shadow-brand-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-brand-700 font-semibold text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" />
                AIXplicadora (Método Socrático Ativo)
              </div>
              <span className="text-[11px] font-bold bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">
                Construção de Autonomia
              </span>
            </div>

            <div className="space-y-4 flex-1 text-sm">
              <div className="bg-slate-100 p-3 rounded-lg text-slate-800">
                <span className="font-semibold block text-xs text-slate-500 mb-1">Aluno:</span>
                &quot;Travei em 2x + 5 = 15. Não sei por onde começar.&quot;
              </div>

              <div className="bg-brand-50/80 border border-brand-200 p-3.5 rounded-lg text-slate-800">
                <span className="font-semibold block text-xs text-brand-700 mb-1">AIXplicadora:</span>
                &quot;Sem problemas! Pense na equação como uma balança em equilíbrio. Se quisermos isolar o 2x sozinho, o que podemos fazer com esse +5 dos dois lados?&quot;
              </div>

              <div className="bg-slate-100 p-3 rounded-lg text-slate-800">
                <span className="font-semibold block text-xs text-slate-500 mb-1">Aluno:</span>
                &quot;Tirar 5 dos dois lados? Fica 2x = 10?&quot;
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span><strong>Eureka!</strong> O aluno descobriu o princípio da equivalência. Agora ele recebe um exercício gêmeo para provar que domina o assunto sozinho.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
