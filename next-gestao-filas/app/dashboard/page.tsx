"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { 
  Users, Ticket, LogOut, Megaphone, CheckCircle2, 
  BarChart3, QrCode, Loader2, Settings, X, Save 
} from 'lucide-react';

export default function DashboardPage() {
  const [waitingTickets, setWaitingTickets] = useState<any[]>([]);
  const [calledTickets, setCalledTickets] = useState<any[]>([]);
  const [currentTicket, setCurrentTicket] = useState<any>(null);
  const [storeName, setStoreName] = useState('');
  const [storeId, setStoreId] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Estados para Configurações
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setStoreId(user.id);

      const { data: profile } = await supabase.from('profiles').select('store_name').eq('id', user.id).single();
      setStoreName(profile?.store_name || 'Minha Loja');
      setNewStoreName(profile?.store_name || 'Minha Loja');
      
      await refreshData(user.id);
      setLoading(false);
    };
    init();

    const channel = supabase.channel('dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, () => {
        supabase.auth.getUser().then(({data}) => data.user && refreshData(data.user.id));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function refreshData(uid: string) {
    const { data } = await supabase.from('tickets').select('*').eq('store_id', uid).order('created_at', { ascending: true });
    if (data) {
      setWaitingTickets(data.filter(t => t.status === 'waiting'));
      const called = data.filter(t => t.status === 'called');
      setCalledTickets(called.slice().reverse().slice(0, 5));
      setCurrentTicket(called.length > 0 ? called[called.length - 1] : null);
    }
  }

  const callNext = async () => {
    if (waitingTickets.length === 0) return;
    const nextTicket = waitingTickets[0];
    await supabase.from('tickets').update({ status: 'called', updated_at: new Date().toISOString() }).eq('id', nextTicket.id);
  };

  const saveSettings = async () => {
    setIsSaving(true);
    const { error } = await supabase.from('profiles').update({ store_name: newStoreName }).eq('id', storeId);
    if (!error) {
      setStoreName(newStoreName);
      setIsSettingsOpen(false);
    }
    setIsSaving(false);
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans relative">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black italic">N</div>
          <h1 className="text-sm font-black uppercase tracking-tighter">{storeName}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsSettingsOpen(true)} className="p-2.5 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-xl border border-slate-200"><Settings size={18} /></button>
          <button onClick={() => { const link = `${window.location.origin}/checkin/${storeId}`; navigator.clipboard.writeText(link); alert("Link copiado!"); }} className="p-2.5 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-xl border border-slate-200"><QrCode size={18} /></button>
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} className="p-2.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded-xl border border-slate-200"><LogOut size={18} /></button>
        </div>
      </header>

      <main className="p-8 max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-8 flex-1">
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex items-center gap-2"><BarChart3 size={14} /> Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-2xl"><p className="text-[9px] font-bold text-blue-600 uppercase">Fila</p><p className="text-2xl font-black">{waitingTickets.length}</p></div>
              <div className="bg-emerald-50 p-4 rounded-2xl"><p className="text-[9px] font-bold text-emerald-600 uppercase">Hoje</p><p className="text-2xl font-black">{calledTickets.length}</p></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex-1 overflow-hidden">
            <h3 className="text-xs font-black uppercase mb-6 flex items-center gap-2"><Users size={16} /> Fila de Espera</h3>
            <div className="space-y-3">{waitingTickets.map((t) => (<div key={t.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100"><span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-xs shadow-sm">{t.ticket_number}</span><span className="text-xs font-bold text-slate-700 truncate">{t.customer_name}</span></div>))}</div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-xl text-center h-full flex flex-col items-center justify-center relative">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase mb-8">Painel de Atendimento</span>
            {currentTicket ? (
              <div className="animate-in fade-in zoom-in duration-500">
                <h2 className="text-[10rem] font-black text-slate-900 leading-none tracking-tighter">{currentTicket.ticket_number.toString().padStart(2, '0')}</h2>
                <p className="text-2xl font-bold text-slate-400 mt-4 italic">{currentTicket.customer_name}</p>
              </div>
            ) : (<div className="py-20 text-slate-200 font-black text-xl uppercase tracking-widest">Aguardando...</div>)}
            <button onClick={callNext} disabled={waitingTickets.length === 0} className="w-full max-w-md mt-12 bg-slate-900 hover:bg-blue-600 text-white py-8 rounded-[2rem] font-black text-xl uppercase tracking-widest transition-all shadow-2xl disabled:opacity-20 flex justify-center items-center gap-4"><Megaphone size={24} /> Chamar Próximo</button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white h-full shadow-lg">
            <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">Últimos Atendidos</h3>
            <div className="space-y-4">{calledTickets.map(t => (<div key={t.id} className="flex items-center gap-4 border-b border-slate-800 pb-4 last:border-0"><div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-black text-blue-400">{t.ticket_number}</div><div className="overflow-hidden"><p className="text-xs font-bold truncate">{t.customer_name}</p><p className="text-[9px] text-emerald-500 font-bold uppercase">Concluído</p></div></div>))}</div>
          </div>
        </div>
      </main>

      {/* MODAL DE CONFIGURAÇÕES */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Configurar Loja</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Nome de Exibição</label>
                <input type="text" value={newStoreName} onChange={(e) => setNewStoreName(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 font-bold mt-2 focus:border-blue-600 outline-none" />
              </div>
              <button onClick={saveSettings} disabled={isSaving} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex justify-center items-center gap-2">{isSaving ? <Loader2 className="animate-spin" size={16} /> : <><Save size={16} /> Salvar Alterações</>}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}