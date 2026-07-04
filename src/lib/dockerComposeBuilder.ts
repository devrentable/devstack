export type AppPreset = "wordpress" | "php-apache" | "node" | "moodle" | "magento";
export type DatabasePreset = "none" | "mysql" | "mariadb" | "postgres";

export type ComposeBuilderState = {
  projectName: string;
  appPreset: AppPreset;
  phpVersion: string;
  nodeVersion: string;
  appPort: string;
  appVolume: string;
  database: DatabasePreset;
  databasePort: string;
  includeRedis: boolean;
  includePhpMyAdmin: boolean;
  includeMailpit: boolean;
};

export type ComposeValidation = {
  field: keyof ComposeBuilderState;
  message: string;
};

const dbImages: Record<Exclude<DatabasePreset, "none">, string> = {
  mysql: "mysql:8.4",
  mariadb: "mariadb:11.4",
  postgres: "postgres:16-alpine"
};

export const defaultComposeBuilderState: ComposeBuilderState = {
  projectName: "devstack-app",
  appPreset: "wordpress",
  phpVersion: "8.3",
  nodeVersion: "22",
  appPort: "8080",
  appVolume: "./app:/var/www/html",
  database: "mysql",
  databasePort: "3306",
  includeRedis: true,
  includePhpMyAdmin: true,
  includeMailpit: false
};

export function validateComposeState(state: ComposeBuilderState): ComposeValidation[] {
  const validations: ComposeValidation[] = [];
  const portPattern = /^\d{2,5}$/;

  if (!/^[a-z0-9][a-z0-9-]*$/i.test(state.projectName.trim())) {
    validations.push({
      field: "projectName",
      message: "Usa solo letras, numeros y guiones en el nombre del proyecto."
    });
  }

  if (!portPattern.test(state.appPort) || Number(state.appPort) > 65535) {
    validations.push({
      field: "appPort",
      message: "El puerto de la aplicacion debe estar entre 10 y 65535."
    });
  }

  if (state.database !== "none" && (!portPattern.test(state.databasePort) || Number(state.databasePort) > 65535)) {
    validations.push({
      field: "databasePort",
      message: "El puerto de base de datos debe estar entre 10 y 65535."
    });
  }

  if (!state.appVolume.includes(":")) {
    validations.push({
      field: "appVolume",
      message: "El volumen debe tener formato origen:destino, por ejemplo ./app:/var/www/html."
    });
  }

  if (state.includePhpMyAdmin && state.database === "postgres") {
    validations.push({
      field: "includePhpMyAdmin",
      message: "phpMyAdmin solo funciona con MySQL o MariaDB."
    });
  }

  if (state.includePhpMyAdmin && state.database === "none") {
    validations.push({
      field: "includePhpMyAdmin",
      message: "phpMyAdmin necesita una base de datos MySQL o MariaDB."
    });
  }

  return validations;
}

export function buildDockerCompose(state: ComposeBuilderState) {
  const lines: string[] = [
    "services:",
    "  app:",
    `    image: ${getAppImage(state)}`,
    `    container_name: ${state.projectName}-app`,
    "    restart: unless-stopped",
    "    ports:",
    `      - \"${state.appPort}:${getAppContainerPort(state.appPreset)}\"`,
    "    volumes:",
    `      - ${state.appVolume}`
  ];

  const appRuntime = getAppRuntime(state.appPreset);

  if (appRuntime.length) {
    lines.push(...appRuntime);
  }

  const dependencies = getDependencies(state);

  if (dependencies.length) {
    lines.push("    depends_on:", ...dependencies.map((service) => `      - ${service}`));
  }

  const environment = getAppEnvironment(state);

  if (environment.length) {
    lines.push("    environment:", ...environment.map((item) => `      ${item}`));
  }

  if (state.database !== "none") {
    addDatabase(lines, state);
  }

  if (state.includeRedis) {
    lines.push(
      "",
      "  redis:",
      "    image: redis:7-alpine",
      `    container_name: ${state.projectName}-redis`,
      "    restart: unless-stopped",
      "    volumes:",
      "      - redis-data:/data"
    );
  }

  if (state.includePhpMyAdmin && (state.database === "mysql" || state.database === "mariadb")) {
    lines.push(
      "",
      "  phpmyadmin:",
      "    image: phpmyadmin:latest",
      `    container_name: ${state.projectName}-phpmyadmin`,
      "    restart: unless-stopped",
      "    ports:",
      "      - \"8081:80\"",
      "    environment:",
      "      PMA_HOST: db",
      "      PMA_PORT: 3306",
      "    depends_on:",
      "      - db"
    );
  }

  if (state.includeMailpit) {
    lines.push(
      "",
      "  mailpit:",
      "    image: axllent/mailpit:latest",
      `    container_name: ${state.projectName}-mailpit`,
      "    restart: unless-stopped",
      "    ports:",
      "      - \"8025:8025\"",
      "      - \"1025:1025\""
    );
  }

  const volumes = getVolumes(state);

  if (volumes.length) {
    lines.push("", "volumes:", ...volumes.map((volume) => `  ${volume}:`));
  }

  return `${lines.join("\n")}\n`;
}

export function buildDockerComposeApplyCommand() {
  return "docker compose up -d --force-recreate app";
}

function getDependencies(state: ComposeBuilderState) {
  const dependencies: string[] = [];

  if (state.database !== "none") {
    dependencies.push("db");
  }

  if (state.includeRedis) {
    dependencies.push("redis");
  }

  if (state.includeMailpit) {
    dependencies.push("mailpit");
  }

  return dependencies;
}

function getAppEnvironment(state: ComposeBuilderState) {
  if (state.database === "postgres") {
    return ["DATABASE_HOST: db", "DATABASE_NAME: app", "DATABASE_USER: app", "DATABASE_PASSWORD: app"];
  }

  if (state.database === "mysql" || state.database === "mariadb") {
    return [
      "WORDPRESS_DB_HOST: db",
      "WORDPRESS_DB_PORT: 3306",
      "WORDPRESS_DB_NAME: app",
      "WORDPRESS_DB_USER: app",
      "WORDPRESS_DB_PASSWORD: app"
    ];
  }

  return [];
}

function getAppImage(state: ComposeBuilderState) {
  if (state.appPreset === "wordpress") {
    return `wordpress:php${state.phpVersion}-apache`;
  }

  if (state.appPreset === "php-apache") {
    return `php:${state.phpVersion}-apache`;
  }

  if (state.appPreset === "node") {
    return `node:${state.nodeVersion}-alpine`;
  }

  if (state.appPreset === "magento") {
    return `magento/magento-cloud-docker-php:${state.phpVersion}-apache`;
  }

  return `moodlehq/moodle-php-apache:${state.phpVersion}`;
}

function getAppContainerPort(appPreset: AppPreset) {
  return appPreset === "node" ? "3000" : "80";
}

function getAppRuntime(appPreset: AppPreset) {
  if (appPreset !== "node") {
    return [];
  }

  return ["    working_dir: /usr/src/app", "    command: sh -c \"npm install && npm run dev\""];
}

function addDatabase(lines: string[], state: ComposeBuilderState) {
  if (state.database === "none") {
    return;
  }

  const isPostgres = state.database === "postgres";
  const image = dbImages[state.database];

  lines.push(
    "",
    "  db:",
    `    image: ${image}`,
    `    container_name: ${state.projectName}-db`,
    "    restart: unless-stopped",
    "    ports:",
    `      - \"${state.databasePort}:${isPostgres ? "5432" : "3306"}\"`,
    "    environment:"
  );

  if (isPostgres) {
    lines.push("      POSTGRES_DB: app", "      POSTGRES_USER: app", "      POSTGRES_PASSWORD: app");
  } else {
    lines.push("      MYSQL_DATABASE: app", "      MYSQL_USER: app", "      MYSQL_PASSWORD: app", "      MYSQL_ROOT_PASSWORD: root");
  }

  lines.push("    volumes:", `      - db-data:${isPostgres ? "/var/lib/postgresql/data" : "/var/lib/mysql"}`);
}

function getVolumes(state: ComposeBuilderState) {
  const volumes: string[] = [];

  if (state.database !== "none") {
    volumes.push("db-data");
  }

  if (state.includeRedis) {
    volumes.push("redis-data");
  }

  return volumes;
}
