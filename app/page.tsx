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
      features: ["Senhas Ilimitadas", "Dashboard Real-time", "Relatórios Mensais", "Suporte Email"],
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
      icon: <Smartphone size={26} />,
      title: "Check-in Digital",
      desc: "Entrada imediata via QR Code. O fim das senhas de papel e do desperdício no seu negócio."
    },
    {
      icon: <Bell size={26} />,
      title: "Fila Virtual",
      desc: "Liberdade para o cliente aguardar onde quiser, recebendo alertas automáticos no telemóvel."
    },
    {
      icon: <BarChart3 size={26} />,
      title: "Analytics",
      desc: "Dados precisos sobre tempo de espera e performance da equipa em tempo real."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#0f172a', overflowX: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(1.5deg); }
          50%      { transform: translateY(-18px) rotate(-0.5deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 32s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        .float { animation: float 5s ease-in-out infinite; }

        .fade-up { animation: fadeUp .6s cubic-bezier(.16,1,.3,1) both; }
        .fade-up-1 { animation-delay: .1s; }
        .fade-up-2 { animation-delay: .2s; }
        .fade-up-3 { animation-delay: .3s; }
        .fade-up-4 { animation-delay: .4s; }

        .hover-lift { transition: transform .3s ease, box-shadow .3s ease; }
        .hover-lift:hover { transform: translateY(-5px); }

        .plan-card { transition: transform .35s cubic-bezier(.16,1,.3,1); }
        .plan-card:hover { transform: translateY(-6px); }

        .feature-icon { transition: background .25s, color .25s; }
        .feature-row:hover .feature-icon {
          background: #2b5de0 !important;
          color: #fff !important;
        }

        .cta-btn {
          transition: background .2s, transform .2s, box-shadow .2s;
        }
        .cta-btn:hover {
          background: #1e46b3 !important;
          transform: scale(1.03);
          box-shadow: 0 20px 48px rgba(43,93,224,.35) !important;
        }
        .cta-btn:active { transform: scale(.97); }

        .nav-link {
          font-size: 12px; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; color: #64748b;
          text-decoration: none; transition: color .2s;
        }
        .nav-link:hover { color: #2b5de0; }

        .contact-card {
          transition: border-color .2s, color .2s;
        }
        .contact-card:hover { border-color: #2b5de0 !important; color: #2b5de0 !important; }

        .footer-link {
          font-size: 11px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: #475569;
          text-decoration: none; transition: color .2s;
        }
        .footer-link:hover { color: #fff; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 64,
        background: 'rgba(241,243,245,.95)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-.02em', fontStyle: 'italic' }}>
          NEXT<span style={{ color: '#2b5de0' }}>.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#saber-mais" className="nav-link">Saber Mais</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <Link href="/login" style={{
            padding: '9px 22px', background: '#0f172a', color: '#fff',
            borderRadius: 10, fontFamily: "'Outfit', sans-serif",
            fontWeight: 700, fontSize: 13, letterSpacing: '.04em',
            textDecoration: 'none', transition: 'background .2s'
          }}>Login</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>

          {/* Left */}
          <div className="fade-up" style={{ flex: '1 1 480px', maxWidth: 580 }}>

            {/* Tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 14px', borderRadius: 100,
              background: '#eef2fd', color: '#2b5de0',
              fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
              marginBottom: 28
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2b5de0', display: 'inline-block' }} />
              Sistema de Gestão de Filas · Angola
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-1" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(44px, 6vw, 76px)',
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: '-.025em', color: '#0f172a',
              textTransform: 'uppercase', marginBottom: 24
            }}>
              O TEMPO É O<br />
              <span style={{ color: '#2b5de0' }}>ACTIVO MAIS<br />PRECIOSO DO SEU NEGÓCIO.</span>
            </h1>

            {/* Desc */}
            <p className="fade-up fade-up-2" style={{
              fontSize: 18, lineHeight: 1.7, color: '#64748b',
              fontStyle: 'italic', fontWeight: 400,
              borderLeft: '3px solid #2b5de0', paddingLeft: 20,
              maxWidth: 460, marginBottom: 40
            }}>
              Transforme a espera em uma experiência de luxo. A NEXT organiza suas filas com inteligência.
            </p>

            {/* CTA */}
            <div className="fade-up fade-up-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de implementar o NEXT no meu negócio.`}
                target="_blank" rel="noopener noreferrer"
                className="cta-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  padding: '18px 40px',
                  background: '#2b5de0', color: '#fff',
                  borderRadius: 16, fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800, fontSize: 14,
                  letterSpacing: '.12em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 12px 40px rgba(43,93,224,.28)'
                }}
              >
                <MessageCircle size={20} />
                Começar Agora
              </a>
            </div>
          </div>

          {/* Right — phone */}
          <div className="fade-up fade-up-2" style={{ flex: '1 1 340px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -60,
              background: 'radial-gradient(ellipse 70% 60% at 55% 50%, rgba(43,93,224,.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div className="float" style={{ position: 'relative', maxWidth: 360 }}>
              <img
                src="/telefone.png"
                alt="NEXT Mobile App"
                style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 36px 48px rgba(43,93,224,.22))' }}
              />
              {/* Badge */}
              <div style={{
                position: 'absolute', top: '38%', right: -48,
                background: '#fff', padding: '14px 18px',
                borderRadius: 18, boxShadow: '0 12px 40px rgba(0,0,0,.12)',
                border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', gap: 12,
                animation: 'fadeUp .8s .5s both'
              }}>
                <div style={{
                  width: 32, height: 32, background: '#22c55e',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, position: 'relative'
                }}>
                  <Check size={14} color="#fff" strokeWidth={3} />
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: '#22c55e', opacity: .3,
                    animation: 'ping 1.8s cubic-bezier(0,0,.2,1) infinite'
                  }} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: '#0f172a' }}>
                    VEZ DO CLIENTE #004
                  </p>
                  <p style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500, marginTop: 2 }}>Próximo na Fila</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section style={{ padding: '0', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div className="marquee-track" style={{ padding: '32px 0', gap: 0 }}>
          {[1, 2].map(loop => (
            <div key={loop} style={{ display: 'flex', gap: 24, paddingRight: 24 }}>
              {[
                { bg: '#2b5de0', icon: <Clock size={36} color="#fff" />, title: 'Filas Digitais', desc: 'O seu cliente solicita a senha via QR Code e acompanha tudo pelo telemóvel.', light: true },
                { bg: '#0f172a', icon: <ShieldCheck size={36} color="#2b5de0" />, title: 'Gestão Premium', desc: 'Dashboard ultra-rápido para chamar e gerir atendimentos.', light: false },
                { bg: '#2b5de0', icon: <Rocket size={36} color="#fff" />, title: 'Escalabilidade', desc: 'Desde pequenas boutiques a grandes centros, o NEXT adapta-se ao seu fluxo.', light: true },
              ].map((card, i) => (
                <div key={i} style={{
                  width: 320, flexShrink: 0,
                  background: card.bg, borderRadius: 28,
                  padding: '36px 32px',
                  boxShadow: '0 8px 32px rgba(0,0,0,.08)'
                }}>
                  <div style={{ marginBottom: 20 }}>{card.icon}</div>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700,
                    textTransform: 'uppercase', color: '#fff', marginBottom: 12, letterSpacing: '-.01em'
                  }}>{card.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: card.light ? 'rgba(255,255,255,.75)' : '#64748b', fontWeight: 400 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section style={{ padding: '100px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, textAlign: 'center' }}>
          {[
            { icon: <Zap size={28} />, num: '60%', label: 'Mais Velocidade', desc: 'Redução direta no tempo médio de espera.' },
            { icon: <Users size={28} />, num: '+50', label: 'Clientes Felizes', desc: 'Empresas que confiam na nossa tecnologia.' },
            { icon: <BarChart3 size={28} />, num: '100%', label: 'Controlo Total', desc: 'Relatórios precisos sobre a sua equipa.' },
          ].map((s, i) => (
            <div key={i} className="fade-up" style={{ animationDelay: `${i * .1}s` }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: '#eef2fd', color: '#2b5de0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px'
              }}>{s.icon}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 44, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#94a3b8', margin: '8px 0 12px' }}>{s.label}</div>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '96px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-.02em', textTransform: 'uppercase', color: '#0f172a', marginBottom: 12 }}>
              Planos <span style={{ color: '#2b5de0' }}>Simples.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', fontWeight: 500 }}>A transparência que o seu negócio merece.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {plans.map((plan) => (
              <div key={plan.name} className="plan-card" style={{
                padding: '44px 40px',
                borderRadius: 28,
                background: plan.highlight ? '#2b5de0' : '#fff',
                border: plan.highlight ? 'none' : '1px solid #e2e8f0',
                color: plan.highlight ? '#fff' : '#0f172a',
                boxShadow: plan.highlight ? '0 20px 60px rgba(43,93,224,.28)' : '0 4px 20px rgba(0,0,0,.04)',
                display: 'flex', flexDirection: 'column', position: 'relative'
              }}>
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                    background: '#0f172a', color: '#fff',
                    fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700,
                    letterSpacing: '.14em', textTransform: 'uppercase',
                    padding: '5px 18px', borderRadius: 100, whiteSpace: 'nowrap'
                  }}>MAIS POPULAR</div>
                )}

                <div style={{ marginBottom: 32 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase',
                    padding: '4px 14px', borderRadius: 100,
                    background: plan.highlight ? 'rgba(255,255,255,.15)' : '#f1f5f9',
                    color: plan.highlight ? '#fff' : '#64748b'
                  }}>{plan.name}</span>

                  <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 48, fontWeight: 800, lineHeight: 1, color: plan.highlight ? '#fff' : '#0f172a' }}>
                      {plan.price}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,.6)' : '#94a3b8', marginTop: 2, fontWeight: 500 }}>
                    {plan.period}
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, flex: 1, marginBottom: 36 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 500, color: plan.highlight ? '#fff' : '#334155' }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                        background: plan.highlight ? 'rgba(255,255,255,.18)' : '#eef2fd',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Check size={12} color={plan.highlight ? '#fff' : '#2b5de0'} strokeWidth={3} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Tenho interesse no ${plan.subject}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    padding: '16px',
                    background: plan.highlight ? '#fff' : '#0f172a',
                    color: plan.highlight ? '#2b5de0' : '#fff',
                    borderRadius: 14,
                    fontFamily: "'Outfit', sans-serif", fontWeight: 700,
                    fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase',
                    textDecoration: 'none', transition: 'opacity .2s'
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget as HTMLAnchorElement).style.opacity = '.85'}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
                >
                  <MessageCircle size={16} />
                  Assinar Agora
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SABER MAIS ── */}
      <section id="saber-mais" style={{ padding: '100px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: '-.025em', textTransform: 'uppercase',
              color: '#0f172a', marginBottom: 20
            }}>
              Eficiência que gera<br /><span style={{ color: '#2b5de0' }}>faturação.</span>
            </h2>
            <p style={{ fontSize: 17, color: '#64748b', maxWidth: 540, lineHeight: 1.7, fontWeight: 400 }}>
              A plataforma NEXT digitaliza o fluxo de clientes em Angola, substituindo filas físicas por uma experiência conectada.
            </p>
          </div>

          {/* Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 100 }}>
            {steps.map((step, idx) => (
              <div key={idx} className="hover-lift" style={{
                background: 'linear-gradient(135deg, #2b5de0 0%, #1e46b3 100%)',
                padding: '40px 32px', borderRadius: 24,
                boxShadow: '0 12px 40px rgba(43,93,224,.18)'
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'rgba(255,255,255,.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', marginBottom: 24
                }}>{step.icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Why NEXT + stat card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-.01em', color: '#0f172a', marginBottom: 40 }}>
                Porquê escolher o NEXT?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {[
                  { icon: <Zap size={20} />, t: "Alta Performance", d: "Software otimizado para zero latência, mesmo com milhares de acessos simultâneos." },
                  { icon: <ShieldCheck size={20} />, t: "Segurança de Dados", d: "Protocolos de encriptação que garantem a privacidade total dos seus clientes." },
                  { icon: <Clock size={20} />, t: "Retenção de Clientes", d: "Reduza a taxa de abandono em até 40% através de uma espera confortável." }
                ].map((item, i) => (
                  <div key={i} className="feature-row" style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <div className="feature-icon" style={{
                      width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                      background: '#eef2fd', color: '#2b5de0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{item.t}</div>
                      <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat card */}
            <div style={{
              background: '#0f172a', borderRadius: 32, padding: '52px 44px',
              color: '#fff', position: 'relative', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,.06)'
            }}>
              <div style={{
                position: 'absolute', top: -60, right: -60,
                width: 220, height: 220, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(43,93,224,.2) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                  <div style={{ width: 28, height: 2, background: '#2b5de0', borderRadius: 2 }} />
                  <span style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#3d5080', fontWeight: 700 }}>
                    Insights de Mercado
                  </span>
                </div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 700, lineHeight: 1.35, marginBottom: 32 }}>
                  "70% dos clientes <span style={{ color: '#2b5de0', fontStyle: 'italic' }}>abandonam</span> a loja se a fila parecer desorganizada."
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(43,93,224,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users size={18} color="#2b5de0" />
                  </div>
                  <p style={{ fontSize: 12, color: '#3d5080', lineHeight: 1.5 }}>
                    Dados baseados em estudos de comportamento de consumo em retalho.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTOS ── */}
      <section style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '88px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-.02em', color: '#0f172a', marginBottom: 8 }}>
              Fale Connosco
            </h2>
            <p style={{ color: '#64748b', fontSize: 15, fontWeight: 500 }}>Pronto para elevar o padrão do seu atendimento?</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: <Mail size={18} />, label: 'suporte@next.ao', href: `mailto:${supportEmail}` },
              { icon: <Instagram size={18} />, label: '@next_gestao', href: 'https://www.instagram.com/dsousa.capital.ao' },
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                className="contact-card"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 20px', background: '#fff',
                  border: '1px solid #e2e8f0', borderRadius: 14,
                  fontSize: 14, fontWeight: 500, color: '#334155',
                  textDecoration: 'none'
                }}>
                <span style={{ color: '#2b5de0' }}>{c.icon}</span>
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a0e1a', padding: '56px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 800, fontStyle: 'italic', letterSpacing: '-.02em', color: '#fff' }}>
            NEXT<span style={{ color: '#2b5de0' }}>.</span>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            <Link href="/faq" className="footer-link">FAQ</Link>
            <Link href="/cookies" className="footer-link">Cookies</Link>
            <a href={`mailto:${supportEmail}`} className="footer-link">Suporte</a>
          </div>
          <div style={{ fontSize: 10, color: '#334155', letterSpacing: '.1em', textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.8 }}>
            © 2026 NEXT — Gestão de Filas<br />
            <span style={{ color: '#1e293b' }}>D'Sousa Capital · Angola</span>
          </div>
        </div>
      </footer>
    </div>
  );
}