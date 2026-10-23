/**
 * Lógica pura de autenticación mockeada.
 * No depende del runtime de Astro ni del navegador.
 */

export const SESSION_KEY = 'reservalab-session';

/**
 * @typedef {Object} Credentials
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {Object} AuthResult
 * @property {boolean} ok
 * @property {string} [error]
 * @property {{ userId: string, username: string }} [session]
 */

/**
 * Valida credenciales contra variables de entorno.
 * @param {Credentials} credentials
 * @param {{ mockUser: string, mockPassword: string }} env
 * @returns {AuthResult}
 */
export function validateCredentials({ username, password }, { mockUser, mockPassword }) {
  if (!username || !password) {
    return { ok: false, error: 'Usuario y contraseña son obligatorios.' };
  }

  const normalizedUser = String(username).trim().toLowerCase();
  const normalizedInputPassword = String(password).trim();

  if (normalizedUser !== String(mockUser).trim().toLowerCase()) {
    return { ok: false, error: 'Usuario o contraseña incorrectos.' };
  }

  if (normalizedInputPassword !== String(mockPassword).trim()) {
    return { ok: false, error: 'Usuario o contraseña incorrectos.' };
  }

  return {
    ok: true,
    session: { userId: 'demo', username: mockUser },
  };
}

/**
 * Crea el payload de sesión mock.
 * @param {string} username
 * @returns {string} JSON serializado y base64
 */
export function createSessionToken(username) {
  const payload = JSON.stringify({ userId: 'demo', username, issuedAt: Date.now() });
  return btoa(payload);
}

/**
 * @param {string} token
 * @returns {{ userId: string, username: string } | null}
 */
export function parseSessionToken(token) {
  try {
    const payload = atob(token);
    const parsed = JSON.parse(payload);
    if (!parsed.userId || !parsed.username) return null;
    return parsed;
  } catch {
    return null;
  }
}
