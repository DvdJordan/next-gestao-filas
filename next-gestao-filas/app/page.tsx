import Link from 'next/link';
import { Rocket, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-ghost">
      {/* Navbar Minimalista */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white border-b border-slate-100">
        <div className="text-2xl font-bold text-next-dark tracking-tighter">
          NEXT<span className="text-next-blue">.</span>
        </div>
        <div className="space-x-8 text-sm font-medium text-brand-text">
          <Link href="/saber-mais" className="hover:text-next-blue transition-colors">Saber Mais</Link>
          <Link href="/pricing" className="hover:text-next-blue transition-colors">Pricing</Link>
          <Link href="/login" className="px-5 py-2 border border-next-dark rounded-next hover:bg-next-dark hover:text-white transition-all">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto pt-24 pb-16 px-6 text-center">
        <h1 className="text-6xl font-extrabold text-next-dark mb-6 tracking-tight">
          O tempo é o ativo mais <br />
          <span className="text-next-blue">precioso da sua loja.</span>
        </h1>
        <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Transforme a espera em uma experiência de luxo. A NEXT organiza suas filas 
          com inteligência e eleva o padrão do atendimento.
        </p>
      </section>

      {/* Features Rápidas */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 py-16">
        <div className="card-premium">
          <Clock className="text-next-blue mb-4" size={32} />
          <h3 className="text-lg font-bold mb-2">Filas Digitais</h3>
          <p className="text-brand-muted text-sm">Seus clientes solicitam senhas via QR Code sem baixar apps.</p>
        </div>
        <div className="card-premium">
          <ShieldCheck className="text-next-blue mb-4" size={32} />
          <h3 className="text-lg font-bold mb-2">Gestão Premium</h3>
          <p className="text-brand-muted text-sm">Dashboard intuitivo para lojistas chamarem e encerrarem senhas.</p>
        </div>
        <div className="card-premium">
          <Rocket className="text-next-blue mb-4" size={32} />
          <h3 className="text-lg font-bold mb-2">Multitenant</h3>
          <p className="text-brand-muted text-sm">Segurança total e isolamento de dados para cada estabelecimento.</p>
        </div>
      </section>

      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
 
  {/* Botões de Ação */}
  <div className="flex items-center gap-4">
    {/* O SEU NOVO BOTÃO PESSOAL */}
  </div>
</nav>

      {/* Footer solicitado */}
      <footer className="bg-next-dark text-white py-16 px-8 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="text-3xl font-bold mb-4 italic tracking-tighter">NEXT</div>
          <p className="text-slate-400 max-w-md">
            Elevando o padrão de atendimento comercial através da tecnologia e sofisticação.
          </p>
          <div className="mt-8 pt-8 border-t border-slate-800 w-full text-sm text-slate-500">
            © 2024 NEXT - Gestão de Filas. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}