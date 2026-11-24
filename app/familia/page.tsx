"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, HeartHandshake, UserPlus, CheckCircle2, Trophy, Clock, BookOpen, Lightbulb, Plus, X } from "lucide-react";

export default function PortalFamiliaPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "pai-educador">("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("fundamental_2");

  const [students, setStudents] = useState([
    { id: "s1", name: "Lucas Oliveira", grade: "7º Ano (Fundamental II)", missions: 8, autonomyRate: "87%", lastActive: "Hoje às 15:30" },
    { id: "s2", name: "Beatriz Oliveira", grade: "4º Ano (Fundamental I)", missions: 5, autonomyRate: "92%", lastActive: "Ontem" },
  ]);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    setStudents([
      ...students,
      {
        id: `s-${Date.now()}`,
        name: newStudentName,
        grade: newStudentGrade,
        missions: 0,
        autonomyRate: "100%",
        lastActive: "Criado agora",
      },
    ]);
    setNewStudentName("");
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              AI<span className="text-brand-600">Xplicadora</span>
            </span>
          </Link>
          <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            Painel da Família
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/missao/nova"
            className="rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-brand-500 transition"
          >
            Nova Missão
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Toggle Tabs */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                activeTab === "dashboard"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Acompanhamento dos Filhos
            </button>
            <button
              onClick={() => setActiveTab("pai-educador")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition flex items-center gap-1.5 ${
                activeTab === "pai-educador"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Lightbulb className="h-4 w-4" />
              <span>Modo Pai-Educador</span>
            </button>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <UserPlus className="h-3.5 w-3.5 text-brand-600" />
            <span>Adicionar Filho / Dependente</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD PARENTAL */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Cards de Métricas Consolidadas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                  <Clock className="h-4 w-4 text-brand-600" />
                  <span>Tempo de Estudo Ativo</span>
                </div>
                <div className="text-3xl font-black text-slate-900">4h 20m</div>
                <p className="text-xs text-slate-500 mt-1">Nesta semana nos dois dependentes</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Missões Concluídas</span>
                </div>
                <div className="text-3xl font-black text-slate-900">13</div>
                <p className="text-xs text-slate-500 mt-1">Dúvidas destravadas com sucesso</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span>Índice de Autonomia</span>
                </div>
                <div className="text-3xl font-black text-slate-900">89%</div>
                <p className="text-xs text-slate-500 mt-1">Resolveram o exercício gêmeo sem pistas</p>
              </div>
            </div>

            {/* Lista de Dependentes */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Dependentes Cadastrados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((st) => (
                  <div key={st.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base font-bold text-slate-900">{st.name}</span>
                        <span className="text-xs font-semibold rounded-full bg-slate-100 text-slate-600 px-2.5 py-0.5">
                          {st.grade}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-xs text-slate-600 mb-4">
                        <div>
                          <span className="block font-bold text-slate-900 text-sm">{st.missions}</span>
                          Missões feitas
                        </div>
                        <div>
                          <span className="block font-bold text-emerald-600 text-sm">{st.autonomyRate}</span>
                          Autonomia
                        </div>
                        <div>
                          <span className="block font-bold text-slate-900 text-sm">{st.lastActive}</span>
                          Última sessão
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <Link
                        href="/missao/nova"
                        className="text-xs font-bold text-brand-600 hover:text-brand-700"
                      >
                        Abrir Sessão com {st.name.split(" ")[0]} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MODO PAI-EDUCADOR */}
        {activeTab === "pai-educador" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
              <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
                <HeartHandshake className="h-6 w-6 text-emerald-600" />
                Como a AIXplicadora ajuda você a ensinar seu filho
              </h2>
              <p className="text-sm text-emerald-900 mt-1 max-w-3xl leading-relaxed">
                Você não precisa lembrar de todas as fórmulas da escola. Use a AIXplicadora para entender o conceito antes e receba um roteiro com perguntas socráticas e analogias para usar na mesa de casa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Analogia Prática</span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">Frações Equivalentes com Fatias de Pizza</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Seu filho acha que 2/4 é diferente de 1/2? Peça para ele imaginar uma pizza cortada em 2 pedaços grandes e outra cortada em 4 pedaços médios. Comer 1 fatia grande é a mesma quantidade de comer 2 fatias médias!
                </p>
                <div className="text-xs bg-slate-50 p-3 rounded-lg text-slate-700 font-mono">
                  Dica: Pergunte a ele: &quot;O tamanho total da sua fome mudou ou só o número de pedaços cortados?&quot;
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Dica Socrática</span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">O que fazer quando ele diz &quot;Não entendi nada&quot;</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Em vez de tentar explicar a página inteira de novo, peça para ele ler a primeira frase em voz alta e perguntar: &quot;Até este ponto aqui, o que o exercício já te contou?&quot;
                </p>
                <div className="text-xs bg-slate-50 p-3 rounded-lg text-slate-700 font-mono">
                  Dica: Isole a pergunta principal do enunciado antes de tentar fazer cálculos.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Adicionar Filho */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Adicionar Dependente</h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome do Filho(a)</label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Ex: Pedro Henrique"
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nível Escolar</label>
                  <select
                    value={newStudentGrade}
                    onChange={(e) => setNewStudentGrade(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-brand-500 focus:outline-none bg-white"
                  >
                    <option value="Fundamental I">Ensino Fundamental I</option>
                    <option value="Fundamental II">Ensino Fundamental II</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Pré-Vestibular / ENEM">Pré-Vestibular / ENEM</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow"
                  >
                    Salvar Dependente
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
