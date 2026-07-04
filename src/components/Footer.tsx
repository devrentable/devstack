import { KoFiButton } from "@/components/KoFiButton";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>DevStack Tools. Herramientas locales, rapidas y sin backend.</p>
        <div className="flex flex-wrap items-center gap-3">
          <p>Apoya el proyecto y ayuda a mantener estas herramientas gratis.</p>
          <KoFiButton />
        </div>
      </div>
    </footer>
  );
}
