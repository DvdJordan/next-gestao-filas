import { createClient } from '@supabase/supabase-js';

// 1. Pegamos as variáveis
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. Criamos uma função de validação simples
const isValidUrl = (url: string | undefined): url is string => {
  try {
    if (!url) return false;
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// 3. Só inicializamos se o URL for válido, caso contrário usamos um fallback seguro 
// para não travar a compilação do Next.js
const finalUrl = isValidUrl(supabaseUrl) ? supabaseUrl : "https://placeholder-fix.supabase.co";
const finalKey = supabaseAnonKey || "no-key-provided";

export const supabase = createClient(finalUrl, finalKey);

// Log para te ajudar no terminal (podes apagar depois)
if (finalUrl.includes("placeholder")) {
  console.warn("⚠️ ALERTA NEXT: O ficheiro .env.local não foi lido corretamente!");
}