import Link from "next/link";
import { ArrowRight, Clock3, type LucideIcon } from "lucide-react";

type ToolCardProps = {
  title: string;
  description: string;
  category: string;
  Icon: LucideIcon;
  href?: string;
  status: "available" | "planned";
};

export function ToolCard({ title, description, category, Icon, href, status }: ToolCardProps) {
  const content = (
    <>
      <span>
        <span className="flex items-center justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-slate-700 bg-ink/80 text-accent">
            <Icon size={21} aria-hidden="true" />
          </span>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">{category}</span>
        </span>
        <span className="mt-5 block text-lg font-semibold text-white">{title}</span>
        <span className="mt-2 block text-sm leading-6 text-slate-400">{description}</span>
      </span>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
        {status === "available" ? <ArrowRight size={16} aria-hidden="true" /> : <Clock3 size={16} aria-hidden="true" />}
        {status === "available" ? "Abrir herramienta" : "Proximamente"}
      </span>
    </>
  );

  const className =
    "flex h-full flex-col justify-between rounded-lg border border-slate-700/70 bg-panel/82 p-5 transition hover:border-accent/60";

  if (href && status === "available") {
    return (
      <Link href={href} className={`${className} hover:-translate-y-0.5 hover:bg-panelSoft hover:shadow-glow`}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
