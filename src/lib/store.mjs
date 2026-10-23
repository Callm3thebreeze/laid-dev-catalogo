import initialBookings from '../data/bookings.json';
import initialRooms from '../data/rooms.json';

const BOOKINGS_KEY = 'reservalab-bookings';

export function getRooms() {
  return initialRooms;
}

export function getBookings() {
  if (typeof window === 'undefined') return initialBookings;
  const raw = window.localStorage.getItem(BOOKINGS_KEY);
  if (!raw) {
    window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
    return initialBookings;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return initialBookings;
  }
}

export function saveBookings(bookings) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
}

export function addBooking(booking) {
  const bookings = [...getBookings(), booking];
  saveBookings(bookings);
  return bookings;
}

export function removeBooking(id) {
  const bookings = getBookings().filter((b) => b.id !== id);
  saveBookings(bookings);
  return bookings;
}
