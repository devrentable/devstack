"use client";

import { Download, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  buildDockerfile,
  buildDockerfileBuildCommand,
  buildDockerfileRunCommand,
  defaultDockerfileGeneratorState,
  getPresetDefaults,
  type DockerfileGeneratorState,
  type DockerfilePreset,
  type PackageManager,
  validateDockerfileState
} from "@/lib/dockerfileGenerator";

const presetOptions: Array<{ value: DockerfilePreset; label: string }> = [
  { value: "node", label: "Node.js" },
  { value: "php-apache", label: "PHP + Apache" },
  { value: "python", label: "Python" },
  { value: "static-nginx", label: "Frontend estatico + Nginx" }
];

const nodeVersions = ["24", "22", "20", "18"];
const phpVersions = ["8.4", "8.3", "8.2", "8.1"];
const pythonVersions = ["3.13", "3.12", "3.11", "3.10"];
const packageManagers: Array<{ value: PackageManager; label: string }> = [
  { value: "npm", label: "npm" },
  { value: "pnpm", label: "pnpm" },
  { value: "yarn", label: "Yarn" }
];

export function DockerfileGenerator() {
  const [state, setState] = useState<DockerfileGeneratorState>(defaultDockerfileGeneratorState);

  const validations = useMemo(() => validateDockerfileState(state), [state]);
  const output = useMemo(() => buildDockerfile(state), [state]);
  const buildCommand = useMemo(() => buildDockerfileBuildCommand(state), [state]);
  const runCommand = useMemo(() => buildDockerfileRunCommand(state), [state]);
  const canUseOutput = validations.length === 0;
  const isNodeLike = state.preset === "node" || state.preset === "static-nginx";
  const canEditStart = state.preset === "node" || state.preset === "python";
  const canEditBuild = state.preset === "node" || state.preset === "static-nginx";

  function updateField<Key extends keyof DockerfileGeneratorState>(field: Key, value: DockerfileGeneratorState[Key]) {
    setState((current) => ({ ...current, [field]: value }));
  }

  function selectPreset(value: DockerfilePreset) {
    setState((current) => ({ ...current, ...getPresetDefaults(value) }));
  }

  function downloadDockerfile() {
    if (!canUseOutput) {
      return;
    }

    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Dockerfile";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="tool-surface rounded-lg p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Nombre de imagen
              <input
                className="field h-11 px-3"
                value={state.imageName}
                onChange={(event) => updateField("imageName", event.target.value)}
                placeholder="mi-app"
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Tipo de proyecto
              <select className="field h-11 px-3" value={state.preset} onChange={(event) => selectPreset(event.target.value as DockerfilePreset)}>
                {presetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {isNodeLike ? (
              <label className="grid gap-2 text-sm text-slate-300">
                Version de Node
                <select className="field h-11 px-3" value={state.nodeVersion} onChange={(event) => updateField("nodeVersion", event.target.value)}>
                  {nodeVersions.map((version) => (
                    <option key={version} value={version}>
                      Node {version}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            {state.preset === "php-apache" ? (
              <label className="grid gap-2 text-sm text-slate-300">
                Version de PHP
                <select className="field h-11 px-3" value={state.phpVersion} onChange={(event) => updateField("phpVersion", event.target.value)}>
                  {phpVersions.map((version) => (
                    <option key={version} value={version}>
                      PHP {version}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            {state.preset === "python" ? (
              <label className="grid gap-2 text-sm text-slate-300">
                Version de Python
                <select className="field h-11 px-3" value={state.pythonVersion} onChange={(event) => updateField("pythonVersion", event.target.value)}>
                  {pythonVersions.map((version) => (
                    <option key={version} value={version}>
                      Python {version}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <label className="grid gap-2 text-sm text-slate-300">
              Puerto expuesto
              <input className="field h-11 px-3" value={state.appPort} onChange={(event) => updateField("appPort", event.target.value)} />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Directorio de trabajo
              <input className="field h-11 px-3" value={state.workdir} onChange={(event) => updateField("workdir", event.target.value)} />
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Directorio origen
              <input className="field h-11 px-3" value={state.sourceDir} onChange={(event) => updateField("sourceDir", event.target.value)} />
            </label>
          </div>

          {isNodeLike ? (
            <label className="grid gap-2 text-sm text-slate-300">
              Gestor de paquetes
              <select className="field h-11 px-3" value={state.packageManager} onChange={(event) => updateField("packageManager", event.target.value as PackageManager)}>
                {packageManagers.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="grid gap-4">
            {(isNodeLike || state.preset === "python") ? (
              <label className="grid gap-2 text-sm text-slate-300">
                Comando de instalacion
                <input className="field h-11 px-3" value={state.installCommand} onChange={(event) => updateField("installCommand", event.target.value)} />
              </label>
            ) : null}

            {canEditBuild ? (
              <label className="grid gap-2 text-sm text-slate-300">
                Comando de build
                <input className="field h-11 px-3" value={state.buildCommand} onChange={(event) => updateField("buildCommand", event.target.value)} />
              </label>
            ) : null}

            {canEditStart ? (
              <label className="grid gap-2 text-sm text-slate-300">
                Comando de arranque
                <input className="field h-11 px-3" value={state.startCommand} onChange={(event) => updateField("startCommand", event.target.value)} />
              </label>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Toggle
              label="Multi-stage"
              checked={state.includeBuildStage}
              disabled={state.preset === "python" || state.preset === "php-apache" || state.preset === "static-nginx"}
              onChange={(value) => updateField("includeBuildStage", value)}
            />
            <Toggle
              label="Usuario app"
              checked={state.includeNonRootUser}
              disabled={state.preset === "php-apache" || state.preset === "static-nginx"}
              onChange={(value) => updateField("includeNonRootUser", value)}
            />
            <Toggle label="Healthcheck" checked={state.includeHealthcheck} onChange={(value) => updateField("includeHealthcheck", value)} />
          </div>

          {validations.length ? (
            <div className="rounded-lg border border-amber/30 bg-amber/10 p-3 text-sm leading-6 text-amber">
              {validations.map((validation) => (
                <p key={`${validation.field}-${validation.message}`}>{validation.message}</p>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setState(defaultDockerfileGeneratorState)}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
            >
              <RotateCcw size={17} aria-hidden="true" />
              Reset
            </button>
            <button
              type="button"
              onClick={downloadDockerfile}
              disabled={!canUseOutput}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Download size={17} aria-hidden="true" />
              Descargar
            </button>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Dockerfile</h2>
            <CopyButton value={canUseOutput ? output : ""} label="Copiar Dockerfile" />
          </div>
          <pre className="mono-output min-h-[34rem] rounded-lg border border-slate-800 bg-ink p-4 text-sm leading-6 text-slate-200">{output}</pre>

          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-white">Build y run</h2>
              <CopyButton value={`${buildCommand}\n${runCommand}`} label="Copiar comandos" />
            </div>
            <pre className="mono-output rounded-lg border border-slate-800 bg-ink p-4 text-sm leading-6 text-slate-200">
              {buildCommand}
              {"\n"}
              {runCommand}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  disabled = false,
  onChange
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-700 bg-ink/55 p-3 text-sm text-slate-200">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} />
      <span className={disabled ? "text-slate-500" : ""}>{label}</span>
    </label>
  );
}
