import { createClient } from '@supabase/supabase-js';

// Safe environment variable resolution supporting Vite (browser) and Node test runners
const getEnvVar = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta?.env?.[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process?.env?.[key]) {
    return process.env[key];
  }
  return '';
};

// Polyfill WebSocket in headless Node environments if not natively provided
if (typeof globalThis !== 'undefined' && !globalThis.WebSocket) {
  globalThis.WebSocket = class WebSocket {};
}

export const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || '';
export const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-ref.supabase.co' &&
  !supabaseUrl.includes('your-project')
);

// Initialize Supabase client if configured, otherwise provide a safe stub
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    })
  : null;

// Diagnostics log on app load
if (isSupabaseConfigured) {
  console.log('✅ [Supabase] Client initialized successfully with project:', supabaseUrl);
} else {
  console.info('ℹ️ [Supabase] Environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not configured yet. The app is running smoothly in local demo mode.');
}
