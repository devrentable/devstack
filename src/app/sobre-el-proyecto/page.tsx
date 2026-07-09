import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Sobre el proyecto",
  description: "Conoce el objetivo de DevStack Tools.",
  alternates: {
    canonical: "/sobre-el-proyecto"
  }
};

export default function AboutPage() {
  return (
    <InfoPage
      title="Sobre el proyecto"
      description="DevStack Tools nace para reunir pequenas herramientas tecnicas que ahorran tiempo en tareas repetitivas del trabajo web diario."
    >
      <section className="space-y-3">
        <h2>Que es DevStack Tools</h2>
        <p>
          DevStack Tools es una coleccion de utilidades gratuitas para desarrolladores, sysadmins, makers y equipos que trabajan con
          Docker, WordPress, Apache, Nginx, JSON, IA y stacks locales.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Por que existe</h2>
        <p>
          Muchas tareas tecnicas pequenas se repiten una y otra vez: preparar un docker-compose, montar una politica CSP, generar
          configuraciones base o validar fragmentos. La idea del proyecto es convertir esas tareas en herramientas directas,
          rapidas y faciles de usar.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Principios</h2>
        <ul>
          <li>Herramientas practicas antes que paginas de marketing.</li>
          <li>Interfaces claras que funcionen bien en escritorio y movil.</li>
          <li>Procesamiento local en el navegador cuando sea razonable.</li>
          <li>Ejemplos utiles para proyectos reales, especialmente en entornos web y WordPress.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>Financiacion</h2>
        <p>
          El proyecto puede sostenerse con donaciones y patrocinios. Ese apoyo ayuda a mantener las herramientas gratis y a
          priorizar nuevas utilidades.
        </p>
      </section>
    </InfoPage>
  );
}
