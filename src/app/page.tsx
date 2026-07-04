import Image from "next/image";
import { Boxes, Search, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { ToolCard } from "@/components/ToolCard";
import { categories, tools } from "@/lib/tools";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/24 bg-accent/10 px-3 py-1 text-sm text-accent">
              <Sparkles size={15} aria-hidden="true" />
              DevRentable para trabajo técnico diario
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-normal text-white sm:text-6xl">DevStack Tools</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Herramientas rápidas para desarrolladores que no quieren perder la tarde
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
              Una web gratuita para preparar utilidades de Apache, Nginx, Docker, JSON, IA, WordPress, Magento y Moodle.
              Empezamos con la home y una lista clara de herramientas que iremos construyendo.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-accent/20 bg-panel shadow-glow">
            <Image
              src="/devrentable-banner.png"
              alt="Banner de DevRentable con IA, automatización, workflows, Docker, AWS, Azure y MCP"
              width={1664}
              height={936}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <AdSlot id="home-top-ad" label="Home superior" />
      </section>

      <section id="herramientas" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="tool-surface rounded-lg p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                <Boxes size={16} aria-hidden="true" />
                Roadmap de herramientas
              </span>
              <h2 className="mt-2 text-2xl font-semibold text-white">Lo que vamos a ir añadiendo</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                La primera versión presenta el catálogo y la dirección del proyecto. Cada tarjeta representa una utilidad que se desarrollará después.
              </p>
            </div>
            <div className="relative block w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <div className="field flex h-11 items-center pl-10 pr-3 text-sm text-slate-500">Buscador de herramientas, próximamente</div>
            </div>
          </div>
        </div>

        <div id="roadmap" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              title={tool.title}
              description={tool.description}
              category={tool.category}
              Icon={tool.Icon}
              href={tool.href}
              status={tool.status}
            />
          ))}
        </div>
      </section>

      <section id="categorias" className="mx-auto max-w-6xl px-4 pb-14 pt-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white">Categorías</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-lg border border-slate-700 bg-ink/65 px-3 py-2 text-sm text-slate-300">
              {category}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
