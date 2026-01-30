import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Mensal",
    price: "5.000 Kz",
    period: "/mês",
    description: "Ideal para lojas que estão começando a digitalizar sua fila.",
    features: ["Senhas Digitais Ilimitadas", "Dashboard em Tempo Real", "Suporte via Email"]
  },
  {
    name: "Anual",
    price: "50.000 Kz",
    period: "/ano",
    description: "O melhor custo-benefício para estabelecimentos consolidados.",
    features: ["Tudo do Mensal", "Desconto de 2 meses", "Prioridade no Atendimento", "Relatórios Mensais"],
    highlight: true
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-brand-ghost py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-next-dark mb-4">Planos Simples e Transparentes</h2>
        <p className="text-brand-muted text-lg">Escolha o plano que melhor se adapta ao volume do seu negócio.</p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`card-premium relative flex flex-col ${plan.highlight ? 'border-next-blue ring-1 ring-next-blue' : ''}`}>
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-next-blue text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                Mais Popular
              </span>
            )}
            <h3 className="text-2xl font-bold text-next-dark">{plan.name}</h3>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-next-dark">{plan.price}</span>
              <span className="text-brand-muted">{plan.period}</span>
            </div>
            <p className="text-brand-muted mb-8 text-sm leading-relaxed">{plan.description}</p>
            
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-brand-text">
                  <Check size={18} className="text-next-blue" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/cadastro" className={`btn-premium w-full ${!plan.highlight ? 'bg-slate-200 text-next-dark hover:bg-slate-300' : ''}`}>
              Assinar agora
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}