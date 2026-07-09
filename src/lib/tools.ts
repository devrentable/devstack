import {
  Bot,
  Braces,
  Container,
  FileBox,
  FileCode2,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";

export type ToolSlug =
  | "generador-htaccess"
  | "generador-csp"
  | "generador-dockerfile"
  | "docker-compose-builder"
  | "formateador-json"
  | "generador-prompts-tecnicos";

export type ToolMeta = {
  slug: ToolSlug;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  categories: string[];
  Icon: LucideIcon;
  href?: string;
  status: "available" | "planned";
};

export const categories = ["Apache", "Nginx", "Docker", "JSON", "IA", "WordPress", "Magento", "Moodle"];

export const tools: ToolMeta[] = [
  {
    slug: "generador-htaccess",
    title: "Generador .htaccess",
    shortTitle: ".htaccess",
    description: "Genera reglas de HTTPS, www, WordPress, redirecciones, CORS, cache, gzip, hotlinking y seguridad basica.",
    category: "Apache",
    categories: ["Apache", "WordPress", "Magento", "Moodle"],
    Icon: FileCode2,
    href: "/tools/generador-htaccess",
    status: "available"
  },
  {
    slug: "generador-csp",
    title: "Generador CSP",
    shortTitle: "CSP",
    description: "Construye politicas CSP para Apache, Nginx o header HTTP con dominios permitidos por directiva.",
    category: "Nginx",
    categories: ["Apache", "Nginx", "WordPress", "Magento", "Moodle"],
    Icon: ShieldCheck,
    href: "/tools/generador-csp",
    status: "available"
  },
  {
    slug: "docker-compose-builder",
    title: "Docker Compose Builder",
    shortTitle: "Docker Compose",
    description: "Crea un docker-compose.yml para stacks locales con app, base de datos, Redis, phpMyAdmin y Mailpit.",
    category: "Docker",
    categories: ["Docker"],
    Icon: Container,
    href: "/tools/docker-compose-builder",
    status: "available"
  },
  {
    slug: "generador-dockerfile",
    title: "Generador Dockerfile",
    shortTitle: "Dockerfile",
    description: "Genera Dockerfiles para Node.js, PHP + Apache, Python y frontends estaticos con Nginx.",
    category: "Docker",
    categories: ["Docker"],
    Icon: FileBox,
    href: "/tools/generador-dockerfile",
    status: "available"
  },
  {
    slug: "formateador-json",
    title: "Formateador JSON",
    shortTitle: "JSON",
    description: "Planificado para validar, formatear y minificar JSON en el navegador.",
    category: "JSON",
    categories: ["JSON", "IA"],
    Icon: Braces,
    status: "planned"
  },
  {
    slug: "generador-prompts-tecnicos",
    title: "Generador de prompts tecnicos",
    shortTitle: "Prompts",
    description: "Planificado para crear prompts tecnicos claros para Codex o ChatGPT.",
    category: "IA",
    categories: ["IA", "WordPress", "Magento", "Moodle", "Docker", "Apache", "Nginx"],
    Icon: Bot,
    status: "planned"
  }
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
