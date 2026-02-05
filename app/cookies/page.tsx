"use client";

import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Header Simples */}
      <header className="bg-white border-b border-slate-200 py-6 px-8 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-[#2b5de0] transition-colors font-bold text-sm uppercase tracking-wide">
            <ArrowLeft size={16} /> Voltar ao Início
          </Link>
          <div className="text-xl font-black text-slate-900 italic">
            NEXT<span className="text-[#2b5de0]">.</span> LEGAL
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-3xl mx-auto py-16 px-6">
        <div className="mb-12 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-slate-100 rounded-2xl">
              <Cookie className="text-slate-900" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Política de Cookies
            </h1>
          </div>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">
            Última atualização: Fevereiro 2026
          </p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. O que são Cookies?</h2>
            <p className="text-slate-600 mb-4">
              Cookies são pequenos ficheiros de texto que são armazenados no seu computador ou dispositivo móvel quando visita o nosso website. Eles permitem que o site recorde as suas ações e preferências (como login, idioma, tamanho da fonte e outras preferências de visualização) durante um período de tempo.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Como usamos os Cookies?</h2>
            <p className="text-slate-600 mb-4">
              No NEXT, utilizamos cookies para melhorar a sua experiência de navegação e garantir o funcionamento correto da plataforma de gestão de filas. Utilizamos os seguintes tipos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
              <li><strong className="text-slate-800">Cookies Essenciais:</strong> Necessários para o funcionamento do site (ex: manter o login ativo).</li>
              <li><strong className="text-slate-800">Cookies de Desempenho:</strong> Ajudam-nos a entender como os visitantes interagem com o site (ex: Google Analytics).</li>
              <li><strong className="text-slate-800">Cookies Funcionais:</strong> Recordam as suas preferências de utilizador.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Gestão de Cookies</h2>
            <p className="text-slate-600 mb-4">
              Pode controlar e/ou apagar os cookies conforme desejar. Pode apagar todos os cookies já instalados no seu computador ou ativar uma opção disponível na maioria dos navegadores que impede a sua instalação.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm text-slate-500">
              Nota: Se desativar os cookies, algumas funcionalidades do NEXT poderão não funcionar corretamente.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Contacto</h2>
            <p className="text-slate-600">
              Se tiver dúvidas sobre esta política, contacte-nos através do email: <span className="text-[#2b5de0] font-bold">dsousa.capital.ao+next@gmail.com</span>.
            </p>
          </section>
        </div>
      </main>

       <footer className="py-10 text-center border-t border-slate-100 mt-12">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 D'SOUSA CAPITAL</p>
       </footer>
    </div>
  );
}