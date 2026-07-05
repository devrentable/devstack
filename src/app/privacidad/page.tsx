import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Politica de privacidad",
  description: "Politica de privacidad de DevStack Tools."
};

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Politica de privacidad"
      description="Esta pagina explica que datos puede tratar DevStack Tools y como se usan en el contexto de una web de herramientas gratuitas para desarrollo."
    >
      <section className="space-y-3">
        <h2>Responsable del sitio</h2>
        <p>
          DevStack Tools es un proyecto de DevRentable orientado a ofrecer utilidades tecnicas gratuitas para desarrolladores,
          sysadmins y equipos que trabajan con stacks web locales.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Datos que tratamos</h2>
        <p>
          Las herramientas disponibles se ejecutan en el navegador siempre que sea posible. No enviamos el contenido que introduces
          en los generadores a un backend propio para procesarlo.
        </p>
        <p>
          Como cualquier web publicada en plataformas de hosting, pueden generarse registros tecnicos basicos, como direccion IP,
          navegador, fecha de acceso, URL solicitada o informacion necesaria para seguridad, diagnostico y funcionamiento del servicio.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Cookies, analitica y publicidad</h2>
        <p>
          DevStack Tools puede incorporar servicios de terceros para medir uso, mejorar la web o mostrar publicidad, incluido Google
          AdSense. Estos servicios pueden usar cookies, identificadores o tecnologias similares segun sus propias politicas.
        </p>
        <p>
          Si se activa publicidad personalizada, Google y sus partners pueden usar informacion de visitas anteriores para mostrar
          anuncios relevantes. Puedes consultar y gestionar la personalizacion de anuncios desde la configuracion de anuncios de Google.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Finalidad</h2>
        <ul>
          <li>Prestar y mantener las herramientas publicadas.</li>
          <li>Mejorar la estabilidad, seguridad y rendimiento del sitio.</li>
          <li>Entender que utilidades resultan mas utiles para priorizar nuevas funciones.</li>
          <li>Financiar el proyecto mediante donaciones, patrocinios o publicidad.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>Servicios de terceros</h2>
        <p>
          El sitio puede enlazar o integrar servicios externos como Vercel, Google AdSense, Ko-fi o GitHub. Al interactuar con esos
          servicios, se aplican tambien sus condiciones y politicas de privacidad.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Contacto</h2>
        <p>
          Para dudas sobre privacidad o para solicitar cambios relacionados con tus datos, puedes escribir a{" "}
          <a href="mailto:devrentable@gmail.com">devrentable@gmail.com</a>.
        </p>
      </section>

      <p className="text-sm text-slate-500">Ultima actualizacion: 5 de julio de 2026.</p>
    </InfoPage>
  );
}
