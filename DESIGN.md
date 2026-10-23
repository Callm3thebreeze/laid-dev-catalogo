# Design System — ReservaLab

Estado: Borrador. Reglas marcadas como **Confirmadas** (declaración humana),
**Propuestas por IA** o **Pendientes**.

## Product & Direction

- **Objetivo y público**: ReservaLab, aplicación para que los empleados consulten la
  disponibilidad de tres salas de oficina (Atlas, Luna y Sol), reserven una para una
  fecha y horario, y consulten o cancelen sus propias reservas futuras. — _Confirmada_.
- **Alcance primera versión**: tres salas precargadas, consulta de disponibilidad,
  creación de reservas (30 min–4 h), consulta y cancelación de reservas propias futuras.
  Quedan fuera: equipos, administración, reservas recurrentes, notificaciones y
  calendarios externos. — _Confirmada_ (épica LAID1-1).
- **Personalidad / dirección visual**: sobria, legible, sin decoración; referencia
  **Notion** con **acento azul pastel** y **fondo crema claro en lugar de blanco**.
  Prioriza la información; sin marketing. — _Confirmada_.
- **Estilos a evitar**: blanco puro como fondo principal, azul pastel como color de
  texto, sombras marcadas, animaciones innecesarias. — _Propuesta por IA_.
- **Alcance del documento**: sistema y guías; decisiones particulares de pantallas,
  en sus tareas.

## Brand identity

- **Nombre**: ReservaLab. — _Confirmada_.
- **Logo**: Pendiente (la persona indicará si existe logo). — _Pendiente_.
- Los colores y tipografías de marca definitivos sustituirán a las propuestas de
  este documento cuando se conozcan.

## References

| Fuente                     | Aspecto que aporta                                          | Estado     |
| -------------------------- | ----------------------------------------------------------- | ---------- |
| Notion (referencia verbal) | Jerarquía limpia, sobriedad, layout utilitario              | Confirmada |
| Marca ReservaLab           | Nombre confirmado; logo y, si los hubiera, colores de marca | Pendiente  |

> No se inspeccionó captura ni web concreta de Notion: la referencia es de apariencia
> general (layout, sobriedad), no una medición exacta de sus colores o tipografías.

## Colors

| Token semántico      | Función                                  | HEX       | Estado           |
| -------------------- | ---------------------------------------- | --------- | ---------------- |
| background           | Fondo principal (crema claro)            | `#FAF6EF` | Propuesta por IA |
| surface              | Superficies elevadas (tarjetas, modales) | `#FFFFFF` | Propuesta por IA |
| text-primary         | Texto principal                          | `#37352F` | Propuesta por IA |
| text-secondary       | Texto secundario / ayuda                 | `#5E6674` | Propuesta por IA |
| accent-text / link   | Enlaces y texto de acción                | `#3B5B7F` | Propuesta por IA |
| action-primary       | Relleno de acción (azul pastel)          | `#AEC6D6` | Propuesta por IA |
| action-primary-hover | Relleno de acción en hover               | `#C9DCE8` | Propuesta por IA |
| border               | Bordes y separadores                     | `#E4DED2` | Propuesta por IA |
| danger-text          | Errores y estados destructivos           | Pendiente | Pendiente        |
| success-text         | Confirmación                             | Pendiente | Pendiente        |

### Contraste (calculado, WCAG 2.2 AA)

| Pareja foreground / background                  | Ratio | Umbral | Resultado   |
| ----------------------------------------------- | ----- | ------ | ----------- |
| `#37352F` sobre `#FAF6EF`                       | 11.38 | ≥ 4.5  | ✓           |
| `#5E6674` sobre `#FAF6EF`                       | 5.37  | ≥ 4.5  | ✓           |
| `#3B5B7F` sobre `#FAF6EF`                       | 6.52  | ≥ 4.5  | ✓           |
| `#37352F` sobre `#AEC6D6` (botón primario)      | 6.92  | ≥ 4.5  | ✓           |
| `#37352F` sobre `#C9DCE8` (hover)               | 8.69  | ≥ 4.5  | ✓           |
| `#AEC6D6` sobre `#FAF6EF` (pastel como texto)   | 1.65  | ≥ 4.5  | ✗ prohibido |
| `#FFFFFF` sobre `#AEC6D6` (blanco sobre pastel) | 1.77  | ≥ 4.5  | ✗ prohibido |

**Reglas de color**:

- El azul pastel (`#AEC6D6`) solo como **relleno**, nunca como texto ni con texto blanco
  encima. Sobre él, texto oscuro (`#37352F`). — _Confirmada_.
- El acento de texto/enlace es azul oscuro (`#3B5B7F`), no el pastel. — _Propuesta por IA_.
- Contrastes de danger/success: **Pendiente de cálculo** al fijar sus HEX.
- El color nunca es el único indicador de estado; siempre etiqueta o símbolo.

## Typography

| Rol               | Familia y fallback       | Tamaño / interlineado / peso | Estado           |
| ----------------- | ------------------------ | ---------------------------- | ---------------- |
| Títulos           | Sans UI neutra (sistema) | 20px / 1.3 / 600             | Propuesta por IA |
| Cuerpo            | Sans UI neutra (sistema) | 14px / 1.5 / 400             | Propuesta por IA |
| Etiquetas / ayuda | Sans UI neutra (sistema) | 12px / 1.4 / 400             | Propuesta por IA |
| Datos / monospace | Mono (sistema)           | 13px / 1.4 / 400             | Propuesta por IA |

- Dirección **sans UI neutra**, sin serif editorial. — _Confirmada_.
- Familia concreta por definir si la marca trae una propia; fallback a la pila del
  sistema. — _Pendiente_.
- Jerarquía por tamaño/peso, no por color solo. — _Propuesta por IA_.

## Layout & Spacing

- Escala de espaciado base de 4px: `4, 8, 12, 16, 24, 32`. — _Propuesta por IA_.
- Contenedor de contenido: ancho máximo 1200px, centrado, padding lateral 16–24px. — _Propuesta por IA_.
- Listados compactos: filas de salas/reservas ~40px de alto; tarjetas compactas. — _Propuesta por IA_.
- Radios: 6px (tarjetas, inputs, botones). — _Propuesta por IA_.
- Bordes: 1px `#E4DED2`; sombras mínimas o nulas (solo para modales/overlay). — _Propuesta por IA_.
- Elementos equivalentes de una misma fila comparten altura; inputs alineados por el
  control, no por la altura de label + ayuda. — _Propuesta por IA_.

## Components & States

- **Botones**: primario = relleno `#AEC6D6` + texto `#37352F`; secundario = borde
  `#E4DED2` + texto `#37352F`; texto = enlace `#3B5B7F`. — _Propuesta por IA_.
- Estados: normal, hover, foco (anillo visible), deshabilitado (opacidad + no interactivo),
  carga (símbolo + texto). — _Propuesta por IA_.
- **Formularios**: label visible siempre; ayuda bajo el control; error con mensaje e icono,
  no solo borde rojo. — _Propuesta por IA_.
- **Listado de salas** (Atlas, Luna, Sol): tarjetas o filas equivalentes con nombre y
  disponibilidad por fecha/horario. — _Propuesta por IA_.
- **Formulario de reserva**: fecha, horario y duración (30 min–4 h); confirmación antes de
  crear. — _Propuesta por IA_.
- **«Mis reservas»**: listado de reservas propias con acción de cancelación (solo futuras
  no iniciadas). — _Propuesta por IA_.
- **Estados de contenido**: vacío, error y éxito con texto claro; sin inventar funciones
  de producto nuevas. — _Pendiente_ de detalle.

## Responsive Behavior

- En móvil, los listados de salas y reservas se apilan a una columna; el formulario de
  reserva reflowa a campos apilados. — _Propuesta por IA_.
- Contenido esencial sin recorte; reflow a una columna. — _Pendiente_ de detalle.

## Accessibility

- WCAG 2.2 AA: texto normal ≥ 4.5:1; texto grande e iconos esenciales ≥ 3:1.
  Parejas de contraste ya calculadas arriba; danger/success pendientes.
- Teclado completo, foco visible, labels en formularios, estados no basados solo en color.
- `prefers-reduced-motion` respetado: sin animaciones no esenciales. — _Propuesta por IA_.
- Este documento no certifica una implementación.

## Decisions & Open Questions

| Decisión o pregunta                                                                                           | Estado               | Fuente o confirmación humana |
| ------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------- |
| Producto: ReservaLab, reserva de salas para empleados                                                         | Confirmada           | Épica LAID1-1 + persona      |
| Identidad visual mantenida (Notion + azul pastel + fondo crema)                                               | Confirmada           | Persona                      |
| Tipografía sans UI neutra                                                                                     | Confirmada           | Persona                      |
| Nombre de marca: ReservaLab                                                                                   | Confirmada           | Persona                      |
| HEX concretos de crema, pastel, texto                                                                         | Propuesta por IA     | Cálculo de contraste         |
| Logo / colores de marca                                                                                       | Pendiente            | Persona (lo indicará)        |
| Colores de danger / success                                                                                   | Pendiente            | —                            |
| Familia tipográfica definitiva                                                                                | Pendiente            | Marca o persona              |
| Días/horarios permitidos y zona horaria; antelación máx.; plazo mín. cancelación; identificación del empleado | Pendiente (producto) | PO (épica LAID1-1)           |
