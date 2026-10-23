import {
  toISODate,
  timeToMinutes,
  addMinutes,
  isPastDate,
  isPastStartTime,
  isValidDuration,
  isValidSlotTime,
  SLOT_MINUTES,
  MIN_DURATION,
  MAX_DURATION,
} from './time.mjs';

/**
 * @typedef {Object} Room
 * @property {string} id
 * @property {string} name
 * @property {number} capacity
 * @property {string} description
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} roomId
 * @property {string} date - YYYY-MM-DD
 * @property {string} start - HH:MM
 * @property {number} duration - minutos
 * @property {string} ownerId
 */

/**
 * Errores de validación con mensaje legible.
 */
export const BookingError = {
  MISSING_FIELDS: 'Completa todos los campos.',
  PAST_DATE: 'La fecha no puede ser anterior a hoy.',
  PAST_TIME: 'La hora de inicio ya pasó.',
  INVALID_START: 'La hora de inicio debe ser en franjas de 30 minutos.',
  INVALID_DURATION: 'La duración debe estar entre 30 min y 4 h, en múltiplos de 30 min.',
  OVERLAP: 'La sala ya está reservada en ese horario.',
};

/**
 * Genera un id simple para una nueva reserva.
 * @returns {string}
 */
export function makeBookingId() {
  return `b${Date.now()}`;
}

/**
 * Lista las salas con disponibilidad para una fecha dada.
 * @param {Room[]} rooms
 * @param {Booking[]} bookings
 * @param {string} dateString - YYYY-MM-DD
 * @param {Date} now
 * @returns {Array<Room & { status: 'available' | 'partial' | 'occupied', bookings: Booking[] }>}
 */
export function listRoomsWithAvailability(rooms, bookings, dateString, now) {
  return rooms.map((room) => {
    const roomBookings = bookings.filter(
      (b) => b.roomId === room.id && b.date === dateString
    );
    const status = computeAvailability(roomBookings, dateString, now);
    return { ...room, status, bookings: roomBookings };
  });
}

/**
 * @param {Booking[]} roomBookings
 * @param {string} dateString
 * @param {Date} now
 * @returns {'available' | 'partial' | 'occupied'}
 */
function computeAvailability(roomBookings, dateString, now) {
  if (isPastDate(dateString, now)) return 'occupied';

  const futureBookings = roomBookings.filter((b) => !isPastBooking(b, now));
  if (futureBookings.length === 0) return 'available';
  const totalMinutes = futureBookings.reduce((sum, b) => sum + b.duration, 0);
  if (totalMinutes >= 24 * 60) return 'occupied';
  return 'partial';
}

/**
 * @param {Booking} booking
 * @param {Date} now
 * @returns {boolean}
 */
export function isPastBooking(booking, now) {
  if (booking.date < toISODate(now)) return true;
  if (booking.date === toISODate(now) && isPastStartTime(booking.start, now)) {
    return true;
  }
  return false;
}

/**
 * @param {Booking[]} bookings
 * @param {Date} now
 * @param {string} ownerId
 * @returns {Booking[]}
 */
export function listFutureBookings(bookings, now, ownerId = 'demo') {
  return bookings
    .filter((b) => b.ownerId === ownerId && !isPastBooking(b, now))
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return timeToMinutes(a.start) - timeToMinutes(b.start);
    });
}

/**
 * Valida una nueva reserva sin mutar datos.
 * @param {Object} params
 * @param {string} params.roomId
 * @param {string} params.date - YYYY-MM-DD
 * @param {string} params.start - HH:MM
 * @param {number} params.duration
 * @param {Booking[]} existingBookings
 * @param {Date} now
 * @returns {{ ok: true } | { ok: false, error: string }}
 */
export function validateNewBooking({ roomId, date, start, duration }, existingBookings, now) {
  if (!roomId || !date || !start || !duration) {
    return { ok: false, error: BookingError.MISSING_FIELDS };
  }
  if (isPastDate(date, now)) {
    return { ok: false, error: BookingError.PAST_DATE };
  }
  if (date === toISODate(now) && isPastStartTime(start, now)) {
    return { ok: false, error: BookingError.PAST_TIME };
  }
  if (!isValidSlotTime(start)) {
    return { ok: false, error: BookingError.INVALID_START };
  }
  if (!isValidDuration(duration)) {
    return { ok: false, error: BookingError.INVALID_DURATION };
  }
  if (hasOverlap(existingBookings, roomId, date, start, duration)) {
    return { ok: false, error: BookingError.OVERLAP };
  }
  return { ok: true };
}

/**
 * @param {Booking[]} bookings
 * @param {string} roomId
 * @param {string} date
 * @param {string} start
 * @param {number} duration
 * @returns {boolean}
 */
export function hasOverlap(bookings, roomId, date, start, duration) {
  const newStart = timeToMinutes(start);
  const newEnd = newStart + duration;

  return bookings
    .filter((b) => b.roomId === roomId && b.date === date)
    .some((b) => {
      const bStart = timeToMinutes(b.start);
      const bEnd = bStart + b.duration;
      // No solapamiento si una termina cuando/antes de que empiece la otra.
      return newStart < bEnd && bStart < newEnd;
    });
}

/**
 * Crea una reserva si pasa la validación.
 * @param {Object} params
 * @param {string} params.roomId
 * @param {string} params.date
 * @param {string} params.start
 * @param {number} params.duration
 * @param {Booking[]} existingBookings
 * @param {Date} now
 * @param {string} ownerId
 * @returns {{ ok: true, booking: Booking } | { ok: false, error: string }}
 */
export function createBooking(
  { roomId, date, start, duration },
  existingBookings,
  now,
  ownerId = 'demo'
) {
  const validation = validateNewBooking({ roomId, date, start, duration }, existingBookings, now);
  if (!validation.ok) return validation;

  const booking = {
    id: makeBookingId(),
    roomId,
    date,
    start,
    duration: Number(duration),
    ownerId,
  };
  return { ok: true, booking };
}

/**
 * Genera las opciones de duración para el selector.
 * @returns {Array<{ value: number, label: string }>}
 */
export function durationOptions() {
  const options = [];
  for (let m = MIN_DURATION; m <= MAX_DURATION; m += SLOT_MINUTES) {
    options.push({ value: m, label: formatDurationLabel(m) });
  }
  return options;
}

/**
 * @param {number} minutes
 * @returns {string}
 */
function formatDurationLabel(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h} hora${h > 1 ? 's' : ''} ${m} minutos`;
  if (h > 0) return `${h} hora${h > 1 ? 's' : ''}`;
  return `${m} minutos`;
}

/**
 * Genera opciones de hora de inicio desde 08:00 hasta 20:00 en slots de 30 min.
 * @returns {Array<{ value: string, label: string }>}
 */
export function startTimeOptions() {
  const options = [];
  for (let m = 8 * 60; m <= 20 * 60; m += SLOT_MINUTES) {
    const time = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
    options.push({ value: time, label: time });
  }
  return options;
}
