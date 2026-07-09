import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CspGenerator } from "@/components/tools/CspGenerator";

export const metadata: Metadata = {
  title: "Generador CSP",
  description: "Construye una Content Security Policy para Apache, Nginx o header HTTP con dominios permitidos por directiva."
};

export default function CspGeneratorPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/#herramientas" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={16} aria-hidden="true" />
        Volver a herramientas
      </Link>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">Seguridad</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">Generador CSP</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            Define origenes permitidos para scripts, estilos, imagenes, conexiones, fuentes y frames. Genera el header o el snippet para Apache/Nginx.
          </p>

          <div className="mt-6">
            <CspGenerator />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-800 bg-panel/65 p-4 text-sm leading-6 text-slate-400">
            Empieza en modo estricto y abre solo los dominios necesarios. Prueba la CSP en staging antes de llevarla a produccion.
          </div>
        </div>
      </section>
    </div>
  );
}
