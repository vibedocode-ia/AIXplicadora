import { Camera, Lightbulb, Trophy, HelpCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Envie onde você travou",
      desc: "Tire uma foto do caderno, envie a página da apostila, cole um link da internet ou digite o problema com suas próprias palavras.",
      icon: Camera,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      num: "02",
      title: "Investigação Socrática",
      desc: "A AIXplicadora lê o material, identifica o ponto exato da sua dúvida e faz perguntas que te ajudam a enxergar o próximo passo.",
      icon: HelpCircle,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      num: "03",
      title: "Pistas Graduais",
      desc: "Precisa de ajuda? Receba até 3 níveis de dicas sem receber a resposta pronta. Você mantém o controle do raciocínio.",
      icon: Lightbulb,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      num: "04",
      title: "Comprove sua Autonomia",
      desc: "Resolva um exercício gêmeo criado na hora para comprovar que você domina o conteúdo de verdade. O progresso fica salvo!",
      icon: Trophy,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100/70 px-3 py-1 rounded-full">
            Passo a Passo
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Como funciona uma missão na AIXplicadora
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Um ciclo pedagógico completo para transformar o momento de frustração em um aprendizado inesquecível.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">{s.num}</span>
                    <div className={`p-2.5 rounded-xl border ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
