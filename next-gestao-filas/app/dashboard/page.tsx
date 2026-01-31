"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { 
  Users, Ticket, LogOut, Megaphone, CheckCircle2, 
  BarChart3, QrCode, Loader2, Settings, X, Save,
  ChevronRight, Clock, User, Bell
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
  const [copied, setCopied] = useState(false);

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

  const copyCheckinLink = () => {
    const link = `${window.location.origin}/checkin/${storeId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Ticket className="text-blue-600" size={20} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 font-sans overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-slate-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20"></div>
      </div>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Ticket className="text-white" size={24} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">{storeName}</h1>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Sistema de Gestão de Fila
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={copyCheckinLink}
                className="group relative px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <QrCode className="text-blue-600" size={18} />
                  <span className="text-sm font-medium text-blue-700">Check-in Link</span>
                </div>
                {copied && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-emerald-500 text-white text-xs rounded-lg animate-bounce">
                    Copiado!
                  </div>
                )}
              </button>

              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
              >
                <Settings size={20} />
              </button>

              <button 
                onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
                className="p-3 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-4 lg:p-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Stats & Queue */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <BarChart3 className="text-blue-500" size={18} />
                  Estatísticas
                </h3>
                <span className="text-xs text-slate-400">Hoje</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden group">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-100 group-hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <Ticket className="text-blue-600" size={18} />
                      <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {waitingTickets.length}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{waitingTickets.length}</p>
                    <p className="text-xs text-slate-600 mt-1">Na fila</p>
                    <div className="mt-3 h-1.5 bg-blue-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(waitingTickets.length * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden group">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border border-emerald-100 group-hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle2 className="text-emerald-600" size={18} />
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                        {calledTickets.length}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{calledTickets.length}</p>
                    <p className="text-xs text-slate-600 mt-1">Atendidos</p>
                    <div className="mt-3 h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(calledTickets.length * 20, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Waiting Queue */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6 h-[calc(100vh-380px)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Users className="text-blue-500" size={18} />
                  Fila de Espera
                </h3>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {waitingTickets.length} clientes
                </span>
              </div>

              <div className="space-y-3 overflow-y-auto h-[calc(100%-50px)] pr-2">
                {waitingTickets.map((t, index) => (
                  <div 
                    key={t.id}
                    className="group bg-gradient-to-r from-white to-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-sm">{t.ticket_number}</span>
                          </div>
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1">
                              <Bell className="w-4 h-4 text-amber-500 animate-ping" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 truncate max-w-[120px]">
                            {t.customer_name}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock size={12} />
                            Próximo
                          </p>
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                          PRÓXIMO
                        </div>
                      )}
                    </div>
                    {index === 0 && waitingTickets.length > 1 && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-xs text-slate-500">
                          Próximos na fila: {waitingTickets.slice(1, 3).map(t => t.ticket_number).join(', ')}
                          {waitingTickets.length > 3 && ` +${waitingTickets.length - 3}`}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                {waitingTickets.length === 0 && (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-4">
                      <Ticket className="text-slate-400" size={24} />
                    </div>
                    <p className="text-slate-500 text-sm">Nenhum cliente na fila</p>
                    <p className="text-slate-400 text-xs mt-1">Aguardando check-in</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl border border-white/50 shadow-2xl p-8 lg:p-12 h-full flex flex-col items-center justify-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-indigo-100 to-transparent rounded-full translate-x-48 translate-y-48"></div>

              <div className="relative z-10 text-center w-full max-w-2xl">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold uppercase rounded-full mb-8 shadow-lg">
                  <Megaphone size={14} />
                  Painel de Atendimento
                </span>

                {currentTicket ? (
                  <div className="animate-fadeInUp">
                    <div className="mb-8">
                      <p className="text-sm font-medium text-slate-600 mb-2">Atendendo agora</p>
                      <h2 className="text-8xl lg:text-9xl font-black text-slate-900 leading-none tracking-tighter bg-gradient-to-br from-slate-900 to-blue-900 bg-clip-text text-transparent">
                        {currentTicket.ticket_number.toString().padStart(2, '0')}
                      </h2>
                    </div>
                    
                    <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg mb-12">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                        <User className="text-blue-600" size={24} />
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold text-slate-800">{currentTicket.customer_name}</p>
                        <p className="text-sm text-slate-600 flex items-center gap-2">
                          <Clock size={14} />
                          Em atendimento
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 animate-pulse">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-8">
                      <Ticket className="text-slate-300" size={48} />
                    </div>
                    <p className="text-2xl font-bold text-slate-400">Aguardando próximo cliente</p>
                    <p className="text-slate-500 mt-2">Quando um cliente fizer check-in, aparecerá aqui</p>
                  </div>
                )}

                <button 
                  onClick={callNext}
                  disabled={waitingTickets.length === 0}
                  className="group relative w-full max-w-md bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-6 rounded-2xl font-bold text-lg uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center gap-4">
                    <Megaphone size={24} />
                    Chamar Próximo Cliente
                    {waitingTickets.length > 0 && (
                      <span className="ml-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                        {waitingTickets[0]?.ticket_number}
                      </span>
                    )}
                  </div>
                </button>

                {waitingTickets.length > 0 && (
                  <p className="text-sm text-slate-600 mt-4">
                    Próximo: <span className="font-bold">{waitingTickets[0]?.customer_name}</span> • 
                    Ticket: <span className="font-bold text-blue-600">{waitingTickets[0]?.ticket_number}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Recent Activity */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl border border-slate-800 shadow-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-400" size={18} />
                  Últimos Atendidos
                </h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                  {calledTickets.length} hoje
                </span>
              </div>

              <div className="space-y-4 overflow-y-auto h-[calc(100%-80px)] pr-2">
                {calledTickets.map((t, index) => (
                  <div 
                    key={t.id}
                    className="group bg-gradient-to-r from-slate-800 to-slate-900/80 p-4 rounded-xl border border-slate-700 hover:border-blue-700 transition-all duration-300 hover:translate-x-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-blue-300 font-bold">{t.ticket_number}</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                          <CheckCircle2 size={10} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{t.customer_name}</p>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <Clock size={12} />
                          Concluído
                        </p>
                      </div>
                      <ChevronRight className="text-slate-600 group-hover:text-blue-400 transition-colors" size={16} />
                    </div>
                  </div>
                ))}
                
                {calledTickets.length === 0 && (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="text-slate-600" size={24} />
                    </div>
                    <p className="text-slate-500 text-sm">Nenhum atendimento hoje</p>
                    <p className="text-slate-600 text-xs mt-1">Os atendidos aparecerão aqui</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl w-full max-w-md shadow-2xl animate-slideUp">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Configurações</h2>
                  <p className="text-sm text-slate-600 mt-1">Gerencie as configurações da sua loja</p>
                </div>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nome da Loja
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={newStoreName}
                      onChange={(e) => setNewStoreName(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-2xl py-4 px-6 font-medium outline-none transition-all"
                      placeholder="Digite o nome da sua loja"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Settings className="text-slate-400" size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Este nome será exibido no painel e no check-in dos clientes
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Link de Check-in
                  </label>
                  <div 
                    onClick={copyCheckinLink}
                    className="group cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-4 hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700 truncate">
                          {window.location.origin}/checkin/{storeId}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Clique para copiar o link</p>
                      </div>
                      <QrCode className="text-blue-600 group-hover:scale-110 transition-transform" size={20} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button 
                    onClick={saveSettings}
                    disabled={isSaving}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .dark-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
        }
        
        .dark-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
}