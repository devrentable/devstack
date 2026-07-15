"use client";

import { RotateCcw, WrapText } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  defaultJsonFormatterState,
  formatJson,
  sampleJson,
  type JsonFormatMode,
  type JsonFormatterState
} from "@/lib/jsonFormatter";

const indentOptions = [2, 4, 8];

export function JsonFormatter() {
  const [state, setState] = useState<JsonFormatterState>(defaultJsonFormatterState);
  const result = useMemo(() => formatJson(state), [state]);
  const hasOutput = Boolean(result.output && !result.error);

  function updateState<Key extends keyof JsonFormatterState>(field: Key, value: JsonFormatterState[Key]) {
    setState((current) => ({ ...current, [field]: value }));
  }

  function useSample() {
    setState((current) => ({ ...current, input: sampleJson }));
  }

  return (
    <div className="tool-surface rounded-lg p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Modo
              <select className="field h-11 px-3" value={state.mode} onChange={(event) => updateState("mode", event.target.value as JsonFormatMode)}>
                <option value="format">Formatear</option>
                <option value="minify">Minificar</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Sangria
              <select
                className="field h-11 px-3"
                value={state.indentSize}
                disabled={state.mode === "minify"}
                onChange={(event) => updateState("indentSize", Number(event.target.value))}
              >
                {indentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} espacios
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-700 bg-ink/55 p-3 text-sm text-slate-200">
            <input type="checkbox" checked={state.sortKeys} onChange={(event) => updateState("sortKeys", event.target.checked)} />
            Ordenar claves alfabeticamente
          </label>

          <label className="grid gap-2 text-sm text-slate-300">
            JSON de entrada
            <textarea
              className="field min-h-[28rem] resize-y p-3 font-mono text-sm leading-6"
              value={state.input}
              onChange={(event) => updateState("input", event.target.value)}
              placeholder='{"status":"ok"}'
              spellCheck={false}
            />
          </label>

          {result.error ? <div className="rounded-lg border border-amber/30 bg-amber/10 p-3 text-sm leading-6 text-amber">{result.error}</div> : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setState(defaultJsonFormatterState)}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
            >
              <RotateCcw size={17} aria-hidden="true" />
              Reset
            </button>
            <button
              type="button"
              onClick={useSample}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
            >
              <WrapText size={17} aria-hidden="true" />
              Ejemplo
            </button>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Resultado</h2>
            <CopyButton value={hasOutput ? result.output : ""} label="Copiar JSON" />
          </div>

          <pre className="mono-output min-h-[34rem] rounded-lg border border-slate-800 bg-ink p-4 text-sm leading-6 text-slate-200">
            {result.output || "El resultado aparecera aqui cuando el JSON sea valido."}
          </pre>

          <div className="grid gap-3 rounded-lg border border-slate-800 bg-ink/55 p-4 text-sm text-slate-300 sm:grid-cols-2">
            <Metric label="Entrada" value={`${result.stats.inputBytes} bytes`} />
            <Metric label="Salida" value={`${result.stats.outputBytes} bytes`} />
            <Metric label="Caracteres" value={String(result.stats.characters)} />
            <Metric label="Lineas" value={String(result.stats.lines)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-base text-white">{value}</p>
    </div>
  );
}
