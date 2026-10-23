import type { APIRoute } from 'astro';
import { validateCredentials, createSessionToken } from '../../lib/auth.mjs';

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') || '';
  let username = '';
  let password = '';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    username = body?.username ?? '';
    password = body?.password ?? '';
  } else {
    const formData = await request.formData();
    username = formData.get('username')?.toString() ?? '';
    password = formData.get('password')?.toString() ?? '';
  }

  const mockUser = import.meta.env.MOCK_USER ?? '';
  const mockPassword = import.meta.env.MOCK_PASSWORD ?? '';

  const result = validateCredentials({ username, password }, { mockUser, mockPassword });

  if (!result.ok) {
    return new Response(JSON.stringify({ ok: false, error: result.error }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = createSessionToken(result.session.username);

  return new Response(JSON.stringify({ ok: true, token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
