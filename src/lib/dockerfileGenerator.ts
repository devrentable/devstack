export type DockerfilePreset = "node" | "php-apache" | "python" | "static-nginx";
export type PackageManager = "npm" | "pnpm" | "yarn";

export type DockerfileGeneratorState = {
  imageName: string;
  preset: DockerfilePreset;
  nodeVersion: string;
  phpVersion: string;
  pythonVersion: string;
  packageManager: PackageManager;
  workdir: string;
  sourceDir: string;
  appPort: string;
  installCommand: string;
  buildCommand: string;
  startCommand: string;
  includeBuildStage: boolean;
  includeNonRootUser: boolean;
  includeHealthcheck: boolean;
};

export type DockerfileValidation = {
  field: keyof DockerfileGeneratorState;
  message: string;
};

export const defaultDockerfileGeneratorState: DockerfileGeneratorState = {
  imageName: "devstack-app",
  preset: "node",
  nodeVersion: "22",
  phpVersion: "8.3",
  pythonVersion: "3.12",
  packageManager: "npm",
  workdir: "/app",
  sourceDir: ".",
  appPort: "3000",
  installCommand: "npm ci",
  buildCommand: "npm run build",
  startCommand: "npm start",
  includeBuildStage: true,
  includeNonRootUser: true,
  includeHealthcheck: true
};

export function validateDockerfileState(state: DockerfileGeneratorState): DockerfileValidation[] {
  const validations: DockerfileValidation[] = [];
  const portPattern = /^\d{2,5}$/;

  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(state.imageName.trim())) {
    validations.push({
      field: "imageName",
      message: "Usa solo letras, numeros, puntos, guiones y guiones bajos en el nombre de imagen."
    });
  }

  if (!state.workdir.startsWith("/")) {
    validations.push({
      field: "workdir",
      message: "El directorio de trabajo debe ser una ruta absoluta, por ejemplo /app."
    });
  }

  if (!state.sourceDir.trim()) {
    validations.push({
      field: "sourceDir",
      message: "Indica el directorio de origen que se copiara dentro de la imagen."
    });
  }

  if (!portPattern.test(state.appPort) || Number(state.appPort) > 65535) {
    validations.push({
      field: "appPort",
      message: "El puerto debe estar entre 10 y 65535."
    });
  }

  if ((state.preset === "node" || state.preset === "static-nginx") && !state.installCommand.trim()) {
    validations.push({
      field: "installCommand",
      message: "Indica el comando de instalacion de dependencias."
    });
  }

  if ((state.preset === "node" || state.preset === "python") && !state.startCommand.trim()) {
    validations.push({
      field: "startCommand",
      message: "Indica el comando de arranque de la aplicacion."
    });
  }

  if (state.preset === "static-nginx" && !state.buildCommand.trim()) {
    validations.push({
      field: "buildCommand",
      message: "Indica el comando que genera los assets estaticos."
    });
  }

  return validations;
}

export function buildDockerfile(state: DockerfileGeneratorState) {
  if (state.preset === "php-apache") {
    return buildPhpApacheDockerfile(state);
  }

  if (state.preset === "python") {
    return buildPythonDockerfile(state);
  }

  if (state.preset === "static-nginx") {
    return buildStaticNginxDockerfile(state);
  }

  return buildNodeDockerfile(state);
}

export function buildDockerfileBuildCommand(state: DockerfileGeneratorState) {
  return `docker build -t ${state.imageName}:latest .`;
}

export function buildDockerfileRunCommand(state: DockerfileGeneratorState) {
  return `docker run --rm -p ${state.appPort}:${state.appPort} ${state.imageName}:latest`;
}

export function getPresetDefaults(preset: DockerfilePreset): Partial<DockerfileGeneratorState> {
  if (preset === "php-apache") {
    return {
      preset,
      workdir: "/var/www/html",
      appPort: "80",
      installCommand: "",
      buildCommand: "",
      startCommand: "",
      includeBuildStage: false,
      includeNonRootUser: false
    };
  }

  if (preset === "python") {
    return {
      preset,
      workdir: "/app",
      appPort: "8000",
      installCommand: "pip install --no-cache-dir -r requirements.txt",
      buildCommand: "",
      startCommand: "python app.py",
      includeBuildStage: false,
      includeNonRootUser: true
    };
  }

  if (preset === "static-nginx") {
    return {
      preset,
      workdir: "/app",
      appPort: "80",
      installCommand: "npm ci",
      buildCommand: "npm run build",
      startCommand: "",
      includeBuildStage: true,
      includeNonRootUser: false
    };
  }

  return {
    preset,
    workdir: "/app",
    appPort: "3000",
    installCommand: "npm ci",
    buildCommand: "npm run build",
    startCommand: "npm start",
    includeBuildStage: true,
    includeNonRootUser: true
  };
}

function buildNodeDockerfile(state: DockerfileGeneratorState) {
  if (!state.includeBuildStage) {
    return [
      `FROM node:${state.nodeVersion}-alpine`,
      "",
      `WORKDIR ${state.workdir}`,
      getPackageManagerSetup(state),
      "COPY package*.json ./",
      `RUN ${state.installCommand}`,
      `COPY ${state.sourceDir} .`,
      "",
      ...getNonRootUserLines(state),
      `EXPOSE ${state.appPort}`,
      ...getHealthcheckLines(state, "node"),
      `CMD ${toShellCommand(state.startCommand)}`
    ]
      .filter(Boolean)
      .join("\n")
      .concat("\n");
  }

  return [
    `FROM node:${state.nodeVersion}-alpine AS deps`,
    `WORKDIR ${state.workdir}`,
    getPackageManagerSetup(state),
    "COPY package*.json ./",
    `RUN ${state.installCommand}`,
    "",
    `FROM node:${state.nodeVersion}-alpine AS builder`,
    `WORKDIR ${state.workdir}`,
    getPackageManagerSetup(state),
    `COPY --from=deps ${state.workdir}/node_modules ./node_modules`,
    `COPY ${state.sourceDir} .`,
    `RUN ${state.buildCommand}`,
    "",
    `FROM node:${state.nodeVersion}-alpine AS runner`,
    "ENV NODE_ENV=production",
    `WORKDIR ${state.workdir}`,
    `COPY --from=builder ${state.workdir} ./`,
    "",
    ...getNonRootUserLines(state),
    `EXPOSE ${state.appPort}`,
    ...getHealthcheckLines(state, "node"),
    `CMD ${toShellCommand(state.startCommand)}`
  ]
    .filter(Boolean)
    .join("\n")
    .concat("\n");
}

function buildPhpApacheDockerfile(state: DockerfileGeneratorState) {
  return [
    `FROM php:${state.phpVersion}-apache`,
    "",
    "RUN apt-get update \\",
    "    && apt-get install -y --no-install-recommends \\",
    "        libzip-dev \\",
    "        unzip \\",
    "    && docker-php-ext-install pdo_mysql mysqli zip opcache \\",
    "    && a2enmod rewrite headers \\",
    "    && rm -rf /var/lib/apt/lists/*",
    "",
    `WORKDIR ${state.workdir}`,
    `COPY ${state.sourceDir} ${state.workdir}`,
    "RUN chown -R www-data:www-data /var/www/html",
    "",
    `EXPOSE ${state.appPort}`,
    ...getHealthcheckLines(state, "php-apache"),
    "CMD [\"apache2-foreground\"]"
  ]
    .filter(Boolean)
    .join("\n")
    .concat("\n");
}

function buildPythonDockerfile(state: DockerfileGeneratorState) {
  return [
    `FROM python:${state.pythonVersion}-slim`,
    "",
    "ENV PYTHONDONTWRITEBYTECODE=1",
    "ENV PYTHONUNBUFFERED=1",
    "",
    `WORKDIR ${state.workdir}`,
    "COPY requirements*.txt ./",
    `RUN ${state.installCommand}`,
    `COPY ${state.sourceDir} .`,
    "",
    ...getNonRootUserLines(state),
    `EXPOSE ${state.appPort}`,
    ...getHealthcheckLines(state, "python"),
    `CMD ${toShellCommand(state.startCommand)}`
  ]
    .filter(Boolean)
    .join("\n")
    .concat("\n");
}

function buildStaticNginxDockerfile(state: DockerfileGeneratorState) {
  return [
    `FROM node:${state.nodeVersion}-alpine AS builder`,
    `WORKDIR ${state.workdir}`,
    getPackageManagerSetup(state),
    "COPY package*.json ./",
    `RUN ${state.installCommand}`,
    `COPY ${state.sourceDir} .`,
    `RUN ${state.buildCommand}`,
    "",
    "FROM nginx:1.27-alpine",
    `COPY --from=builder ${state.workdir}/dist /usr/share/nginx/html`,
    "",
    `EXPOSE ${state.appPort}`,
    ...getHealthcheckLines(state, "static-nginx"),
    "CMD [\"nginx\", \"-g\", \"daemon off;\"]"
  ]
    .filter(Boolean)
    .join("\n")
    .concat("\n");
}

function getPackageManagerSetup(state: DockerfileGeneratorState) {
  if (state.packageManager === "pnpm") {
    return "RUN corepack enable pnpm";
  }

  if (state.packageManager === "yarn") {
    return "RUN corepack enable yarn";
  }

  return "";
}

function getNonRootUserLines(state: DockerfileGeneratorState) {
  if (!state.includeNonRootUser) {
    return [];
  }

  return ["RUN addgroup -S app && adduser -S app -G app", "USER app"];
}

function getHealthcheckLines(state: DockerfileGeneratorState, preset: DockerfilePreset) {
  if (!state.includeHealthcheck) {
    return [];
  }

  if (preset === "php-apache") {
    return [`HEALTHCHECK --interval=30s --timeout=3s CMD php -r "fsockopen('127.0.0.1', ${state.appPort}) || exit(1);" || exit 1`];
  }

  if (preset === "python") {
    return [`HEALTHCHECK --interval=30s --timeout=3s CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:${state.appPort}/')" || exit 1`];
  }

  return [`HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:${state.appPort}/ || exit 1`];
}

function toShellCommand(command: string) {
  return `[\"sh\", \"-c\", ${JSON.stringify(command)}]`;
}
