export type JsonFormatMode = "format" | "minify";

export type JsonFormatterState = {
  input: string;
  mode: JsonFormatMode;
  indentSize: number;
  sortKeys: boolean;
};

export type JsonFormatterResult = {
  output: string;
  error: string | null;
  stats: {
    inputBytes: number;
    outputBytes: number;
    characters: number;
    lines: number;
  };
};

export const sampleJson = `{
  "name": "devstack-tools",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "features": ["format", "minify", "validate"]
}`;

export const defaultJsonFormatterState: JsonFormatterState = {
  input: sampleJson,
  mode: "format",
  indentSize: 2,
  sortKeys: false
};

export function formatJson(state: JsonFormatterState): JsonFormatterResult {
  const rawInput = state.input.trim();

  if (!rawInput) {
    return buildResult("", "Pega un JSON para validarlo, formatearlo o minificarlo.", state.input);
  }

  try {
    const parsed = JSON.parse(rawInput) as unknown;
    const normalized = state.sortKeys ? sortJsonKeys(parsed) : parsed;
    const output = state.mode === "minify" ? JSON.stringify(normalized) : JSON.stringify(normalized, null, state.indentSize);

    return buildResult(output, null, state.input);
  } catch (error) {
    return buildResult("", getJsonErrorMessage(error), state.input);
  }
}

function buildResult(output: string, error: string | null, input: string): JsonFormatterResult {
  return {
    output,
    error,
    stats: {
      inputBytes: getByteLength(input),
      outputBytes: getByteLength(output),
      characters: output.length,
      lines: output ? output.split("\n").length : 0
    }
  };
}

function sortJsonKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonKeys);
  }

  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort((first, second) => first.localeCompare(second))
      .reduce<Record<string, unknown>>((sorted, key) => {
        sorted[key] = sortJsonKeys((value as Record<string, unknown>)[key]);
        return sorted;
      }, {});
  }

  return value;
}

function getByteLength(value: string) {
  return new TextEncoder().encode(value).length;
}

function getJsonErrorMessage(error: unknown) {
  if (error instanceof SyntaxError && error.message) {
    return `JSON invalido: ${error.message}`;
  }

  return "JSON invalido: revisa comillas, comas, llaves y corchetes.";
}
