# DevStack Tools

DevStack Tools es la home de una futura web de herramientas gratuitas para desarrolladores, sysadmins y equipos que trabajan con WordPress, Magento, Moodle, Apache, Nginx, Docker, JSON e IA.

Esta primera versión no implementa las herramientas todavía. Presenta el catálogo, el posicionamiento del proyecto y un placeholder de monetización preparado para incorporar AdSense más adelante mediante el componente `AdSlot`.

## Stack

- Next.js con TypeScript
- Tailwind CSS
- App Router
- React hooks
- lucide-react para iconos

## Herramientas disponibles

- Docker Compose Builder
- Generador CSP

## Herramientas planificadas

- Generador `.htaccess`
- Formateador y minificador JSON
- Generador de prompts técnicos

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre la URL que muestre Next.js, normalmente:

```txt
http://localhost:3000
```

## Configuracion

El boton de Ko-fi usa `NEXT_PUBLIC_KOFI_URL`. Copia `.env.example` a `.env.local` y cambia la URL si el perfil final es distinto:

```bash
NEXT_PUBLIC_KOFI_URL=https://ko-fi.com/devrentable
```

AdSense usa el publisher `NEXT_PUBLIC_ADSENSE_CLIENT` y un slot por ubicacion. Crea los bloques de anuncio en AdSense, copia sus IDs numericos y configura estas variables en local y en Vercel:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-3980525484161116
NEXT_PUBLIC_ADSENSE_HOME_SLOT=
NEXT_PUBLIC_ADSENSE_CSP_SLOT=
NEXT_PUBLIC_ADSENSE_DOCKER_SLOT=
NEXT_PUBLIC_ADSENSE_HTACCESS_SLOT=
```

Si un slot queda vacio, la web mantiene el placeholder y no intenta llamar a `adsbygoogle.push`.

## Build de producción

```bash
npm run build
```

## Scripts disponibles

- `npm run dev`: arranca el servidor local de desarrollo.
- `npm run build`: compila la app para producción.
- `npm run start`: sirve la build de producción.
- `npm run lint`: ejecuta el linter de Next.js.
