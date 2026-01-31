import { Check, MessageCircle } from 'lucide-react';

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

export default function PricingPage() {
  const whatsappNumber = "244956821719";

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 font-sans antialiased">
      {/* Header Minimalista e Direto */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Planos <span className="text-[#2b5de0]">Simples.</span>
        </h2>
        <p className="text-slate-500 mt-2 font-medium">Escolha a escala certa para o seu negócio.</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`flex flex-col p-8 rounded-2xl border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
              plan.highlight 
              ? 'bg-[#2b5de0] border-[#2b5de0] text-white shadow-xl shadow-blue-200 hover:bg-[#2450c9]' 
              : 'bg-white border-slate-100 text-slate-900 shadow-sm hover:border-[#2b5de0]/30'
            }`}
          >
            <div className="mb-6">
              <span className={`text-xs font-bold uppercase tracking-widest ${plan.highlight ? 'text-blue-200' : 'text-blue-600'}`}>
                {plan.name}
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black">{plan.price}</span>
                <span className={`text-xs ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                  {plan.period}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-medium">
                  <Check size={16} className={plan.highlight ? 'text-blue-200' : 'text-[#2b5de0]'} />
                  {feature}
                </li>
              ))}
            </ul>

            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Tenho interesse no ${plan.subject}. Podem ajudar-me?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
                plan.highlight 
                ? 'bg-white text-[#2b5de0] hover:bg-blue-50' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <MessageCircle size={16} />
              Assinar Agora
            </a>
          </div>
        ))}
      </div>

      <footer className="text-center mt-12">
        <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
          &copy; 2026 NEXT Gestão de Filas
        </p>
      </footer>
    </div>
  );
}