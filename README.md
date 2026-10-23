# ReservaLab

Aplicación demo para consultar, reservar y cancelar salas de oficina.

## Stack

- [Astro](https://astro.build) 5
- JavaScript ESM
- CSS puro con variables
- `node:test` para pruebas de lógica

## Datos

Las salas y las reservas iniciales son datos sintéticos en `src/data/`.
Las reservas creadas o canceladas durante la demo se persisten en `localStorage` del navegador.

## Comandos

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build estático
npm run preview  # preview del build
npm test         # tests de lógica
```

## Alcance

- Tres salas precargadas: Atlas, Luna, Sol.
- Consulta de disponibilidad por fecha.
- Creación de reservas de 30 min a 4 h.
- Listado y cancelación de reservas futuras.
- Modo claro/oscuro.
- Layout responsive.

## Contratos

Ver `contracts/reservalab.md`.
