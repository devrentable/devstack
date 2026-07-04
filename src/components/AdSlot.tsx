type AdSlotProps = {
  id: string;
  label: string;
};

export function AdSlot({ id, label }: AdSlotProps) {
  return (
    <aside
      id={id}
      aria-label={label}
      className="rounded-lg border border-dashed border-slate-600/70 bg-white/[0.03] px-4 py-5 text-center text-sm text-slate-500"
    >
      <span className="block text-xs uppercase tracking-[0.16em] text-slate-600">{label}</span>
      <span className="mt-1 block">Espacio para anuncio</span>
    </aside>
  );
}
