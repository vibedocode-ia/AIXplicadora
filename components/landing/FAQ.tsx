"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "A AIXplicadora serve para qualquer matéria mesmo?",
      a: "Sim! Nossa inteligência foi calibrada para Matemática, Física, Química, Biologia, Língua Portuguesa, História, Geografia, Filosofia, além de matérias de ensino superior e pós-graduação como Estatística, Direito, Programação e Engenharia.",
    },
    {
      q: "Como funciona para alunos menores de idade?",
      a: "Para menores de 18 anos, exigimos no cadastro a ciência e gestão pelo responsável legal. Os pais podem criar a conta, acompanhar o progresso dos filhos e até usar a plataforma para aprender como ensiná-los em casa.",
    },
    {
      q: "A plataforma dá a resposta pronta do dever?",
      a: "Não! A nossa regra de ouro pedagógica é nunca entregar o gabarito de bandeja. A IA orienta o raciocínio com perguntas socráticas e pistas graduais. No final, propõe um exercício gêmeo para certificar a autonomia real do aluno.",
    },
    {
      q: "Posso mandar foto do meu caderno ou apostila?",
      a: "Com certeza! A AIXplicadora conta com reconhecimento óptico de caracteres (OCR) para ler enunciados escritos à mão em cadernos, fórmulas em livros didáticos ou links de artigos da internet.",
    },
    {
      q: "Precisa instalar algum aplicativo?",
      a: "Não. A AIXplicadora é uma aplicação web moderna que roda direto pelo navegador do seu celular, tablet ou computador.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100/70 px-3 py-1 rounded-full">
            Tire Suas Dúvidas
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-brand-600 transition"
                >
                  <span className="text-base sm:text-lg">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180 text-brand-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
