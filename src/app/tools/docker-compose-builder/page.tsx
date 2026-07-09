import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DockerComposeBuilder } from "@/components/tools/DockerComposeBuilder";

export const metadata: Metadata = {
  title: "Docker Compose Builder",
  description: "Crea un docker-compose.yml para stacks locales con app, base de datos, Redis, phpMyAdmin y Mailpit.",
  alternates: {
    canonical: "/tools/docker-compose-builder"
  }
};

export default function DockerComposeBuilderPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/#herramientas" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={16} aria-hidden="true" />
        Volver a herramientas
      </Link>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">Docker</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">Docker Compose Builder</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            Elige servicios habituales para desarrollo local y genera un docker-compose.yml listo para copiar.
          </p>

          <div className="mt-6">
            <DockerComposeBuilder />
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
