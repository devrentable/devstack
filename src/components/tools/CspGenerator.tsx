"use client";

import { RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  buildCspOutput,
  cspDirectives,
  defaultCspState,
  type CspDirective,
  type CspGeneratorState,
  type CspOutputMode,
  validateCspState
} from "@/lib/cspGenerator";

const directiveLabels: Record<CspDirective, string> = {
  "script-src": "Scripts",
  "style-src": "Estilos",
  "img-src": "Imagenes",
  "connect-src": "Conexiones",
  "font-src": "Fuentes",
  "frame-src": "Frames"
};

const directiveHelp: Record<CspDirective, string> = {
  "script-src": "CDNs de JS, analytics o scripts externos.",
  "style-src": "CDNs de CSS, fuentes o estilos externos.",
  "img-src": "Dominios de imagenes, data: o https:.",
  "connect-src": "APIs, endpoints, websockets o servicios externos.",
  "font-src": "Google Fonts, CDNs de fuentes o assets propios.",
  "frame-src": "YouTube, Stripe, mapas o embeds permitidos."
};

export function CspGenerator() {
  const [state, setState] = useState<CspGeneratorState>(defaultCspState);
  const output = useMemo(() => buildCspOutput(state), [state]);
  const warnings = useMemo(() => validateCspState(state), [state]);

  function updateDirective(directive: CspDirective, value: string) {
    setState((current) => ({
      ...current,
      directives: {
        ...current.directives,
        [directive]: value
      }
    }));
  }

  function updateState<Key extends keyof CspGeneratorState>(field: Key, value: CspGeneratorState[Key]) {
    setState((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="tool-surface rounded-lg p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
        <div className="grid gap-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Toggle label="Incluir 'self'" checked={state.includeSelf} onChange={(value) => updateState("includeSelf", value)} />
            <Toggle
              label="Permitir 'unsafe-inline'"
              checked={state.includeUnsafeInline}
              onChange={(value) => updateState("includeUnsafeInline", value)}
            />
            <Toggle
              label="Upgrade insecure"
              checked={state.upgradeInsecureRequests}
              onChange={(value) => updateState("upgradeInsecureRequests", value)}
            />
          </div>

          <label className="grid gap-2 text-sm text-slate-300">
            Formato de salida
            <select
              className="field h-11 px-3"
              value={state.outputMode}
              onChange={(event) => updateState("outputMode", event.target.value as CspOutputMode)}
            >
              <option value="header">Header HTTP</option>
              <option value="apache">Apache .htaccess</option>
              <option value="nginx">Nginx</option>
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            {cspDirectives.map((directive) => (
              <label key={directive} className="grid gap-2 text-sm text-slate-300">
                <span>
                  {directiveLabels[directive]}
                  <span className="ml-2 text-xs text-slate-500">{directive}</span>
                </span>
                <textarea
                  className="field min-h-24 resize-y p-3 font-mono text-sm"
                  value={state.directives[directive]}
                  onChange={(event) => updateDirective(directive, event.target.value)}
                  placeholder="https://cdn.example.com"
                />
                <span className="text-xs leading-5 text-slate-500">{directiveHelp[directive]}</span>
              </label>
            ))}
          </div>

          {warnings.length ? (
            <div className="rounded-lg border border-amber/30 bg-amber/10 p-3 text-sm leading-6 text-amber">
              {warnings.map((warning) => (
                <p key={warning}>{warning}</p>
              ))}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setState(defaultCspState)}
            className="inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            <RotateCcw size={17} aria-hidden="true" />
            Reset
          </button>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Content-Security-Policy</h2>
            <CopyButton value={output} label="Copiar CSP" />
          </div>
          <pre className="mono-output min-h-[34rem] rounded-lg border border-slate-800 bg-ink p-4 text-sm leading-6 text-slate-200">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-700 bg-ink/55 p-3 text-sm text-slate-200">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}
