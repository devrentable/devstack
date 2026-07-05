"use client";

import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  buildHtaccess,
  defaultHtaccessState,
  type CacheProfile,
  type HtaccessGeneratorState,
  type RedirectRule,
  type WwwMode,
  validateHtaccessState
} from "@/lib/htaccessGenerator";

const wwwOptions: Array<{ value: WwwMode; label: string }> = [
  { value: "keep", label: "Mantener dominio" },
  { value: "www", label: "Forzar www" },
  { value: "non-www", label: "Quitar www" }
];

const cacheOptions: Array<{ value: CacheProfile; label: string }> = [
  { value: "none", label: "Sin cache" },
  { value: "basic", label: "Cache basica" },
  { value: "aggressive", label: "Cache agresiva" }
];

export function HtaccessGenerator() {
  const [state, setState] = useState<HtaccessGeneratorState>(defaultHtaccessState);
  const output = useMemo(() => buildHtaccess(state), [state]);
  const warnings = useMemo(() => validateHtaccessState(state), [state]);

  function updateState<Key extends keyof HtaccessGeneratorState>(field: Key, value: HtaccessGeneratorState[Key]) {
    setState((current) => ({ ...current, [field]: value }));
  }

  function updateRedirect(index: number, field: keyof RedirectRule, value: RedirectRule[keyof RedirectRule]) {
    setState((current) => ({
      ...current,
      redirects: current.redirects.map((redirect, redirectIndex) => (redirectIndex === index ? { ...redirect, [field]: value } : redirect))
    }));
  }

  function addRedirect() {
    setState((current) => ({
      ...current,
      redirects: [...current.redirects, { from: "/old-url", to: "/new-url", status: "301" }]
    }));
  }

  function removeRedirect(index: number) {
    setState((current) => ({
      ...current,
      redirects: current.redirects.filter((_, redirectIndex) => redirectIndex !== index)
    }));
  }

  return (
    <div className="tool-surface rounded-lg p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
        <div className="grid gap-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle label="Forzar HTTPS" checked={state.forceHttps} onChange={(value) => updateState("forceHttps", value)} />
            <Toggle label="Permalinks WordPress" checked={state.enableWordPress} onChange={(value) => updateState("enableWordPress", value)} />
            <Toggle
              label="Sin listado de carpetas"
              checked={state.disableDirectoryListing}
              onChange={(value) => updateState("disableDirectoryListing", value)}
            />
            <Toggle label="Proteger dotfiles" checked={state.protectDotFiles} onChange={(value) => updateState("protectDotFiles", value)} />
            <Toggle label="Bloquear XML-RPC" checked={state.blockXmlRpc} onChange={(value) => updateState("blockXmlRpc", value)} />
            <Toggle label="Compresion gzip" checked={state.enableCompression} onChange={(value) => updateState("enableCompression", value)} />
            <Toggle
              label="Headers seguridad"
              checked={state.securityHeaders}
              onChange={(value) => updateState("securityHeaders", value)}
            />
            <Toggle
              label="Proteccion hotlink"
              checked={state.hotlinkProtection}
              onChange={(value) => updateState("hotlinkProtection", value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Modo www
              <select className="field h-11 px-3" value={state.wwwMode} onChange={(event) => updateState("wwwMode", event.target.value as WwwMode)}>
                {wwwOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Cache navegador
              <select
                className="field h-11 px-3"
                value={state.cacheProfile}
                onChange={(event) => updateState("cacheProfile", event.target.value as CacheProfile)}
              >
                {cacheOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              CORS permitido
              <textarea
                className="field min-h-24 resize-y p-3 font-mono text-sm"
                value={state.corsOrigins}
                onChange={(event) => updateState("corsOrigins", event.target.value)}
                placeholder="https://app.example.com"
              />
              <span className="text-xs leading-5 text-slate-500">Un origen por linea. Usa * solo para assets publicos.</span>
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Dominios hotlink permitidos
              <textarea
                className="field min-h-24 resize-y p-3 font-mono text-sm"
                value={state.allowedHotlinkDomains}
                onChange={(event) => updateState("allowedHotlinkDomains", event.target.value)}
                placeholder="example.com&#10;cdn.example.com"
              />
              <span className="text-xs leading-5 text-slate-500">Incluye tu dominio principal si activas proteccion hotlink.</span>
            </label>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-white">Redirecciones</h2>
              <button
                type="button"
                onClick={addRedirect}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
              >
                <Plus size={17} aria-hidden="true" />
                Anadir
              </button>
            </div>

            <div className="grid gap-3">
              {state.redirects.map((redirect, index) => (
                <div key={index} className="grid gap-2 rounded-lg border border-slate-800 bg-ink/55 p-3 sm:grid-cols-[80px_1fr_1fr_40px]">
                  <select
                    className="field h-10 px-2 text-sm"
                    value={redirect.status}
                    onChange={(event) => updateRedirect(index, "status", event.target.value as RedirectRule["status"])}
                    aria-label="Tipo de redireccion"
                  >
                    <option value="301">301</option>
                    <option value="302">302</option>
                  </select>
                  <input
                    className="field h-10 px-3 font-mono text-sm"
                    value={redirect.from}
                    onChange={(event) => updateRedirect(index, "from", event.target.value)}
                    placeholder="/origen"
                    aria-label="Origen"
                  />
                  <input
                    className="field h-10 px-3 font-mono text-sm"
                    value={redirect.to}
                    onChange={(event) => updateRedirect(index, "to", event.target.value)}
                    placeholder="/destino"
                    aria-label="Destino"
                  />
                  <button
                    type="button"
                    onClick={() => removeRedirect(index)}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                    aria-label="Eliminar redireccion"
                  >
                    <Trash2 size={17} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
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
            onClick={() => setState(defaultHtaccessState)}
            className="inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            <RotateCcw size={17} aria-hidden="true" />
            Reset
          </button>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">.htaccess</h2>
            <CopyButton value={output} label="Copiar .htaccess" />
          </div>
          <pre className="mono-output min-h-[42rem] rounded-lg border border-slate-800 bg-ink p-4 text-sm leading-6 text-slate-200">
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
