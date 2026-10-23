# Catálogo de pruebas (laid-dev-catalogo)

> Contexto para agentes LAID. Mantenido por el equipo; propuestas de IA marcadas como tales.

## Propósito
Laboratorio sintético de desarrollo para ReservaLab: reserva de salas de oficina.
También sirve como banco de pruebas mínimo para validar el flujo de trabajo de los agentes LAID.

## Stack
- Lenguaje: JavaScript/TypeScript con Astro 5
- Frameworks: Astro, sin frameworks de UI adicionales
- Base de datos / mensajería: ninguna; datos en `src/data/` (JSON)
- Gestor de dependencias: npm

## Comandos
- Instalar: `npm install`
- Dev server: `astro dev` (usar background: `astro dev --background`)
- Build: `npm run build` (`astro build`)
- Preview: `npm run preview` (`astro preview`)
- Test (todos): `npm test` (= `node --test`)
- Test (uno): `node --test tests/<fichero>.test.mjs`
- Lint / formato: no hay configurado todavía

## Estructura
```
src/
  layouts/    layouts de Astro
  pages/      páginas de Astro
  components/ componentes reutilizables
  data/       datos sintéticos (JSON)
  lib/        lógica pura (funciones)
  styles/     CSS global y tokens
public/       activos estáticos
tests/        pruebas node:test
contracts/    contratos y especificaciones
fixtures/     datos de prueba heredados
```

## Convenciones
- Código: ESM; componentes `.astro`; lógica pura en `.mjs`.
- Tests: `node:test` + `node:assert/strict`; solo datos sintéticos de `src/data/`.
- Commits: Conventional Commits + trailers LAID (skill `laid-commit-standard`).
- Ramas / PR: rama de trabajo desde la principal y PR en borrador.

## Contratos y arquitectura
- Contrato de datos en `contracts/reservalab.md` y `src/data/`.
- No hay backend; todo es estático con datos mock.

## LAID
- Metodología: LAID v1.0.
- Tipo de proyecto: laboratorio de producto piloto.
- Modo por defecto: mixta.
- Datos: solo sintéticos; rutas prohibidas: `.env*`, `secrets/`, `prod-data/`.
- Orden de construcción: contrato/firma → tests → implementación.
- Definición de hecho: `npm test` en verde · revisión humana registrada (`Reviewed-by`) · README al día.
- Trazabilidad: commits con trailers LAID.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
