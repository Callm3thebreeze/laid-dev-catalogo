# Catálogo de pruebas (laid-dev-catalogo)

> Contexto para agentes LAID. Mantenido por el equipo; propuestas de IA marcadas como tales.

## Propósito
Laboratorio sintético de desarrollo: no es un producto, es un banco de pruebas mínimo para
validar el flujo de trabajo de los agentes LAID (tareas pequeñas, verificables y trazables).

## Stack
- Lenguaje: JavaScript ESM sobre Node.js (versión no fijada en el repo) (?)
- Frameworks: ninguno; solo la librería estándar
- Base de datos / mensajería: ninguna; datos en `fixtures/` (JSON)
- Gestor de dependencias: ninguno (`package.json` sin `dependencies`)

## Comandos
- Instalar: no aplica (sin dependencias)
- Build: no existe
- Test (todos): `npm test` (= `node --test`)
- Test (uno): `node --test tests/version.test.mjs`
- Lint / formato: `npm run lint` y `npm run typecheck` son solo `node --check src/version.mjs`
  (comprobación de sintaxis del módulo existente; no cubre módulos nuevos)

## Estructura
```
src/        código de producción (hoy solo version.mjs)
tests/      pruebas node:test (*.test.mjs)
fixtures/   datos sintéticos (products.json)
```

## Convenciones
- Código: ESM con `export`; ficheros `.mjs`; sin dependencias externas.
- Tests: `node:test` + `node:assert/strict`, en `tests/`, nombre `<modulo>.test.mjs`;
  solo datos sintéticos de `fixtures/`.
- Commits: Conventional Commits + trailers LAID (skill `laid-commit-standard`).
- Ramas / PR: rama de trabajo desde la principal y PR en borrador (skill `laid-git-hygiene`) (?).

## Contratos y arquitectura
- No hay `contracts/`, OpenAPI, esquemas ni ADR en el repositorio (?).
- `fixtures/products.json` es la única forma de dato de entrada: `[{sku, title, stock}]`, con
  valores sucios a propósito (`" B-2 "`, `title` con espacios, `stock: 0`).

## LAID
- Metodología: LAID v1.0 (skill `laid-methodology`) · AIWA: `opencode.jsonc` heredado de la raíz
  del workspace (sin `opencode.jsonc` local).
- Tipo de proyecto: laboratorio / banco de pruebas, no un producto con alcance (?).
- Modo por defecto: mixta · se decide por tarea con la rúbrica de verificabilidad.
- Delegable (`agente`/`mixta`): funciones puras en `src/` sobre `fixtures/`, tests `node:test`,
  README.
- Solo manual: no hay zonas críticas identificadas en el repo; si se añade auth/pagos/crypto,
  pasan a `manual` (?).
- Datos: solo sintéticos · fixtures en `fixtures/` · rutas prohibidas: `.env*`, `secrets/`,
  `prod-data/`.
- Orden de construcción: contrato/firma de la función → tests con `fixtures/` → implementación.
- Definición de hecho: `npm test` en verde · revisión humana registrada (`Reviewed-by`) ·
  cobertura mínima no acordada (?) · README al día · validación del PO (?).
- Validan: desarrollo (?) · sénior en modo `agente` (?) · calidad (?) · PO (?).
- Trazabilidad: commits con trailers LAID (skill `laid-commit-standard`); resúmenes marcados como
  propuesta de IA.

## Preguntas abiertas
- Versión exacta de Node.js soportada (?): no está fijada en `package.json` ni en CI.
- No hay CI configurada; ¿se añade un workflow mínimo que ejecute `npm test`? (?)
- No hay tracker `.laid/backlog-project.json` en este proyecto: ¿las tareas viven en el Jira de la
  app de reserva de espacios o el laboratorio tiene su propio proyecto? (?)
- Cobertura mínima y personas que validan cada modo (?).
