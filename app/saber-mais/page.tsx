"use client";

import React from 'react';
import { 
  Smartphone, 
  Bell, 
  BarChart3, 
  Mail, 
  Instagram, 
  ShieldCheck, 
  Zap, 
  Clock 
} from 'lucide-react';

export default function AboutPage() {
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
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Hero Section - Direto e Limpo */}
      <section className="py-24 px-6 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase">
            Eficiência no <span className="text-blue-600">Atendimento.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed border-l-4 border-blue-600 pl-6">
            A plataforma NEXT digitaliza o fluxo de clientes em Angola, substituindo filas físicas por uma experiência conectada e inteligente.
          </p>
        </div>
      </section>

      {/* Seção Cinza de Transição - Quebra a monotonia do fundo */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-[#3464e0] p-8 rounded-xl shadow-2xl shadow-blue-900/10 hover:bg-[#0036C1] transition-all duration-300">
                <div className="text-white mb-6 bg-white/10 w-fit p-3 rounded-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed opacity-80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factos Explicativos com Design Minimalista */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 tracking-tight">Porquê o NEXT?</h2>
            <div className="space-y-6">
              {[
                { icon: <Zap className="text-blue-600" />, t: "Performance", d: "Redução de aglomerações e aumento da produtividade." },
                { icon: <ShieldCheck className="text-blue-600" />, t: "Confiabilidade", d: "Infraestrutura robusta baseada em nuvem." },
                { icon: <Clock className="text-blue-600" />, t: "Experiência", d: "O seu cliente valoriza o tempo. Nós também." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start border-b border-slate-100 pb-4">
                  {item.icon}
                  <div>
                    <h4 className="font-bold text-slate-800">{item.t}</h4>
                    <p className="text-sm text-slate-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <p className="text-sm uppercase tracking-widest text-blue-400 font-bold mb-4">Facto</p>
            <p className="text-2xl font-light leading-snug">
              "70% dos clientes abandonam um estabelecimento se a fila física parecer desorganizada."
            </p>
            <div className="mt-8 h-1 w-12 bg-blue-600"></div>
          </div>
        </div>
      </section>

      {/* Contactos - Estilo Corporate */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-4 tracking-tighter">CONTACTOS</h2>
            <p className="text-slate-500">Solicite uma demonstração para a sua empresa.</p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <a href="mailto:dsousa.capital.ao+next@gmail.com" className="flex items-center gap-4 text-lg font-medium hover:text-blue-600 transition-colors">
              <Mail className="text-blue-600" /> contato@next.ao
            </a>
            <a href="https://www.instagram.com/dsousa.capital.ao" className="flex items-center gap-4 text-lg font-medium hover:text-blue-600 transition-colors">
              <Instagram className="text-blue-600" /> @next_gestao
            </a>
          </div>
        </div>
      </section>

      {/* Footer Industrial */}
      <footer className="bg-[#0A0F1C] py-12 px-6 text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <p className="text-sm font-bold tracking-tighter text-white">NEXT GESTÃO DE FILAS</p>
          <p className="text-xs uppercase tracking-widest">© 2026 D'SOUSA CAPITAL, Angola</p>
        </div>
      </footer>
    </div>
  );
}