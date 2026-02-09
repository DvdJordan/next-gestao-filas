"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Rocket, ShieldCheck, Clock, MessageCircle, BarChart3, 
  Users, Zap, Check, Smartphone, Bell, Mail, Instagram 
} from 'lucide-react';

export default function LandingPage() {
  const whatsappNumber = "244956821719";
  const supportEmail = "dsousa.capital.ao+next@gmail.com";

  const plans = [
    {
      name: "Mensal",
      price: "5.000 Kz",
      period: "/mês",
      features: ["Senhas Ilimitadas", "Dashboard Real-time", "Suporte Email"],
      subject: "Plano Mensal - NEXT"
    },
    {
      name: "Anual",
      price: "50.000 Kz",
      period: "/ano",
      features: ["Tudo do Mensal", "Bónus: 2 meses grátis", "Prioridade total", "Relatórios Mensais"],
      highlight: true,
      subject: "Plano Anual - NEXT"
    }
  ];

  const steps = [
    {
      icon: <Smartphone size={28} />,
      title: "Check-in Digital",
      desc: "Entrada imediata via QR Code. O fim das senhas de papel e do desperdício no seu negócio."
    },
    {
      icon: <Bell size={28} />,
      title: "Fila Virtual",
      desc: "Liberdade para o cliente aguardar onde quiser, recebendo alertas automáticos no telemóvel."
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Analytics",
      desc: "Dados precisos sobre tempo de espera e performance da equipa em tempo real."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden scroll-smooth text-slate-900">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(2deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(0px) rotate(2deg); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-10 py-5 bg-[#F1F3F5] border-b border-slate-200 shadow-sm">
        <div className="text-2xl font-black text-slate-900 tracking-tighter italic">
          NEXT<span className="text-[#2b5de0]">.</span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8 text-[12px] md:text-[14px] font-bold text-slate-600 tracking-wide uppercase">
          <a href="#saber-mais" className="hover:text-[#2b5de0] transition-colors">Saber Mais</a>
          <a href="#pricing" className="hover:text-[#2b5de0] transition-colors">Pricing</a>
          <Link href="/login" className="px-5 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95">
            Login
          </Link>
        </div>
      </nav>

   {/* Hero Section - Conteúdo Centralizado e Equilibrado */}
<section className="max-w-6xl mx-auto pt-16 md:pt-32 pb-20 px-6 md:px-12">
  <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
    
    {/* Lado Esquerdo: Conteúdo Principal Reformulado */}
    <div className="md:w-[55%] flex flex-col items-center text-center md:text-left md:items-start md:pr-8">
      
      {/* Título Principal - Mais Horizontal */}
      <div className="mb-8 md:mb-10 w-full">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] uppercase">
          O TEMPO É O <span className="text-[#2b5de0]">ATIVO MAIS</span>
        </h1>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] uppercase mt-2">
          <span className="text-[#2b5de0]">PRECIOSO</span> DA SUA LOJA.
        </h1>
      </div>
      
      {/* Descrição em linha única */}
      <div className="w-full max-w-xl mb-10 md:mb-12">
        <p className="text-xl md:text-2xl text-slate-600 leading-[1.6] font-medium italic border-l-4 border-[#2b5de0] pl-6 py-2 tracking-normal">
          Transforme a espera em uma experiência de luxo. A NEXT organiza suas filas com inteligência.
        </p>
      </div>
      
      {/* Botão de CTA */}
      <div className="w-full flex justify-center md:justify-start">
        <a 
          href={`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de implementar o NEXT no meu negócio.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 px-12 py-6 bg-[#2b5de0] text-white rounded-2xl font-black uppercase tracking-[0.15em] text-lg hover:bg-[#1e46b3] transition-all shadow-2xl shadow-blue-300 hover:shadow-blue-400 active:scale-95 transform hover:scale-105 duration-300"
        >
          <MessageCircle size={24} />
          <span>Começar Agora</span>
        </a>
      </div>
     </div>
      

    {/* Lado Direito: Imagem do Telemóvel (Mantido) */}
    <div className="md:w-[45%] relative flex justify-center md:justify-end">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 to-purple-100/40 rounded-full blur-3xl -z-10 transform scale-75 md:scale-90"></div>
      
      <div className="relative animate-float max-w-[280px] md:max-w-[380px] lg:max-w-[420px]">
        <img 
          src="/telefone.png" 
          alt="NEXT Mobile App"
          className="w-full h-auto drop-shadow-[0_40px_50px_rgba(59,130,246,0.25)]"
        />
        
        {/* Badge flutuante - Melhor posicionado */}
        <div className="absolute top-[40%] -right-6 md:-right-10 bg-white p-4 md:p-5 rounded-2xl shadow-2xl border border-slate-100 hidden lg:flex items-center gap-3 animate-pulse">
          <div className="bg-green-500 p-2 rounded-full text-white">
            <Check size={16} strokeWidth={3} />
          </div>
          <div>
            <p className="text-[12px] font-black uppercase text-slate-800 tracking-tight">VEZ DO CLIENTE #004</p>
            <p className="text-[10px] text-slate-500 font-medium">Próximo na Fila #2</p>
          </div>
        </div>
        
      </div>
    </div>

  </div>
</section>

      {/* Carrossel Marquee */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <div className="animate-marquee flex gap-12">
            {[1, 2].map((loop) => (
              <div key={loop} className="flex gap-12">
                <div className="w-[300px] md:w-[360px] bg-[#2b5de0] p-10 rounded-[2.5rem] shadow-xl text-white">
                  <Clock className="text-white mb-6" size={40} />
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Filas Digitais</h3>
                  <p className="text-blue-50 text-sm leading-relaxed font-medium">O seu cliente solicita a senha via QR Code e acompanha tudo pelo telemóvel.</p>
                </div>
                <div className="w-[300px] md:w-[360px] bg-slate-900 p-10 rounded-[2.5rem] shadow-xl text-white">
                  <ShieldCheck className="text-[#2b5de0] mb-6" size={40} />
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Gestão Premium</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Dashboard ultra-rápido para chamar, transferir ou encerrar atendimentos.</p>
                </div>
                <div className="w-[300px] md:w-[360px] bg-[#2b5de0] p-10 rounded-[2.5rem] shadow-xl text-white">
                  <Rocket className="text-white mb-6" size={40} />
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Escalabilidade</h3>
                  <p className="text-blue-50 text-sm leading-relaxed font-medium">Desde pequenas boutiques a grandes centros, o NEXT adapta-se ao seu fluxo.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-28 px-6 bg-white max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-slate-100 p-5 rounded-full mb-6 text-[#2b5de0]">
              <Zap size={32} />
            </div>
            <h4 className="text-4xl font-black text-slate-900 mb-2">60%</h4>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Mais Velocidade</p>
            <p className="mt-4 text-sm text-slate-400 font-medium">Redução direta no tempo médio de espera.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-slate-100 p-5 rounded-full mb-6 text-[#2b5de0]">
              <Users size={32} />
            </div>
            <h4 className="text-4xl font-black text-slate-900 mb-2">+50</h4>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Clientes Felizes</p>
            <p className="mt-4 text-sm text-slate-400 font-medium">Empresas que confiam na nossa tecnologia.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-slate-100 p-5 rounded-full mb-6 text-[#2b5de0]">
              <BarChart3 size={32} />
            </div>
            <h4 className="text-4xl font-black text-slate-900 mb-2">100%</h4>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Controlo Total</p>
            <p className="mt-4 text-sm text-slate-400 font-medium">Relatórios precisos sobre a sua equipa.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-slate-50 py-24 px-6 border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
            Planos <span className="text-[#2b5de0]">Simples.</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg font-medium">A transparência que o seu negócio merece.</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`flex flex-col p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 transform hover:-translate-y-2 ${
                plan.highlight 
                ? 'bg-[#2b5de0] border-[#2b5de0] text-white shadow-2xl shadow-blue-200' 
                : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="mb-8">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${plan.highlight ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {plan.name}
                </span>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className={`text-sm font-bold ${plan.highlight ? 'text-blue-100' : 'text-slate-400'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-bold">
                    <Check size={18} className={plan.highlight ? 'text-blue-200' : 'text-[#2b5de0]'} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Tenho interesse no ${plan.subject}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                  plan.highlight 
                  ? 'bg-white text-[#2b5de0] hover:bg-blue-50 shadow-xl' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                }`}
              >
                <MessageCircle size={18} />
                Assinar Agora
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Saber Mais Section - Design Renovado */}
<section id="saber-mais" className="py-32 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <div className="mb-24 text-center md:text-left">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase">
        Eficiência que gera <br /> <span className="text-[#2b5de0]">faturação.</span>
      </h2>
      <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
        A plataforma NEXT digitaliza o fluxo de clientes em Angola, substituindo filas físicas por uma experiência conectada.
      </p>
    </div>

    {/* Cards Superiores - Agora em Azul Profissional */}
    <div className="grid md:grid-cols-3 gap-8 mb-32">
      {steps.map((step, idx) => (
        <div key={idx} className="bg-gradient-to-br from-[#2b5de0] to-[#1e46b3] p-10 rounded-[2.5rem] shadow-2xl shadow-blue-100 group hover:-translate-y-2 transition-all duration-300">
          <div className="text-white mb-8 bg-white/10 w-fit p-4 rounded-2xl group-hover:scale-110 transition-transform">
            {step.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
          <p className="text-blue-100 text-sm leading-relaxed font-medium opacity-90">{step.desc}</p>
        </div>
      ))}
    </div>

    {/* Porquê o NEXT? + Estatística (Card Preto) */}
    <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
      <div>
        <h2 className="text-3xl font-black mb-12 tracking-tight text-slate-900 uppercase">
          Porquê escolher o NEXT?
        </h2>
        <div className="space-y-10">
          {[
            { icon: <Zap size={24} />, t: "Alta Performance", d: "Software otimizado para zero latência, mesmo com milhares de acessos simultâneos." },
            { icon: <ShieldCheck size={24} />, t: "Segurança de Dados", d: "Protocolos de encriptação que garantem a privacidade total dos seus clientes." },
            { icon: <Clock size={24} />, t: "Retenção de Clientes", d: "Reduza a taxa de abandono em até 40% através de uma espera confortável." }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-start group">
              <div className="bg-blue-50 text-[#2b5de0] p-4 rounded-2xl group-hover:bg-[#2b5de0] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">{item.t}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card de Estatística - Preto Profundo Premium */}
      <div className="bg-slate-950 rounded-[3rem] p-12 text-white shadow-3xl relative overflow-hidden border border-slate-800">
        {/* Elemento Visual de Fundo */}
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-10 -translate-y-10">
          <BarChart3 size={200} className="text-blue-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <span className="h-1 w-8 bg-[#2b5de0] rounded-full"></span>
            <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold">Insights de Mercado</p>
          </div>
          
          <p className="text-3xl md:text-4xl font-black leading-tight mb-10 tracking-tight">
            "70% dos clientes <span className="text-blue-500 italic">abandonam</span> a loja se a fila parecer desorganizada."
          </p>
          
          <div className="flex items-center gap-4 py-6 border-t border-slate-800">
            <div className="bg-[#2b5de0]/10 p-3 rounded-xl">
              <Users className="text-[#2b5de0]" size={24} />
            </div>
            <p className="text-xs text-slate-400 font-medium leading-tight">
              Dados baseados em estudos de comportamento de consumo em retalho.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Contactos */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase text-slate-900">Fale Connosco</h2>
            <p className="text-slate-500 font-bold">Pronto para elevar o padrão do seu atendimento?</p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <a href={`mailto:${supportEmail}`} className="flex items-center gap-4 text-sm hover:text-[#2b5de0] transition-all bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <Mail className="text-[#2b5de0]" size={20} /> suporte@next.ao
            </a>
            <a href="https://www.instagram.com/dsousa.capital.ao" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-4 text-sm hover:text-[#2b5de0] transition-all bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <Instagram className="text-[#2b5de0]" size={20} /> @next_gestao
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-3xl font-black italic tracking-tighter">
            NEXT<span className="text-[#2b5de0]">.</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            <a href={`mailto:${supportEmail}`} className="hover:text-white transition-colors">Suporte</a>
          </div>

          <div className="text-slate-600 text-[10px] uppercase tracking-[0.4em] font-black text-center md:text-right leading-relaxed">
            © 2026 NEXT - GESTÃO DE FILAS <br /> 
            <span className="text-slate-700">D'SOUSA CAPITAL, ANGOLA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}