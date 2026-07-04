import { Coffee } from "lucide-react";

type KoFiButtonProps = {
  compact?: boolean;
};

const koFiUrl = process.env.NEXT_PUBLIC_KOFI_URL ?? "https://ko-fi.com/devrentable";

export function KoFiButton({ compact = false }: KoFiButtonProps) {
  return (
    <a
      href={koFiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-amber/30 bg-amber/10 px-3 py-2 text-sm font-semibold text-amber transition hover:border-amber/60 hover:bg-amber/20"
    >
      <Coffee size={17} aria-hidden="true" />
      <span className={compact ? "hidden sm:inline" : ""}>Ko-fi</span>
    </a>
  );
}
