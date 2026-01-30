"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, Ticket } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) throw authError;

      // Login bem-sucedido? Vai direto para o Dashboard da loja
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message === "Invalid login credentials" 
        ? "E-mail ou senha incorretos." 
        : "Erro ao conectar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex p-3 bg-slate-900 rounded-2xl text-white mb-6 hover:bg-blue-600 transition-colors">
            <Ticket size={28} />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Acesso Loja</h1>
          <p className="text-slate-500 text-sm font-medium mt-2">Entre com suas credenciais de parceiro</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold text-center animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="email" 
              placeholder="E-mail profissional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-12 pr-5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="password" 
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-12 pr-5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
              required
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl transition-all flex justify-center items-center gap-2 uppercase text-xs tracking-[0.2em] hover:bg-blue-600 disabled:opacity-50 shadow-xl shadow-slate-200"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Entrar no Painel <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="mt-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Sistema de Gestão Exclusivo NEXT.
        </p>
      </div>
    </div>
  );
}