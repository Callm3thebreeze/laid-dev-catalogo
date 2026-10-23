import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  listRoomsWithAvailability,
  listFutureBookings,
  validateNewBooking,
  createBooking,
  hasOverlap,
  durationOptions,
  startTimeOptions,
  BookingError,
} from '../src/lib/bookings.mjs';
import { toISODate, addMinutes, formatDuration, formatBookingSummary } from '../src/lib/time.mjs';
import { readFileSync } from 'node:fs';
const rooms = JSON.parse(readFileSync(new URL('../src/data/rooms.json', import.meta.url), 'utf-8'));

const now = new Date('2026-10-22T19:43:00');

describe('time helpers', () => {
  it('adds minutes to a time', () => {
    assert.equal(addMinutes('10:00', 60), '11:00');
    assert.equal(addMinutes('10:00', 90), '11:30');
  });

  it('formats duration', () => {
    assert.equal(formatDuration(60), '1 h');
    assert.equal(formatDuration(90), '1 h 30 min');
    assert.equal(formatDuration(30), '30 min');
  });

  it('formats booking summary', () => {
    const summary = formatBookingSummary('Atlas', '2026-10-22', '19:43', 90);
    assert.match(summary, /Atlas/);
    assert.match(summary, /19:43–21:13/);
    assert.match(summary, /1 h 30 min/);
  });
});

describe('availability', () => {
  it('marks all rooms available when there are no bookings', () => {
    const result = listRoomsWithAvailability(rooms, [], toISODate(now), now);
    assert.equal(result.length, 3);
    assert.ok(result.every((r) => r.status === 'available'));
  });

  it('marks a room as partial when it has a future booking', () => {
    const bookings = [
      { id: 'b1', roomId: 'atlas', date: '2026-10-23', start: '10:00', duration: 60, ownerId: 'demo' },
    ];
    const result = listRoomsWithAvailability(rooms, bookings, '2026-10-23', now);
    const atlas = result.find((r) => r.id === 'atlas');
    assert.equal(atlas.status, 'partial');
  });

  it('considers past bookings as unavailable date', () => {
    const result = listRoomsWithAvailability(rooms, [], '2026-10-21', now);
    assert.ok(result.every((r) => r.status === 'occupied'));
  });
});

describe('validation', () => {
  it('rejects past dates', () => {
    const result = validateNewBooking(
      { roomId: 'atlas', date: '2026-10-21', start: '10:00', duration: 60 },
      [],
      now
    );
    assert.equal(result.ok, false);
    assert.equal(result.error, BookingError.PAST_DATE);
  });

  it('rejects past start time today', () => {
    const result = validateNewBooking(
      { roomId: 'atlas', date: '2026-10-22', start: '10:00', duration: 60 },
      [],
      now
    );
    assert.equal(result.ok, false);
    assert.equal(result.error, BookingError.PAST_TIME);
  });

  it('rejects invalid duration', () => {
    const result = validateNewBooking(
      { roomId: 'atlas', date: '2026-10-23', start: '10:00', duration: 25 },
      [],
      now
    );
    assert.equal(result.ok, false);
    assert.equal(result.error, BookingError.INVALID_DURATION);
  });

  it('rejects overlapping bookings', () => {
    const existing = [
      { id: 'b1', roomId: 'atlas', date: '2026-10-23', start: '10:00', duration: 60, ownerId: 'demo' },
    ];
    const result = validateNewBooking(
      { roomId: 'atlas', date: '2026-10-23', start: '10:30', duration: 60 },
      existing,
      now
    );
    assert.equal(result.ok, false);
    assert.equal(result.error, BookingError.OVERLAP);
  });

  it('allows consecutive bookings', () => {
    const existing = [
      { id: 'b1', roomId: 'atlas', date: '2026-10-23', start: '10:00', duration: 60, ownerId: 'demo' },
    ];
    const result = validateNewBooking(
      { roomId: 'atlas', date: '2026-10-23', start: '11:00', duration: 60 },
      existing,
      now
    );
    assert.equal(result.ok, true);
  });

  it('accepts a valid booking', () => {
    const result = validateNewBooking(
      { roomId: 'sol', date: '2026-10-24', start: '09:00', duration: 120 },
      [],
      now
    );
    assert.equal(result.ok, true);
  });
});

describe('createBooking', () => {
  it('creates a booking with generated id', () => {
    const result = createBooking(
      { roomId: 'sol', date: '2026-10-24', start: '09:00', duration: 120 },
      [],
      now
    );
    assert.equal(result.ok, true);
    assert.equal(result.booking.roomId, 'sol');
    assert.equal(result.booking.duration, 120);
    assert.equal(result.booking.ownerId, 'demo');
    assert.ok(result.booking.id);
  });

  it('does not create invalid bookings', () => {
    const result = createBooking(
      { roomId: 'atlas', date: '2026-10-21', start: '10:00', duration: 60 },
      [],
      now
    );
    assert.equal(result.ok, false);
  });
});

describe('listFutureBookings', () => {
  it('lists future bookings sorted and excludes past ones', () => {
    const bookings = [
      { id: 'b1', roomId: 'atlas', date: '2026-10-23', start: '10:00', duration: 60, ownerId: 'demo' },
      { id: 'b2', roomId: 'luna', date: '2026-10-24', start: '15:00', duration: 90, ownerId: 'demo' },
      { id: 'past', roomId: 'sol', date: '2026-10-22', start: '09:00', duration: 60, ownerId: 'demo' },
    ];
    const future = listFutureBookings(bookings, now);
    assert.equal(future.length, 2);
    assert.equal(future[0].id, 'b1');
    assert.equal(future[1].id, 'b2');
  });
});

describe('options helpers', () => {
  it('generates duration options', () => {
    const options = durationOptions();
    assert.equal(options.length, 8);
    assert.equal(options[0].value, 30);
    assert.equal(options[options.length - 1].value, 240);
  });

  it('generates start time options from 08:00 to 20:00', () => {
    const options = startTimeOptions();
    assert.equal(options[0].value, '08:00');
    assert.equal(options[options.length - 1].value, '20:00');
  });
});
