"use client";
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';
import { 
  Ticket, User, ArrowRight, CheckCircle2, Loader2, Bell, Users, 
  Clock, Sparkles, MapPin, Home, Shield, Check, Crown, Target, 
  Zap, Star, XCircle 
} from 'lucide-react';

export default function CheckinPage() {
  const { id } = useParams();
  const [storeName, setStoreName] = useState('Carregando...');
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketIssued, setTicketIssued] = useState<any>(null);
  const [currentCalled, setCurrentCalled] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  
  // Refs para controle de áudio e notificações sem re-renderizar
  const lastCalledId = useRef<string | null>(null);

  // --- FUNÇÕES DE FEEDBACK E NOTIFICAÇÃO ---
  
  const playNotificationSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(e => console.log("Áudio aguardando interação inicial."));
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  const sendWebNotification = (title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { 
        body, 
        icon: 'https://cdn-icons-png.flaticon.com/512/864/864685.png' 
      });
    }
  };

  // --- OTIMIZAÇÃO DO REFRESH QUEUE ---

  const refreshQueue = useCallback(async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('store_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const waiting = data.filter(t => t.status === 'waiting');
        setQueue(waiting);
        
        // Lógica para o ticket do usuário atual
        if (ticketIssued) {
          const myUpdatedTicket = data.find(t => t.id === ticketIssued.id);
          
          // Se o ticket foi deletado (pelo admin ou desistência)
          if (!myUpdatedTicket) {
            setTicketIssued(null);
            setQueuePosition(null);
          } else {
            // Se acabou de ser chamado
            if (myUpdatedTicket.status === 'called' && ticketIssued.status !== 'called') {
              playNotificationSound();
              sendWebNotification("Sua vez!", "Por favor, dirija-se ao guichê.");
            }
            setTicketIssued(myUpdatedTicket);
            const pos = waiting.findIndex(t => t.id === ticketIssued.id);
            setQueuePosition(pos !== -1 ? pos + 1 : null);
          }
        }
        
        const called = data.filter(t => t.status === 'called');
        const latestCalled = called.length > 0 ? called[called.length - 1] : null;
        
        // Feedback sonoro geral para qualquer nova chamada
        if (latestCalled && latestCalled.id !== lastCalledId.current) {
          if (lastCalledId.current !== null) playNotificationSound();
          lastCalledId.current = latestCalled.id;
        }
        
        setCurrentCalled(latestCalled);
      }
    } catch (err) {
      console.error("Erro ao processar fila:", err);
    }
  }, [id, ticketIssued]);

  // --- USE EFFECTS ---

  useEffect(() => {
    if (!id) return;
    
    const fetchData = async () => {
      try {
        const { data: profile } = await supabase.from('profiles').select('store_name').eq('id', id).single();
        if (profile) setStoreName(profile.store_name);
        refreshQueue();
      } catch (e) {
        setStoreName("Loja");
      }
    };

    fetchData();
    requestNotificationPermission();

    const channel = supabase.channel(`checkin-realtime-${id}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'tickets', 
        filter: `store_id=eq.${id}` 
      }, () => {
        refreshQueue();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id, refreshQueue]);

  // --- ACTIONS ---

  const handleGetTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || loading) return;
    setLoading(true);

    try {
      const { data: last } = await supabase
        .from('tickets')
        .select('ticket_number')
        .eq('store_id', id)
        .order('created_at', { ascending: false })
        .limit(1);

      const nextNumber = last && last.length > 0 ? last[0].ticket_number + 1 : 1;

      const { data, error } = await supabase.from('tickets').insert([{ 
        store_id: id, 
        customer_name: customerName, 
        ticket_number: nextNumber, 
        status: 'waiting' 
      }]).select().single();
      
      if (error) throw error;
      setTicketIssued(data);
      refreshQueue(); // Garante atualização imediata da posição
    } catch (err) {
      alert("Erro ao gerar senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTicket = async () => {
    if (!ticketIssued || !confirm("Deseja realmente sair da fila?")) return;
    setLoading(true);
    try {
      await supabase.from('tickets').delete().eq('id', ticketIssued.id);
      setTicketIssued(null);
      setQueuePosition(null);
    } catch (err) {
      alert("Erro ao cancelar.");
    } finally {
      setLoading(false);
    }
  };

  const getWaitTimeEstimate = (position: number) => {
    const minutes = (position - 1) * 5;
    return minutes > 0 ? `${minutes} min` : 'Próximo';
  };

  // --- LAYOUT ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <header className="py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">{storeName}</h1>
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Sistema de Fila Inteligente
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6 overflow-y-auto pb-6">
          {!ticketIssued ? (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 animate-slideUp">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-600 rounded-full mb-4">
                  <Sparkles size={16} />
                  <span className="text-sm font-semibold">Pegar Senha</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Entre na Fila Digital</h2>
                <p className="text-slate-600">Aguarde com conforto e seja avisado quando for sua vez</p>
              </div>

              <form onSubmit={handleGetTicket} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Seu Nome
                    <span className="text-blue-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <User className="text-slate-400" size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder="Digite seu nome completo"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 font-medium placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !customerName.trim()}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                    ${customerName.trim() && !loading
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }
                  `}
                >
                  <div className="flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Ticket size={20} />
                        Gerar Minha Senha
                        <ArrowRight size={20} />
                      </>
                    )}
                  </div>
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <p className="text-xs text-slate-600">Insira seu nome</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <p className="text-xs text-slate-600">Receba senha</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <p className="text-xs text-slate-600">Aguarde aviso</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 animate-fadeIn">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-600 rounded-full mb-4">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-semibold">Senha Confirmada</span>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-medium mb-2">Sua Senha</p>
                  <div className="text-8xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent leading-none">
                    {ticketIssued.ticket_number.toString().padStart(3, '0')}
                  </div>
                  <p className="text-xl font-bold text-slate-800 mt-4">{ticketIssued.customer_name}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-700">Posição na Fila</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {queuePosition ? `#${queuePosition}` : '--'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">Tempo Estimado</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {queuePosition ? getWaitTimeEstimate(queuePosition) : '--'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* BOTÃO DESISTIR - Integrado no estilo */}
                <button 
                  onClick={handleCancelTicket}
                  disabled={loading}
                  className="w-full mb-6 py-3 flex items-center justify-center gap-2 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-all border border-dashed border-red-200"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <><XCircle size={18} /> Desistir da Fila</>}
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Bell className="text-blue-500" size={20} />
                    <div className="text-left">
                      <p className="font-medium text-slate-800">Você será avisado</p>
                      <p className="text-sm text-slate-600">Quando for sua vez</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <MapPin className="text-blue-500" size={20} />
                    <div className="text-left">
                      <p className="font-medium text-slate-800">Fique nas proximidades</p>
                      <p className="text-sm text-slate-600">Aguarde no local</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Current Called */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Atendendo Agora</h3>
                  <p className="text-white/80 text-sm">Chamada atual</p>
                </div>
              </div>
              <Bell className="text-amber-300 animate-pulse" size={20} />
            </div>

            {currentCalled ? (
              <div className="text-center animate-pulse">
                <div className="text-6xl font-black text-white mb-4">
                  {currentCalled.ticket_number.toString().padStart(3, '0')}
                </div>
                <p className="text-xl font-bold text-white mb-2">{currentCalled.customer_name}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                  <Target size={16} />
                  <span className="text-sm font-medium">No guichê</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-white/60" size={24} />
                </div>
                <p className="text-white/80 font-medium">Aguardando chamada...</p>
                <p className="text-white/60 text-sm">O próximo atendimento começará em breve</p>
              </div>
            )}
          </div>

          {/* Waiting Queue */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                  <Users className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Fila de Espera</h3>
                  <p className="text-slate-600 text-sm">Em tempo real</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-2xl font-bold text-slate-800">{queue.length}</p>
              </div>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {queue.slice(0, 8).map((ticket, index) => (
                <div
                  key={ticket.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    ticketIssued?.id === ticket.id
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-sm'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      ticketIssued?.id === ticket.id
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}>
                      <span className="font-bold">{ticket.ticket_number}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-800 truncate max-w-[140px]">
                        {ticket.customer_name}
                      </p>
                      <p className="text-sm text-slate-600">
                        Posição {index + 1} • {getWaitTimeEstimate(index + 1)}
                      </p>
                    </div>
                  </div>
                  
                  {ticketIssued?.id === ticket.id && (
                    <div className="flex items-center gap-2">
                      <Star className="text-amber-500" size={16} />
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        VOCÊ
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {queue.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="text-slate-400" size={24} />
                  </div>
                  <p className="text-slate-600">Fila vazia</p>
                  <p className="text-slate-500 text-sm">Seja o primeiro na fila!</p>
                </div>
              )}
            </div>

            {queue.length > 8 && (
              <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-600">
                  +{queue.length - 8} pessoas na fila
                </p>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="text-emerald-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Seguro</p>
                  <p className="text-xs text-slate-600">Sistema protegido</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="text-amber-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Tempo Real</p>
                  <p className="text-xs text-slate-600">Atualizações instantâneas</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 border-t border-slate-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Crown className="text-white" size={16} />
              </div>
              <span className="font-bold text-slate-800">NEXT</span>
            </div>
            <p className="text-sm text-slate-600">
              Sistema de Gestão de Fila • {new Date().getFullYear()}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Aguarde sua vez com conforto
            </p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}