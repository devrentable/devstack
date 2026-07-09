import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con DevStack Tools para sugerencias, errores o colaboraciones.",
  alternates: {
    canonical: "/contacto"
  }
};

export default function ContactPage() {
  return (
    <InfoPage
      title="Contacto"
      description="Ideas, errores, sugerencias de herramientas o propuestas de colaboracion son bienvenidas."
    >
      <section className="space-y-3">
        <h2>Email</h2>
        <p>
          Puedes escribir a{" "}
          <a className="inline-flex items-center gap-2" href="mailto:devrentable@gmail.com">
            <Mail size={16} aria-hidden="true" />
            devrentable@gmail.com
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2>Que puedes enviar</h2>
        <ul>
          <li>Errores o comportamientos inesperados en alguna herramienta.</li>
          <li>Ideas para nuevos generadores o utilidades tecnicas.</li>
          <li>Mejoras de usabilidad, textos o ejemplos.</li>
          <li>Propuestas de colaboracion o patrocinio.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>Antes de escribir</h2>
        <p>
          Si vas a reportar un problema, ayuda mucho incluir la herramienta afectada, que esperabas que pasara, que ocurrio realmente
          y, si procede, un ejemplo minimo para reproducirlo.
        </p>
      </section>
    </InfoPage>
  );
}
