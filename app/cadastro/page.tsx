"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft, GraduationCap, HeartHandshake, School, ShieldCheck } from "lucide-react";

export default function CadastroPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    role: "STUDENT" as "STUDENT" | "PARENT" | "TEACHER",
    fullName: "",
    email: "",
    password: "",
    academicLevel: "fundamental_2",
    subjectInterest: "",
    termsAccepted: false,
  });

  const handleNext = () => {
    setError("");
    if (step === 1 && !formData.role) {
      setError("Por favor, selecione seu perfil.");
      return;
    }
    if (step === 2) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
        setError("Preencha todos os campos obrigatórios.");
        return;
      }
      if (formData.password.length < 6) {
        setError("A senha deve ter no mínimo 6 caracteres.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.termsAccepted) {
      setError("Você deve confirmar a declaração de maioridade ou autorização do responsável legal.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao realizar cadastro.");
      }

      router.push("/missao/nova");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 lg:p-8">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="text-2xl font-black tracking-tight text-slate-900">
          AI<span className="text-brand-600">Xplicadora</span>
        </span>
      </Link>

      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span>Passo {step} de 3</span>
            <span>
              {step === 1 && "Seu Perfil"}
              {step === 2 && "Dados de Acesso"}
              {step === 3 && "Contexto & Termos"}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-brand-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-rose-50 border border-rose-200 p-3.5 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* STEP 1: Seleção de Perfil */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Como você deseja usar a AIXplicadora?</h2>
            <p className="text-sm text-slate-600">Escolha a experiência mais adequada ao seu momento:</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "STUDENT" })}
                className={`flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                  formData.role === "STUDENT"
                    ? "border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="rounded-lg bg-blue-100 p-2.5 text-blue-700">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Sou Estudante</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Quero tirar dúvidas, entender o dever de casa e estudar para provas sem cópias.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "PARENT" })}
                className={`flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                  formData.role === "PARENT"
                    ? "border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-700">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Sou Pai ou Mãe (Responsável)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Quero aprender como explicar o conteúdo para meus filhos e acompanhar seus estudos.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "TEACHER" })}
                className={`flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                  formData.role === "TEACHER"
                    ? "border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="rounded-lg bg-purple-100 p-2.5 text-purple-700">
                  <School className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Sou Professor(a)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Quero encontrar analogias, planos de aula socráticos e antecipar dúvidas dos alunos.
                  </p>
                </div>
              </button>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow hover:bg-brand-500 transition"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Dados de Acesso */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Crie seus dados de acesso</h2>
            <p className="text-sm text-slate-600">Essas informações serão usadas para entrar na sua conta:</p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ex: Lucas Silva ou Mariana Oliveira"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu.email@exemplo.com"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Senha (mínimo 6 caracteres)
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="pt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow hover:bg-brand-500 transition"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contexto Pedagógico & Termo de Maioridade */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Contexto e Finalização</h2>
            <p className="text-sm text-slate-600">Personalize o ponto de partida do seu aprendizado:</p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nível de Estudo Principal
                </label>
                <select
                  value={formData.academicLevel}
                  onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white"
                >
                  <option value="fundamental_1">Ensino Fundamental I (1º ao 5º ano)</option>
                  <option value="fundamental_2">Ensino Fundamental II (6º ao 9º ano)</option>
                  <option value="ensino_medio">Ensino Médio / Pré-Vestibular / ENEM</option>
                  <option value="graduacao">Ensino Superior / Graduação</option>
                  <option value="pos_graduacao">Pós-Graduação / Especialização</option>
                  <option value="mestrado_doutorado">Mestrado ou Doutorado</option>
                  <option value="livre">Aprendizagem Livre / Concursos / Autodidata</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Matéria ou Assunto de Maior Interesse (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.subjectInterest}
                  onChange={(e) => setFormData({ ...formData, subjectInterest: e.target.value })}
                  placeholder="Ex: Matemática, Física, Biologia, Direito..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              {/* Termo Mandatório de Maioridade / Responsável Legal */}
              <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-4 mt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-0.5 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-brand-600" />
                      Declaração de Maioridade e Conformidade Legal
                    </span>
                    Declaro que sou maior de 18 anos <strong>OU</strong> que sou o pai, mãe ou responsável legal pelo usuário menor de idade, estando ciente e concordando com os Termos de Uso e a Política de Privacidade da AIXplicadora.
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>

              <button
                type="submit"
                disabled={loading || !formData.termsAccepted}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3 font-bold text-white shadow hover:bg-brand-500 disabled:opacity-50 transition"
              >
                {loading ? "Criando Conta..." : "Concluir Cadastro"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          Já possui uma conta?{" "}
          <Link href="/login" className="font-semibold text-brand-600 hover:underline">
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
}
