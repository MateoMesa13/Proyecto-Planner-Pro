import { supabase } from './supabase';

export async function signUp(email: string, password: string, fullName: string, role: 'ADMIN' | 'USER') {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  if (data?.user) {
    await supabase.from('users').insert({
      id: data.user.id,
      email: data.user.email,
      full_name: fullName,
      role: role,
      is_active: true
    });
  }
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
