import type { RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const GET: RequestHandler = async ({ request }) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return new Response('Unauthorized', { status: 401 });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return new Response('Invalid token', { status: 401 });

  return new Response(JSON.stringify({ email: user.email }));
};
