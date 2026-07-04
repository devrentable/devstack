"use client";

import { Download, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  buildDockerComposeApplyCommand,
  buildDockerCompose,
  defaultComposeBuilderState,
  type AppPreset,
  type ComposeBuilderState,
  type DatabasePreset,
  validateComposeState
} from "@/lib/dockerComposeBuilder";

const appOptions: Array<{ value: AppPreset; label: string; volume: string; port: string }> = [
  { value: "wordpress", label: "WordPress", volume: "./wordpress:/var/www/html", port: "8080" },
  { value: "php-apache", label: "PHP + Apache", volume: "./app:/var/www/html", port: "8080" },
  { value: "node", label: "Node.js", volume: "./app:/usr/src/app", port: "3000" },
  { value: "moodle", label: "Moodle", volume: "./moodle:/var/www/html", port: "8080" },
  { value: "magento", label: "Magento", volume: "./magento:/var/www/html", port: "8080" }
];

const databaseOptions: Array<{ value: DatabasePreset; label: string; port: string }> = [
  { value: "mysql", label: "MySQL 8.4", port: "3306" },
  { value: "mariadb", label: "MariaDB 11.4", port: "3306" },
  { value: "postgres", label: "PostgreSQL 16", port: "5432" },
  { value: "none", label: "Sin base de datos", port: "3306" }
];

const phpVersions = ["8.4", "8.3", "8.2", "8.1"];
const nodeVersions = ["24", "22", "20", "18"];
const phpAppPresets: AppPreset[] = ["wordpress", "php-apache", "moodle", "magento"];

export function DockerComposeBuilder() {
  const [state, setState] = useState<ComposeBuilderState>(defaultComposeBuilderState);

  const validations = useMemo(() => validateComposeState(state), [state]);
  const output = useMemo(() => buildDockerCompose(state), [state]);
  const applyCommand = useMemo(() => buildDockerComposeApplyCommand(), []);
  const canUseOutput = validations.length === 0;
  const isPhpProject = phpAppPresets.includes(state.appPreset);
  const isNodeProject = state.appPreset === "node";

  function updateField<Key extends keyof ComposeBuilderState>(field: Key, value: ComposeBuilderState[Key]) {
    setState((current) => ({ ...current, [field]: value }));
  }

  function selectAppPreset(value: AppPreset) {
    const option = appOptions.find((item) => item.value === value);

    setState((current) => ({
      ...current,
      appPreset: value,
      appVolume: option?.volume ?? current.appVolume,
      appPort: option?.port ?? current.appPort
    }));
  }

  function selectDatabase(value: DatabasePreset) {
    const option = databaseOptions.find((item) => item.value === value);

    setState((current) => ({
      ...current,
      database: value,
      databasePort: option?.port ?? current.databasePort,
      includePhpMyAdmin: value === "mysql" || value === "mariadb" ? current.includePhpMyAdmin : false
    }));
  }

  function downloadCompose() {
    if (!canUseOutput) {
      return;
    }

    const blob = new Blob([output], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "docker-compose.yml";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="tool-surface rounded-lg p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Nombre del proyecto
              <input
                className="field h-11 px-3"
                value={state.projectName}
                onChange={(event) => updateField("projectName", event.target.value)}
                placeholder="mi-proyecto"
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Stack de aplicacion
              <select className="field h-11 px-3" value={state.appPreset} onChange={(event) => selectAppPreset(event.target.value as AppPreset)}>
                {appOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {isPhpProject ? (
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

            {isNodeProject ? (
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

            <label className="grid gap-2 text-sm text-slate-300">
              Puerto web local
              <input className="field h-11 px-3" value={state.appPort} onChange={(event) => updateField("appPort", event.target.value)} />
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Base de datos
              <select className="field h-11 px-3" value={state.database} onChange={(event) => selectDatabase(event.target.value as DatabasePreset)}>
                {databaseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Puerto DB local
              <input
                className="field h-11 px-3 disabled:opacity-45"
                disabled={state.database === "none"}
                value={state.databasePort}
                onChange={(event) => updateField("databasePort", event.target.value)}
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Volumen de aplicacion
              <input className="field h-11 px-3" value={state.appVolume} onChange={(event) => updateField("appVolume", event.target.value)} />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Toggle label="Redis" checked={state.includeRedis} onChange={(value) => updateField("includeRedis", value)} />
            <Toggle
              label="phpMyAdmin"
              checked={state.includePhpMyAdmin}
              disabled={state.database === "postgres" || state.database === "none"}
              onChange={(value) => updateField("includePhpMyAdmin", value)}
            />
            <Toggle label="Mailpit" checked={state.includeMailpit} onChange={(value) => updateField("includeMailpit", value)} />
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
              onClick={() => setState(defaultComposeBuilderState)}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
            >
              <RotateCcw size={17} aria-hidden="true" />
              Reset
            </button>
            <button
              type="button"
              onClick={downloadCompose}
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
            <h2 className="text-lg font-semibold text-white">docker-compose.yml</h2>
            <CopyButton value={canUseOutput ? output : ""} label="Copiar YAML" />
          </div>
          <pre className="mono-output min-h-[34rem] rounded-lg border border-slate-800 bg-ink p-4 text-sm leading-6 text-slate-200">
            {output}
          </pre>

          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-white">Aplicar cambios</h2>
              <CopyButton value={applyCommand} label="Copiar comando" />
            </div>
            <pre className="mono-output rounded-lg border border-slate-800 bg-ink p-4 text-sm leading-6 text-slate-200">{applyCommand}</pre>
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
