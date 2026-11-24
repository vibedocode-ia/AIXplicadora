import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 py-12 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">AIXplicadora</span>
          <span className="text-xs text-slate-500 ml-2">© 2026 VibeDoCode. Todos os direitos reservados.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <Link href="/cadastro" className="hover:text-white transition">Cadastro</Link>
          <Link href="/login" className="hover:text-white transition">Login</Link>
          <Link href="/admin" className="hover:text-white transition">Super Admin</Link>
          <span className="text-slate-600">|</span>
          <span>Privacidade & LGPD</span>
          <span>Termos de Uso</span>
        </div>
      </div>
    </footer>
  );
}
