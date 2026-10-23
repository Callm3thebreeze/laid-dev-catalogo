# Contrato de datos · ReservaLab

## Salas

```json
{
  "id": "atlas",
  "name": "Atlas",
  "capacity": 8,
  "description": "Sala grande con pantalla 4K y pizarra."
}
```

- `id`: identificador único, slug en minúsculas.
- `name`: nombre visible.
- `capacity`: número de plazas.
- `description`: descripción corta.

## Reservas

```json
{
  "id": "b1",
  "roomId": "atlas",
  "date": "2026-10-23",
  "start": "10:00",
  "duration": 60,
  "ownerId": "demo"
}
```

- `id`: identificador único.
- `roomId`: referencia a la sala.
- `date`: fecha en formato ISO `YYYY-MM-DD`.
- `start`: hora de inicio en formato `HH:MM`.
- `duration`: duración en minutos (múltiplo de 30, entre 30 y 240).
- `ownerId`: identificador del empleado. Valor fijo `demo` mientras no haya login.

## Reglas de negocio

1. Las reservas solo pueden ser para hoy o fechas futuras.
2. La hora de inicio debe ser un múltiplo de 30 minutos.
3. La duración debe estar entre 30 minutos y 4 horas, en incrementos de 30 minutos.
4. No se permiten reservas solapadas en la misma sala.
5. Se permiten reservas consecutivas (una termina cuando empieza la otra).
6. Solo se muestran/cancelan reservas cuya hora de inicio no haya pasado.
7. Las reservas pasadas no se muestran en "Mis reservas".
