"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';
import { Ticket, User, ArrowRight, CheckCircle2, Loader2, Bell, Users, Clock, Sparkles } from 'lucide-react';

export default function CheckinPage() {
  const { id } = useParams();
  const [storeName, setStoreName] = useState('Carregando...');
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketIssued, setTicketIssued] = useState<any>(null);
  const [currentCalled, setCurrentCalled] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const { data: profile } = await supabase.from('profiles').select('store_name').eq('id', id).single();
      if (profile) setStoreName(profile.store_name);
      refreshQueue();
    };
    fetchData();

    const channel = supabase.channel('checkin-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets', filter: `store_id=eq.${id}` }, () => {
        refreshQueue();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  async function refreshQueue() {
    const { data } = await supabase.from('tickets').select('*').eq('store_id', id).order('created_at', { ascending: true });
    if (data) {
      setQueue(data.filter(t => t.status === 'waiting'));
      const called = data.filter(t => t.status === 'called');
      setCurrentCalled(called.length > 0 ? called[called.length - 1] : null);
    }
  }

  const handleGetTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;
    setLoading(true);
    const { data: last } = await supabase.from('tickets').select('ticket_number').eq('store_id', id).order('created_at', { ascending: false }).limit(1);
    const nextNumber = last && last.length > 0 ? last[0].ticket_number + 1 : 1;
    const { data, error } = await supabase.from('tickets').insert([{ store_id: id, customer_name: customerName, ticket_number: nextNumber, status: 'waiting' }]).select().single();
    if (!error) setTicketIssued(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 overflow-x-hidden">
      <header className="bg-white p-6 border-b border-slate-200 sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <div><h1 className="text-xl font-black uppercase italic tracking-tighter">{storeName}</h1><p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Terminal Ativo</p></div>
        <div className="bg-slate-100 p-2 rounded-lg text-slate-400"><Ticket size={20} /></div>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-4 max-w-md mx-auto w-full">
        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          {!ticketIssued ? (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-lg font-black uppercase mb-6 flex items-center gap-2"><Sparkles size={18} className="text-blue-600" /> Retirar Senha</h2>
              <form onSubmit={handleGetTicket} className="space-y-4">
                <div className="relative"><User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} /><input type="text" placeholder="Seu nome" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-5 pl-14 pr-5 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" required /></div>
                <button disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex justify-center items-center gap-3 active:scale-95 transition-all shadow-xl disabled:opacity-50">{loading ? <Loader2 className="animate-spin" /> : <>Confirmar <ArrowRight size={18} /></>}</button>
              </form>
            </div>
          ) : (
            <div className="text-center animate-in zoom-in duration-500">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase mb-4">Sua Vez em Breve</div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Sua Senha</p>
              <div className="text-8xl font-black text-slate-900 leading-none my-2">{ticketIssued.ticket_number.toString().padStart(2, '0')}</div>
              <p className="text-lg font-bold text-slate-400 italic mb-4">{ticketIssued.customer_name}</p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center gap-3"><Clock size={16} className="text-blue-500" /><span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aguarde no Local</span></div>
            </div>
          )}
        </section>

        <section className="flex-1 space-y-4 mb-10">
          <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-lg relative overflow-hidden">
            <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">Agora Chamando</h3>
            {currentCalled ? (
              <div className="flex items-center gap-6 animate-pulse"><span className="text-6xl font-black text-blue-400">{currentCalled.ticket_number.toString().padStart(2, '0')}</span><div><p className="text-lg font-bold truncate max-w-[150px] uppercase italic">{currentCalled.customer_name}</p><p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">No Guichê</p></div></div>
            ) : (<p className="text-slate-600 font-bold uppercase text-xs tracking-widest py-4">Aguardando Chamada...</p>)}
          </div>

          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 flex items-center gap-2"><Users size={14} /> Fila de Espera ({queue.length})</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">{queue.slice(0, 5).map((t) => (<div key={t.id} className={`flex items-center justify-between p-3 rounded-xl ${ticketIssued?.id === t.id ? 'bg-blue-50 border border-blue-100' : 'bg-slate-50 opacity-60'}`}><div className="flex items-center gap-3"><span className="font-black text-xs text-slate-400">#{t.ticket_number}</span><span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{t.customer_name}</span></div>{ticketIssued?.id === t.id && <span className="text-[9px] font-black text-blue-600 uppercase">Você</span>}</div>))}</div>
          </div>
        </section>
      </main>
      <footer className="p-6 text-center text-slate-300 font-black text-[9px] uppercase tracking-[0.3em]">NEXT GESTÃO DE FLUXO</footer>
    </div>
  );
}