"use client";

import Link from 'next/link';
import { ArrowLeft, MessageCircle, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      question: "Como funciona o sistema de filas digitais?",
      answer: "O cliente escaneia um QR Code na entrada da loja, tira uma senha digital e pode acompanhar a sua vez pelo telemóvel. Não é necessário instalar nenhuma aplicação."
    },
    {
      question: "Preciso de hardware específico?",
      answer: "Não. O NEXT funciona em qualquer navegador. Para a sua equipa, basta um computador, tablet ou telemóvel para chamar as senhas."
    },
    {
      question: "O sistema funciona sem internet?",
      answer: "O NEXT é uma solução baseada na nuvem (cloud), por isso requer uma conexão estável à internet para garantir o sincronismo em tempo real."
    },
    {
      question: "Posso personalizar o design da senha?",
      answer: "Sim! Entre em contacto conosco e nos diga as alterações que pretende fazer, e nós atendemos o seu pedido."
    },
    {
      question: "Como contacto o suporte técnico?",
      answer: "Temos uma equipa dedicada em Angola. Pode contactar-nos via email (dsousa.capital.ao+next@gmail.com) ou WhatsApp prioritário."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* Header Simples */}
      <header className="bg-white border-b border-slate-200 py-6 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-[#2b5de0] transition-colors font-bold text-sm uppercase tracking-wide">
            <ArrowLeft size={16} /> Voltar ao Início
          </Link>
          <div className="text-xl font-black text-slate-900 italic">
            NEXT<span className="text-[#2b5de0]">.</span> HELP
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-3xl mx-auto py-16 px-6">
        <div className="text-center mb-16">
          <div className="inline-flex p-4 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="text-[#2b5de0]" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Tudo o que precisa saber sobre a gestão de filas inteligente.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA Suporte */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center text-white shadow-xl">
          <h3 className="text-2xl font-black mb-4">Ainda tem dúvidas?</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">A nossa equipa de suporte está pronta para ajudar a configurar o seu negócio.</p>
          <a 
            href="mailto:dsousa.capital.ao+next@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#2b5de0] text-white rounded-xl font-bold hover:bg-[#1e46b3] transition-colors"
          >
            <MessageCircle size={18} /> Falar com Suporte
          </a>
        </div>
      </main>
    </div>
  );
}