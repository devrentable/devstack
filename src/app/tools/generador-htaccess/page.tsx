import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HtaccessGenerator } from "@/components/tools/HtaccessGenerator";

export const metadata: Metadata = {
  title: "Generador .htaccess",
  description: "Genera reglas .htaccess para HTTPS, www, WordPress, cache, gzip, CORS, hotlinking y seguridad basica.",
  alternates: {
    canonical: "/tools/generador-htaccess"
  }
};

export default function HtaccessGeneratorPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/#herramientas" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={16} aria-hidden="true" />
        Volver a herramientas
      </Link>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">Apache</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">Generador .htaccess</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            Prepara reglas habituales para Apache: HTTPS, www, WordPress, cache, gzip, CORS, hotlinking, headers de seguridad y redirecciones.
          </p>

          <div className="mt-6">
            <HtaccessGenerator />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-800 bg-panel/65 p-4 text-sm leading-6 text-slate-400">
            Haz copia del archivo actual antes de aplicar reglas nuevas. Un error en .htaccess puede dejar la web con error 500.
          </div>
        </div>
      </section>
    </div>
  );
}
