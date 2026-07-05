import Link from "next/link";
import { KoFiButton } from "@/components/KoFiButton";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>DevStack Tools. Herramientas locales, rapidas y sin backend.</p>
          <nav className="flex flex-wrap gap-3">
            <Link href="/sobre-el-proyecto" className="hover:text-white">
              Sobre el proyecto
            </Link>
            <Link href="/contacto" className="hover:text-white">
              Contacto
            </Link>
            <Link href="/privacidad" className="hover:text-white">
              Privacidad
            </Link>
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p>Apoya el proyecto y ayuda a mantener estas herramientas gratis.</p>
          <KoFiButton />
        </div>
      </div>
    </footer>
  );
}
