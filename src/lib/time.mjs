/**
 * Utilidades de fecha/hora para ReservaLab.
 * Todas las funciones son puras y deterministas.
 */

export const SLOT_MINUTES = 30;
export const MIN_DURATION = 30;
export const MAX_DURATION = 240;
export const DAY_MINUTES = 24 * 60;

/**
 * @param {Date} now
 * @returns {string} Fecha en formato ISO YYYY-MM-DD.
 */
export function toISODate(now) {
  return now.toISOString().slice(0, 10);
}

/**
 * @param {string} time - HH:MM
 * @returns {number} Minutos desde las 00:00.
 */
export function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/**
 * @param {number} minutes
 * @returns {string} HH:MM
 */
export function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Suma minutos a una hora.
 * @param {string} time - HH:MM
 * @param {number} durationMinutes
 * @returns {string} HH:MM
 */
export function addMinutes(time, durationMinutes) {
  return minutesToTime(timeToMinutes(time) + durationMinutes);
}

/**
 * @param {Date} now
 * @returns {string} Hora actual redondeada al siguiente slot de 30 min.
 */
export function nextSlot(now) {
  const total = now.getHours() * 60 + now.getMinutes();
  const next = Math.ceil(total / SLOT_MINUTES) * SLOT_MINUTES;
  return minutesToTime(Math.min(next, DAY_MINUTES - SLOT_MINUTES));
}

/**
 * @param {Date} now
 * @returns {boolean}
 */
export function isToday(dateString, now) {
  return dateString === toISODate(now);
}

/**
 * @param {string} dateString - YYYY-MM-DD
 * @param {Date} now
 * @returns {boolean}
 */
export function isPastDate(dateString, now) {
  return dateString < toISODate(now);
}

/**
 * Comprueba si una hora de inicio ya pasó hoy.
 * @param {string} startTime - HH:MM
 * @param {Date} now
 * @returns {boolean}
 */
export function isPastStartTime(startTime, now) {
  const current = now.getHours() * 60 + now.getMinutes();
  return timeToMinutes(startTime) <= current;
}

/**
 * @param {number} duration
 * @returns {boolean}
 */
export function isValidDuration(duration) {
  return (
    Number.isInteger(duration) &&
    duration >= MIN_DURATION &&
    duration <= MAX_DURATION &&
    duration % SLOT_MINUTES === 0
  );
}

/**
 * @param {string} time - HH:MM
 * @returns {boolean}
 */
export function isValidSlotTime(time) {
  const minutes = timeToMinutes(time);
  return minutes >= 0 && minutes < DAY_MINUTES && minutes % SLOT_MINUTES === 0;
}

/**
 * Formato legible: "jue, 22 oct · 19:43–21:13 (1 h 30 min)"
 * @param {string} roomName
 * @param {string} dateString - YYYY-MM-DD
 * @param {string} startTime - HH:MM
 * @param {number} duration
 * @returns {string}
 */
export function formatBookingSummary(roomName, dateString, startTime, duration) {
  const date = new Date(`${dateString}T00:00:00`);
  const weekday = new Intl.DateTimeFormat('es-ES', { weekday: 'short' }).format(date);
  const dayMonth = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(date);
  const endTime = addMinutes(startTime, duration);
  const durationLabel = formatDuration(duration);
  return `${roomName} · ${weekday}, ${dayMonth} · ${startTime}–${endTime} (${durationLabel})`;
}

/**
 * @param {number} duration
 * @returns {string}
 */
export function formatDuration(duration) {
  const h = Math.floor(duration / 60);
  const m = duration % 60;
  const parts = [];
  if (h > 0) parts.push(`${h} h`);
  if (m > 0) parts.push(`${m} min`);
  return parts.join(' ');
}

/**
 * Formato de listado: "vie, 23 oct · 10:00–11:00"
 * @param {string} dateString
 * @param {string} startTime
 * @param {number} duration
 * @returns {string}
 */
export function formatBookingRange(dateString, startTime, duration) {
  const date = new Date(`${dateString}T00:00:00`);
  const weekday = new Intl.DateTimeFormat('es-ES', { weekday: 'short' }).format(date);
  const dayMonth = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(date);
  const endTime = addMinutes(startTime, duration);
  return `${weekday}, ${dayMonth} · ${startTime}–${endTime}`;
}
