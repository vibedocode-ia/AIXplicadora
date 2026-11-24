"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Camera, Link as LinkIcon, Send, BookOpen, Compass, ArrowLeft } from "lucide-react";

export default function NovaMissaoPage() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [academicLevel, setAcademicLevel] = useState("fundamental_2");
  const [promptText, setPromptText] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [photoSelected, setPhotoSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStartMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() && !photoSelected && !externalLink.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/missions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: promptText.slice(0, 50) || "Nova Dúvida",
          subject: subject || "Geral",
          academicLevel,
          promptText,
          externalLink,
          hasPhoto: photoSelected,
        }),
      });

      const data = await res.json();
      if (res.ok && data.missionId) {
        router.push(`/missao/${data.missionId}`);
      } else {
        // Fallback para visualização imediata com ID mock
        router.push(`/missao/m-123456`);
      }
    } catch {
      router.push(`/missao/m-123456`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">
            AI<span className="text-brand-600">Xplicadora</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/trilhas"
            className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition"
          >
            Minhas Trilhas
          </Link>
          <Link
            href="/familia"
            className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition"
          >
            Portal Família
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              Mesa Socrática
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Qual é o problema ou matéria de hoje?
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Descreva onde você travou. Não se preocupe em formular perfeitamente — a Explicadora vai te ajudar a investigar.
            </p>
          </div>

          <form onSubmit={handleStartMission} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Matéria ou Assunto
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Matemática, Física, Estatística, Direito..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nível de Complexidade
                </label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white"
                >
                  <option value="fundamental_1">Fundamental I (1º ao 5º ano)</option>
                  <option value="fundamental_2">Fundamental II (6º ao 9º ano)</option>
                  <option value="ensino_medio">Ensino Médio / Vestibular / ENEM</option>
                  <option value="graduacao">Graduação Universitária</option>
                  <option value="pos_graduacao">Pós-Graduação / Especialização</option>
                  <option value="mestrado_doutorado">Mestrado ou Doutorado</option>
                  <option value="livre">Aprendizagem Livre</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Explique o que você precisa ou onde você travou:
              </label>
              <textarea
                rows={4}
                required={!photoSelected && !externalLink}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Ex: Não consigo resolver o exercício 4 da página 82 sobre equações com parênteses, tentei multiplicar mas o resultado não bate..."
                className="w-full rounded-xl border border-slate-300 p-3.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
              />
            </div>

            {/* Ingestão Multimodal: Foto e Link */}
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Entradas Multimodais (Opcionais)
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <label className={`cursor-pointer inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition ${
                  photoSelected ? "border-brand-600 bg-brand-50 text-brand-700" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}>
                  <Camera className="h-4 w-4" />
                  <span>{photoSelected ? "Foto de Caderno Anexada (OCR Ativo)" : "Anexar Foto de Caderno / Livro"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={() => setPhotoSelected(true)}
                  />
                </label>

                <div className="flex-1 min-w-[220px] flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5">
                  <LinkIcon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <input
                    type="url"
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    placeholder="Colar link de artigo ou exercício..."
                    className="w-full text-xs text-slate-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-600/30 hover:bg-brand-500 transition disabled:opacity-50"
              >
                {loading ? "Iniciando Investigação..." : "Iniciar Missão Socrática"}
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
