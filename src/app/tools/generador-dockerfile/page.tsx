import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DockerfileGenerator } from "@/components/tools/DockerfileGenerator";

export const metadata: Metadata = {
  title: "Generador Dockerfile",
  description: "Genera Dockerfiles para Node.js, PHP + Apache, Python y frontends estaticos con Nginx."
};

export default function DockerfileGeneratorPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/#herramientas" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={16} aria-hidden="true" />
        Volver a herramientas
      </Link>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">Docker</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">Generador Dockerfile</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            Configura el runtime de tu proyecto y genera un Dockerfile listo para copiar, descargar y construir.
          </p>

          <div className="mt-6">
            <DockerfileGenerator />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-800 bg-panel/65 p-4 text-sm leading-6 text-slate-400">
            Todo se genera en tu navegador. No hay backend ni se envia tu configuracion a ningun servidor.
          </div>
        </div>
      </section>
    </div>
  );
}
