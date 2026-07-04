export type CspDirective =
  | "script-src"
  | "style-src"
  | "img-src"
  | "connect-src"
  | "font-src"
  | "frame-src";

export type CspOutputMode = "header" | "apache" | "nginx";

export type CspGeneratorState = {
  includeSelf: boolean;
  includeUnsafeInline: boolean;
  upgradeInsecureRequests: boolean;
  directives: Record<CspDirective, string>;
  outputMode: CspOutputMode;
};

export const cspDirectives: CspDirective[] = [
  "script-src",
  "style-src",
  "img-src",
  "connect-src",
  "font-src",
  "frame-src"
];

export const defaultCspState: CspGeneratorState = {
  includeSelf: true,
  includeUnsafeInline: false,
  upgradeInsecureRequests: true,
  outputMode: "header",
  directives: {
    "script-src": "",
    "style-src": "",
    "img-src": "data: https:",
    "connect-src": "",
    "font-src": "",
    "frame-src": ""
  }
};

export function buildCspPolicy(state: CspGeneratorState) {
  const policyParts = [
    `default-src ${state.includeSelf ? "'self'" : "'none'"}`,
    ...cspDirectives.map((directive) => buildDirective(directive, state)),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    ...(state.upgradeInsecureRequests ? ["upgrade-insecure-requests"] : [])
  ];

  return policyParts.join("; ");
}

export function buildCspOutput(state: CspGeneratorState) {
  const policy = buildCspPolicy(state);

  if (state.outputMode === "apache") {
    return `<IfModule mod_headers.c>\n  Header always set Content-Security-Policy "${policy}"\n</IfModule>\n`;
  }

  if (state.outputMode === "nginx") {
    return `add_header Content-Security-Policy "${policy}" always;\n`;
  }

  return `Content-Security-Policy: ${policy}\n`;
}

export function validateCspState(state: CspGeneratorState) {
  const warnings: string[] = [];
  const allValues = cspDirectives.flatMap((directive) => splitSourceValues(state.directives[directive]));

  if (state.includeUnsafeInline) {
    warnings.push("'unsafe-inline' reduce la proteccion frente a XSS. Usalo solo si tu stack lo necesita.");
  }

  if (allValues.some((value) => value.includes(";") || value.includes(","))) {
    warnings.push("Separa los dominios con espacios o saltos de linea, no con punto y coma.");
  }

  if (allValues.some((value) => value.startsWith("http://"))) {
    warnings.push("Hay origenes http://. Para produccion suele ser mejor usar https://.");
  }

  return warnings;
}

function buildDirective(directive: CspDirective, state: CspGeneratorState) {
  const values = splitSourceValues(state.directives[directive]);
  const tokens = [
    ...(state.includeSelf ? ["'self'"] : []),
    ...(state.includeUnsafeInline && (directive === "script-src" || directive === "style-src") ? ["'unsafe-inline'"] : []),
    ...values
  ];

  return `${directive} ${tokens.length ? dedupe(tokens).join(" ") : "'none'"}`;
}

function splitSourceValues(value: string) {
  return value
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function dedupe(values: string[]) {
  return Array.from(new Set(values));
}
