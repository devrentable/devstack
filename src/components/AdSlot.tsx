"use client";

import { useEffect } from "react";

type AdSlotProps = {
  id: string;
  label: string;
  slot?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-3980525484161116";

export function AdSlot({ id, label, slot }: AdSlotProps) {
  const isConfigured = Boolean(adsenseClient && slot);

  useEffect(() => {
    if (!isConfigured) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or an unapproved AdSense site can reject this call.
    }
  }, [isConfigured]);

  if (!isConfigured) {
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

  return (
    <aside
      id={id}
      aria-label={label}
      className="min-h-[120px] rounded-lg border border-slate-800 bg-white/[0.02] px-2 py-3 text-center"
    >
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
