# DevStack Tools

DevStack Tools es la home de una futura web de herramientas gratuitas para desarrolladores, sysadmins y equipos que trabajan con WordPress, Magento, Moodle, Apache, Nginx, Docker, JSON e IA.

Esta primera versión presenta el catálogo, el posicionamiento del proyecto y las primeras herramientas disponibles.

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

## Build de producción

```bash
npm run build
```

## Scripts disponibles

- `npm run dev`: arranca el servidor local de desarrollo.
- `npm run build`: compila la app para producción.
- `npm run start`: sirve la build de producción.
- `npm run lint`: ejecuta el linter de Next.js.
