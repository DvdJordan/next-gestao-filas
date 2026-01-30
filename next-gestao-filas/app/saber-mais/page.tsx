"use client"; // Adicione isto para garantir o contexto de cliente e execução de tipos

import React from 'react';
import Link from 'next/link';
import { Smartphone, Bell, BarChart3, ChevronRight } from 'lucide-react';

export default function AboutPage() {
// ... resto do código igual
  const steps = [
    {
      icon: <Smartphone size={32} />,
      title: "Check-in Digital",
      desc: "O cliente chega ao seu estabelecimento e lê um QR Code exclusivo. Sem papel, sem complicação."
    },
    {
      icon: <Bell size={32} />,
      title: "Notificações em Tempo Real",
      desc: "O cliente acompanha a posição na fila pelo próprio telemóvel enquanto aguarda com conforto."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Gestão Inteligente",
      desc: "Sua equipa chama a próxima senha pelo painel NEXT, mantendo o fluxo organizado e produtivo."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Simples */}
      <section className="bg-brand-ghost py-20 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-next-dark mb-6">Inovação na ponta dos dedos.</h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            O NEXT nasceu para eliminar o caos das filas físicas e trazer a sofisticação digital 
            para o atendimento presencial em Angola.
          </p>
        </div>
      </section>

      {/* Fluxo de Funcionamento */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6">
              <div className="text-next-blue mb-6 bg-next-light p-5 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-next-dark mb-4">{step.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-next-dark py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-8 italic">Pronto para elevar o nível da sua loja?</h2>
        <Link href="/cadastro" className="btn-premium bg-white text-next-dark hover:bg-slate-100 inline-flex items-center gap-2">
          Começar Agora <ChevronRight size={18} />
        </Link>
      </section>
    </div>
  );
}