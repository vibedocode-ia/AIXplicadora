"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, HeartHandshake, School, Check, ArrowRight } from "lucide-react";

export function AudienceSelector() {
  const [activeTab, setActiveTab] = useState<"student" | "parent" | "teacher">("student");

  const data = {
    student: {
      title: "Para Estudantes de Qualquer Nível",
      tag: "Do Fundamental I ao Doutorado",
      desc: "Não importa se a dúvida é em frações, química orgânica, direito tributário ou análise de dados de mestrado: a AIXplicadora acolhe sua dúvida e ajuda você a destravar.",
      benefits: [
        "Envie fotos do caderno, páginas de livro ou links da internet",
        "Pistas graduais sem julgamento e no seu próprio ritmo",
        "Exercício gêmeo para você comprovar que realmente aprendeu",
        "Disponível 24/7 direto pelo celular ou computador",
      ],
      ctaText: "Começar como Estudante",
      badge: "Autonomia Garantida",
    },
    parent: {
      title: "Para Pais e Mães Educadores",
      tag: "Aprenda a Didática para Ajudar seu Filho",
      desc: "Quer ajudar no dever de casa mas não lembra da matéria ou não sabe como explicar sem se estressar? A AIXplicadora ensina você primeiro, com analogias simples do dia a dia.",
      benefits: [
        "Modo Pai-Educador com roteiros passo a passo de como explicar",
        "Acompanhe o tempo e as matérias estudadas sem relatórios punitivos",
        "Crie e gerencie as contas dos seus filhos com segurança",
        "Zero frustração no fim da tarde na hora do dever de casa",
      ],
      ctaText: "Começar como Responsável",
      badge: "Paz na Rotina Familiar",
    },
    teacher: {
      title: "Para Professores e Educadores",
      tag: "Laboratório Didático e Metodologias Ativas",
      desc: "Encontre analogias inéditas, sequências de perguntas socráticas para engajar turmas e descubra de antemão onde os alunos costumam tropeçar naquele conteúdo.",
      benefits: [
        "Gerador de analogias e metáforas didáticas personalizadas",
        "Sequenciador de perguntas socráticas para debates em sala",
        "Mapeamento de concepções erradas comuns dos alunos",
        "Exportação rápida de planos de explicação",
      ],
      ctaText: "Começar como Professor",
      badge: "Inovação Pedagógica",
    },
  };

  const current = data[activeTab];

  return (
    <section id="publicos" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100/70 px-3 py-1 rounded-full">
            Para Todos os Perfis
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Projetada para quem estuda, quem apoia e quem ensina
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-slate-100 p-1.5 border border-slate-200">
            <button
              onClick={() => setActiveTab("student")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === "student"
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Estudantes</span>
            </button>

            <button
              onClick={() => setActiveTab("parent")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === "parent"
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Pais & Mães</span>
            </button>

            <button
              onClick={() => setActiveTab("teacher")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === "teacher"
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <School className="h-4 w-4" />
              <span>Professores</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                {current.tag}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{current.title}</h3>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              {current.badge}
            </span>
          </div>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            {current.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {current.benefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="rounded-full bg-brand-50 p-1 text-brand-600 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-slate-700">{b}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <Link
              href={`/cadastro?perfil=${activeTab}`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-500 transition"
            >
              {current.ctaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
