import Link from "next/link";
import { Code2 } from "lucide-react";
import { KoFiButton } from "@/components/KoFiButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/86 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Ir a la home">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent/30 bg-accent/12 text-accent">
            <Code2 size={22} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-semibold tracking-normal text-white">DevStack Tools</span>
            <span className="hidden text-xs text-slate-400 sm:block">Apache, Docker, JSON, IA y más</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm text-slate-300">
          <Link href="/#herramientas" className="rounded-lg px-3 py-2 hover:bg-white/6 hover:text-white">
            Herramientas
          </Link>
          <Link href="/#categorias" className="hidden rounded-lg px-3 py-2 hover:bg-white/6 hover:text-white sm:inline-flex">
            Categorías
          </Link>
          <KoFiButton compact />
          <Link href="/#roadmap" className="inline-flex rounded-lg bg-accent px-3 py-2 font-medium text-ink hover:bg-accent/90">
            Roadmap
          </Link>
        </nav>
      </div>
    </header>
  );
}
