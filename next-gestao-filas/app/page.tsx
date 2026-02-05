"use client";

import Link from 'next/link';
import { Rocket, ShieldCheck, Clock, MessageCircle, BarChart3, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  const whatsappNumber = "244956821719";
  const supportEmail = "dsousa.capital.ao+next@gmail.com";

  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Navbar - Cinza Sutil Sólido */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-5 bg-[#F1F3F5] border-b border-slate-200 shadow-sm">
        <div className="text-2xl font-black text-slate-900 tracking-tighter italic">
          NEXT<span className="text-[#2b5de0]">.</span>
        </div>
        <div className="flex items-center space-x-8 text-[14px] font-bold text-slate-600 tracking-wide uppercase">
          <Link href="/saber-mais" className="hover:text-[#2b5de0] transition-colors">Saber Mais</Link>
          <Link href="/pricing" className="hover:text-[#2b5de0] transition-colors">Pricing</Link>
          <Link href="/login" className="px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto pt-28 pb-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
          O tempo é o ativo mais <br />
          <span className="text-[#2b5de0]">precioso da sua loja.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-semibold italic border-l-4 border-slate-200 pl-6">
          Transforme a espera em uma experiência de luxo. A NEXT organiza suas filas 
          com inteligência e eleva o padrão do atendimento em Angola.
        </p>
        
        <a 
          href={`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de implementar o NEXT no meu negócio.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-[#2b5de0] text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#1e46b3] transition-all shadow-2xl shadow-blue-200 active:scale-95"
        >
          <MessageCircle size={20} />
          Começar Agora
        </a>
      </section>

      {/* Carrossel Centralizado (Sem efeito fusco) */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <div className="animate-marquee flex gap-12">
            {[1, 2].map((loop) => (
              <div key={loop} className="flex gap-12">
                <div className="w-[360px] bg-[#2b5de0] p-12 rounded-[2.5rem] shadow-xl text-white">
                  <Clock className="text-white mb-6" size={40} />
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Filas Digitais</h3>
                  <p className="text-blue-50 text-sm leading-relaxed font-medium">O seu cliente solicita a senha via QR Code e acompanha tudo pelo telemóvel.</p>
                </div>
                <div className="w-[360px] bg-slate-900 p-12 rounded-[2.5rem] shadow-xl text-white">
                  <ShieldCheck className="text-[#2b5de0] mb-6" size={40} />
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Gestão Premium</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Dashboard ultra-rápido para chamar, transferir ou encerrar atendimentos.</p>
                </div>
                <div className="w-[360px] bg-[#2b5de0] p-12 rounded-[2.5rem] shadow-xl text-white">
                  <Rocket className="text-white mb-6" size={40} />
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Escalabilidade</h3>
                  <p className="text-blue-50 text-sm leading-relaxed font-medium">Desde pequenas boutiques a grandes centros, o NEXT adapta-se ao seu fluxo.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secção de "Social Proof" e Factos */}
      <section className="py-28 px-6 bg-white max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-slate-100 p-5 rounded-full mb-6">
              <Zap className="text-[#2b5de0]" size={32} />
            </div>
            <h4 className="text-4xl font-black text-slate-900 mb-2">60%</h4>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Mais Velocidade</p>
            <p className="mt-4 text-sm text-slate-400">Redução direta no tempo médio de espera no balcão.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-slate-100 p-5 rounded-full mb-6">
              <Users className="text-[#2b5de0]" size={32} />
            </div>
            <h4 className="text-4xl font-black text-slate-900 mb-2">+50</h4>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Clientes Felizes</p>
            <p className="mt-4 text-sm text-slate-400">Usuários que preferem esperar com conforto digital.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-slate-100 p-5 rounded-full mb-6">
              <BarChart3 className="text-[#2b5de0]" size={32} />
            </div>
            <h4 className="text-4xl font-black text-slate-900 mb-2">100%</h4>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Controlo Total</p>
            <p className="mt-4 text-sm text-slate-400">Relatórios precisos sobre a performance da sua equipa.</p>
          </div>
        </div>
      </section>

      {/* Footer Atualizado com Links Úteis */}
      <footer className="bg-slate-950 text-white py-12 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo */}
          <div className="text-2xl font-black italic tracking-tighter">
            NEXT<span className="text-[#2b5de0]">.</span>
          </div>

          {/* Novos Links de Navegação do Rodapé */}
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <a href={`mailto:${supportEmail}`} className="hover:text-[#2b5de0] transition-colors">
              Suporte
            </a>
          </div>

          {/* Copyright */}
          <div className="text-slate-600 text-[10px] uppercase tracking-[0.5em] font-black text-center md:text-right">
            © 2026 NEXT - Gestão de Filas <br className="md:hidden" /> | D'SOUSA CAPITAL, Angola
          </div>
        </div>
      </footer>
    </div>
  );
}