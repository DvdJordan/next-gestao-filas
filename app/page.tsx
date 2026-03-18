"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Rocket, ShieldCheck, Clock, MessageCircle, BarChart3,
  Users, Zap, Check, Smartphone, Bell, Mail, Instagram,
  ArrowRight, ChevronRight, Play
} from "lucide-react";

/* ─── Google Fonts & Global Styles ─────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --blue:       #2B5DE0;
      --blue-dark:  #1E46B3;
      --blue-light: #EEF2FD;
      --ink:        #0A0D14;
      --ink-2:      #1C2033;
      --muted:      #6B7280;
      --border:     #E5E7EB;
      --surface:    #F8F9FB;
      --white:      #FFFFFF;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--white);
      color: var(--ink);
      overflow-x: hidden;
    }

    /* ── Scroll Reveal ── */
    .reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }

    /* ── Marquee ── */
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .marquee-track { animation: marquee 35s linear infinite; display: flex; width: max-content; }
    .marquee-track:hover { animation-play-state: paused; }

    /* ── Float ── */
    @keyframes float {
      0%,100% { transform: translateY(0) rotate(1deg); }
      50%      { transform: translateY(-18px) rotate(-1deg); }
    }
    .float { animation: float 5s ease-in-out infinite; }

    /* ── Ping ── */
    @keyframes ping { 75%,100% { transform: scale(1.8); opacity: 0; } }
    .ping { animation: ping 1.5s cubic-bezier(0,0,.2,1) infinite; }

    /* ── Queue Pulse ── */
    @keyframes qpulse { 0%,100% { opacity: .6; } 50% { opacity: 1; } }
    .qpulse { animation: qpulse 2s ease-in-out infinite; }

    /* ── Gradient Mesh ── */
    .mesh-bg {
      background:
        radial-gradient(ellipse 70% 60% at 80% 20%, rgba(43,93,224,.09) 0%, transparent 65%),
        radial-gradient(ellipse 50% 50% at 10% 80%, rgba(43,93,224,.06) 0%, transparent 60%),
        #fff;
    }

    /* ── Card hover ── */
    .card-hover {
      transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease;
    }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(43,93,224,.13); }

    /* ── Button ── */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 12px;
      padding: 18px 36px;
      background: var(--blue);
      color: #fff;
      border-radius: 16px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 15px;
      letter-spacing: .08em;
      text-transform: uppercase;
      text-decoration: none;
      transition: background .2s, transform .2s, box-shadow .2s;
      box-shadow: 0 8px 32px rgba(43,93,224,.30);
    }
    .btn-primary:hover {
      background: var(--blue-dark);
      transform: translateY(-2px);
      box-shadow: 0 14px 40px rgba(43,93,224,.40);
    }
    .btn-primary:active { transform: scale(.97); }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px;
      background: transparent;
      color: var(--ink);
      border: 2px solid var(--border);
      border-radius: 14px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: .06em;
      text-transform: uppercase;
      text-decoration: none;
      transition: border-color .2s, color .2s;
    }
    .btn-ghost:hover { border-color: var(--blue); color: var(--blue); }

    /* ── Nav link ── */
    .nav-link {
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: var(--muted);
      text-decoration: none;
      transition: color .2s;
    }
    .nav-link:hover { color: var(--blue); }

    /* ── Queue widget ── */
    .queue-widget {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 24px;
      box-shadow: 0 24px 64px rgba(10,13,20,.10);
      width: 320px;
      overflow: hidden;
    }

    /* ── Step connector ── */
    .step-connector {
      flex: 1;
      height: 2px;
      background: linear-gradient(90deg, var(--blue) 0%, var(--border) 100%);
      margin: 0 8px;
    }

    /* ── Stat counter ── */
    .stat-num {
      font-family: 'Outfit', sans-serif;
      font-size: clamp(42px, 5vw, 60px);
      font-weight: 600;
      color: var(--ink);
      line-height: 1;
    }

    /* ── Section tag ── */
    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: var(--blue-light);
      color: var(--blue);
      border-radius: 100px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    /* ── Pricing ── */
    .plan-popular {
      position: absolute;
      top: -14px; left: 50%; transform: translateX(-50%);
      background: var(--blue);
      color: #fff;
      font-family: 'Outfit', sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: .15em;
      text-transform: uppercase;
      padding: 5px 18px;
      border-radius: 100px;
      white-space: nowrap;
    }

    /* ── Scrollbar hide ── */
    .no-scrollbar::-webkit-scrollbar { display: none; }

    /* ── Footer ── */
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 32px;
    }
    @media(max-width: 768px) {
      .footer-grid { grid-template-columns: 1fr; text-align: center; }
    }

    /* ── Hero headline ── */
    h1.hero-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: clamp(40px, 5.5vw, 72px);
      line-height: 1.05;
      letter-spacing: -.025em;
      color: var(--ink);
    }

    h2.section-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: clamp(30px, 3.5vw, 50px);
      line-height: 1.1;
      letter-spacing: -.02em;
    }

    /* ── Noise overlay ── */
    .noise::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }
  `}</style>
);

/* ─── Scroll Reveal Hook ─────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Animated Counter ───────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const num = parseInt(target.replace(/\D/g, ""), 10);
        const step = Math.max(1, Math.floor(num / 40));
        const timer = setInterval(() => {
          start = Math.min(start + step, num);
          setValue(start);
          if (start >= num) clearInterval(timer);
        }, 30);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  const display = target.includes("+") ? `+${value}` : target.includes("%") ? `${value}%` : `${value}`;
  return <span ref={ref} className="stat-num">{display}{suffix}</span>;
}

/* ─── Live Queue Widget ──────────────────────────────────────────── */
function LiveQueueWidget() {
  const [queue, setQueue] = useState([
    { id: "A001", status: "attending", wait: 0 },
    { id: "A002", status: "waiting", wait: 3 },
    { id: "A003", status: "waiting", wait: 8 },
    { id: "A004", status: "waiting", wait: 14 },
  ]);
  const [callEffect, setCallEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev => {
        const next = [...prev];
        // promote first waiting to attending, push a new one
        const firstWaiting = next.findIndex(q => q.status === "waiting");
        if (firstWaiting !== -1) {
          next[0] = { ...next[firstWaiting], status: "attending", wait: 0 };
          next.splice(firstWaiting, 1);
        }
        const lastId = parseInt(next[next.length - 1]?.id.replace("A", "") || "4");
        next.push({ id: `A${String(lastId + 1).padStart(3, "0")}`, status: "waiting", wait: (next.length) * 5 });
        return next.slice(0, 4);
      });
      setCallEffect(true);
      setTimeout(() => setCallEffect(false), 800);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="queue-widget">
      {/* Header */}
      <div style={{ background: "var(--ink)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", position: "relative" }}>
            <div className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", opacity: .4 }}></div>
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: ".06em" }}>NEXT LIVE</span>
        </div>
        <span style={{ fontSize: 11, color: "#6B7280", fontWeight: 600 }}>Balcão 2 · Aberto</span>
      </div>

      {/* Now serving */}
      <div style={{
        padding: "20px",
        background: callEffect ? "rgba(43,93,224,.06)" : "var(--blue-light)",
        borderBottom: "1px solid var(--border)",
        transition: "background .4s"
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 6 }}>
          EM ATENDIMENTO
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 600, color: "var(--blue)" }}>
            {queue[0]?.id}
          </span>
          <div style={{
            background: "var(--blue)", color: "#fff", borderRadius: 10,
            padding: "6px 12px", fontSize: 11, fontWeight: 600, letterSpacing: ".06em"
          }}>
            BALCÃO 2
          </div>
        </div>
      </div>

      {/* Queue list */}
      <div style={{ padding: "12px 0" }}>
        {queue.slice(1).map((item, i) => (
          <div key={item.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 20px",
            background: i === 0 ? "var(--surface)" : "transparent",
            borderLeft: i === 0 ? "3px solid var(--blue)" : "3px solid transparent",
            transition: "all .4s"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: i === 0 ? "var(--blue-light)" : "#F3F4F6",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 600, color: i === 0 ? "var(--blue)" : "var(--muted)"
              }}>
                {i + 1}
              </div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>{item.id}</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>~{item.wait} min</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", background: "var(--surface)", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>3 pessoas aguardam</span>
        <div style={{ display: "flex", gap: 4 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="qpulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)", animationDelay: `${i * .3}s` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function LandingPage() {
  useReveal();

  const whatsappNumber = "244956821719";
  const supportEmail = "dsousa.capital.ao+next@gmail.com";

  const plans = [
    {
      name: "Mensal",
      price: "5.000",
      currency: "Kz",
      period: "por mês",
      features: ["Senhas Ilimitadas", "Dashboard em Tempo Real", "Suporte via Email", "Até 3 Balcões"],
      subject: "Plano Mensal - NEXT"
    },
    {
      name: "Anual",
      price: "50.000",
      currency: "Kz",
      period: "por ano",
      badge: "MAIS POPULAR",
      features: ["Tudo do Mensal", "2 Meses Grátis", "Suporte Prioritário", "Balcões Ilimitados", "Relatórios Mensais"],
      highlight: true,
      subject: "Plano Anual - NEXT"
    }
  ];

  const steps = [
    { icon: <Smartphone size={22} />, num: "01", title: "Check-in via QR", desc: "O cliente escaneia o código e entra na fila instantaneamente, sem papel." },
    { icon: <Bell size={22} />, num: "02", title: "Espera Livre", desc: "Notificações automáticas avisam quando está quase na vez." },
    { icon: <BarChart3 size={22} />, num: "03", title: "Analytics ao Vivo", desc: "Dashboards em tempo real com métricas de performance da equipa." }
  ];

  const reasons = [
    { icon: <Zap size={20} />, t: "Alta Performance", d: "Zero latência mesmo com milhares de acessos simultâneos." },
    { icon: <ShieldCheck size={20} />, t: "Segurança Total", d: "Encriptação de ponta que protege todos os dados dos seus clientes." },
    { icon: <Clock size={20} />, t: "+40% Retenção", d: "Reduza o abandono de fila com uma espera confortável e previsível." }
  ];

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyles />

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 40px", height: 68,
        background: "rgba(255,255,255,.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 600, letterSpacing: "-.02em" }}>
          NEXT<span style={{ color: "var(--blue)" }}>.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="#como-funciona" className="nav-link">Como Funciona</a>
          <a href="#pricing" className="nav-link">Preços</a>
          <a href="/login" style={{
            padding: "10px 22px", background: "var(--ink)", color: "#fff",
            borderRadius: 12, fontFamily: "'Outfit', sans-serif",
            fontWeight: 600, fontSize: 13, letterSpacing: ".05em", textDecoration: "none",
            transition: "background .2s, transform .2s"
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#333"}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "var(--ink)"}
          >
            Login
          </a>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="mesh-bg" style={{ padding: "80px 40px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap" }}>

          {/* Left */}
          <div style={{ flex: "1 1 480px", maxWidth: 600 }}>
            <div className="reveal section-tag">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)", display: "inline-block" }}></span>
              Gestão de Filas · Angola
            </div>

            <h1 className="hero-title reveal reveal-delay-1" style={{ marginBottom: 8 }}>
              O TEMPO É O ACTIVO
            </h1>
            <h1 className="hero-title reveal reveal-delay-2" style={{ color: "var(--blue)", marginBottom: 28 }}>
              MAIS PRECIOSO.
            </h1>

            <p className="reveal reveal-delay-3" style={{
              fontSize: 19, lineHeight: 1.65, color: "var(--muted)",
              fontWeight: 400, maxWidth: 460, marginBottom: 44,
              borderLeft: "3px solid var(--blue)", paddingLeft: 20
            }}>
              Transforme a espera em experiência. O NEXT digitaliza as filas do seu negócio com inteligência e elegância.
            </p>

            <div className="reveal reveal-delay-4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de implementar o NEXT no meu negócio.`}
                target="_blank" rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={20} />
                Começar Agora
              </a>
              <a href="#como-funciona" className="btn-ghost">
                Ver Demo
                <ChevronRight size={16} />
              </a>
            </div>

            {/* Trust bar */}
            <div className="reveal reveal-delay-4" style={{
              display: "flex", alignItems: "center", gap: 24, marginTop: 44,
              paddingTop: 32, borderTop: "1px solid var(--border)"
            }}>
              {[["50+", "Empresas"], ["60%", "Menos Espera"], ["100%", "Uptime"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 600, color: "var(--ink)" }}>{n}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Phone + Live Widget */}
          <div className="reveal reveal-delay-2" style={{ flex: "1 1 420px", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 20, position: "relative" }}>
            {/* Glow */}
            <div style={{
              position: "absolute", inset: -40,
              background: "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(43,93,224,.12) 0%, transparent 70%)",
              pointerEvents: "none", zIndex: 0
            }}></div>

            {/* Phone */}
            <div className="float" style={{ position: "relative", zIndex: 1, maxWidth: 200 }}>
              <img
                src="/telefone.png"
                alt="NEXT Mobile App"
                style={{ width: "100%", height: "auto", filter: "drop-shadow(0 32px 48px rgba(43,93,224,.20))" }}
              />
            </div>

            {/* Live Queue Widget */}
            <div style={{ position: "relative", zIndex: 1, paddingBottom: 16 }}>
              <div className="float" style={{ animationDelay: ".6s" }}>
                <LiveQueueWidget />
              </div>
              {/* Active badge */}
              <div style={{
                position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
                background: "#fff", padding: "8px 16px",
                borderRadius: 100, boxShadow: "0 4px 20px rgba(0,0,0,.08)",
                border: "1px solid var(--border)",
                display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap"
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", position: "relative" }}>
                  <div className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", opacity: .4 }}></div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)" }}>Sistema Activo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────── */}
      <section style={{ padding: "28px 0", background: "var(--ink)", overflow: "hidden", borderTop: "1px solid #1c2033" }}>
        <div className="marquee-track">
          {[1, 2].map(loop => (
            <div key={loop} style={{ display: "flex", gap: 0 }}>
              {["Filas Digitais", "Dashboard Real-time", "QR Code Check-in", "Analytics Precisos", "Suporte Premium", "Escalabilidade Total", "Notificações Auto", "Zero Papel"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <span style={{
                    padding: "0 36px",
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                    fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase",
                    color: i % 2 === 0 ? "#fff" : "var(--blue)",
                    whiteSpace: "nowrap"
                  }}>{t}</span>
                  <span style={{ color: "#333", fontSize: 18 }}>·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48 }}>
          {[
            { val: "60%", label: "Redução no Tempo de Espera", icon: <Zap size={24} />, suffix: "" },
            { val: "50", label: "Empresas Activas em Angola", icon: <Users size={24} />, suffix: "+" },
            { val: "100", label: "Controlo Operacional Total", icon: <BarChart3 size={24} />, suffix: "%" },
          ].map((s, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ textAlign: "center" }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: "var(--blue-light)", color: "var(--blue)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                {s.icon}
              </div>
              <AnimatedCounter target={s.val} />
              <div style={{ marginTop: 4, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────────────────────── */}
      <section id="como-funciona" style={{ background: "var(--surface)", padding: "100px 40px", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)", display: "inline-block" }}></span>
              Como Funciona
            </div>
            <h2 className="section-title">Simples para o cliente.<br /><span style={{ color: "var(--blue)" }}>Poderoso para si.</span></h2>
          </div>

          {/* Steps */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className={`reveal reveal-delay-${i + 1} card-hover`} style={{
                  flex: "1 1 260px", maxWidth: 320,
                  background: "#fff", border: "1px solid var(--border)",
                  borderRadius: 24, padding: "40px 32px",
                  position: "relative", overflow: "hidden"
                }}>
                  {/* Step number bg */}
                  <div style={{
                    position: "absolute", top: -16, right: -8,
                    fontFamily: "'Outfit', sans-serif", fontSize: 96, fontWeight: 600,
                    color: "var(--blue-light)", lineHeight: 1, userSelect: "none"
                  }}>{step.num}</div>

                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: "var(--blue)", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 24, position: "relative", zIndex: 1
                  }}>
                    {step.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 600,
                    marginBottom: 12, position: "relative", zIndex: 1
                  }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, position: "relative", zIndex: 1 }}>{step.desc}</p>
                </div>

                {i < steps.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", paddingTop: 24 }}>
                    <ArrowRight size={24} color="var(--border)" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORQUÊ NEXT ───────────────────────────────────────────── */}
      <section style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", flexWrap: "wrap" }}>

          {/* Left */}
          <div className="reveal">
            <div className="section-tag">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)", display: "inline-block" }}></span>
              Porquê Escolher
            </div>
            <h2 className="section-title" style={{ marginBottom: 48 }}>
              Eficiência que gera<br /><span style={{ color: "var(--blue)" }}>faturação.</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {reasons.map((r, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: "var(--blue-light)", color: "var(--blue)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background .2s, color .2s", cursor: "default"
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = "var(--blue)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = "var(--blue-light)"; e.currentTarget.style.color = "var(--blue)"; }}
                  >
                    {r.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{r.t}</div>
                    <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{r.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Stat Card */}
          <div className="reveal reveal-delay-2">
            <div style={{
              background: "var(--ink)", borderRadius: 32, padding: "52px 48px",
              color: "#fff", position: "relative", overflow: "hidden"
            }}>
              {/* Deco */}
              <div style={{
                position: "absolute", top: -60, right: -60,
                width: 220, height: 220, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(43,93,224,.25) 0%, transparent 70%)"
              }}></div>
              <div style={{
                position: "absolute", bottom: -40, left: -40,
                width: 160, height: 160, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(43,93,224,.12) 0%, transparent 70%)"
              }}></div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
                  <div style={{ width: 32, height: 2, background: "var(--blue)", borderRadius: 2 }}></div>
                  <span style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "#6B7280", fontWeight: 600 }}>Dado de Mercado</span>
                </div>

                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 600,
                  lineHeight: 1.3, marginBottom: 32
                }}>
                  "70% dos clientes <span style={{ color: "var(--blue)", fontStyle: "italic" }}>abandonam</span> quando a fila parece desorganizada."
                </p>

                <div style={{
                  padding: "20px 0", borderTop: "1px solid rgba(255,255,255,.08)",
                  display: "flex", alignItems: "center", gap: 16
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(43,93,224,.15)", color: "var(--blue)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <Users size={20} />
                  </div>
                  <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
                    Baseado em estudos de comportamento do consumidor em retalho.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────── */}
      <section id="pricing" style={{ background: "var(--surface)", padding: "100px 40px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)", display: "inline-block" }}></span>
              Planos
            </div>
            <h2 className="section-title">Preços <span style={{ color: "var(--blue)" }}>transparentes.</span></h2>
            <p style={{ marginTop: 16, fontSize: 17, color: "var(--muted)" }}>Sem surpresas. Sem letras pequenas.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {plans.map((plan, i) => (
              <div key={plan.name} className={`reveal reveal-delay-${i + 1}`} style={{
                background: plan.highlight ? "var(--blue)" : "#fff",
                border: plan.highlight ? "none" : "1px solid var(--border)",
                borderRadius: 28, padding: "44px 40px",
                position: "relative",
                boxShadow: plan.highlight ? "0 24px 64px rgba(43,93,224,.30)" : "0 4px 20px rgba(0,0,0,.05)",
                transition: "transform .35s cubic-bezier(.16,1,.3,1)",
                cursor: "default"
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
              >
                {plan.badge && <div className="plan-popular">{plan.badge}</div>}

                <div style={{ marginBottom: 32 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase",
                    padding: "5px 14px", borderRadius: 100,
                    background: plan.highlight ? "rgba(255,255,255,.12)" : "var(--blue-light)",
                    color: plan.highlight ? "#fff" : "var(--blue)"
                  }}>{plan.name}</span>

                  <div style={{ marginTop: 24, display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 48, fontWeight: 600,
                      color: plan.highlight ? "#fff" : "var(--ink)"
                    }}>{plan.price}</span>
                    <span style={{ fontWeight: 600, fontSize: 18, color: plan.highlight ? "rgba(255,255,255,.7)" : "var(--muted)" }}>
                      {plan.currency}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: plan.highlight ? "rgba(255,255,255,.6)" : "var(--muted)", fontWeight: 500, marginTop: 2 }}>
                    {plan.period}
                  </div>
                </div>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: 500, color: plan.highlight ? "#fff" : "var(--ink)" }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                        background: plan.highlight ? "rgba(255,255,255,.15)" : "var(--blue-light)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <Check size={12} color={plan.highlight ? "#fff" : "var(--blue)"} strokeWidth={3} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Tenho interesse no ${plan.subject}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "16px", borderRadius: 14,
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 13,
                    letterSpacing: ".06em", textTransform: "uppercase", textDecoration: "none",
                    background: plan.highlight ? "#fff" : "var(--ink)",
                    color: plan.highlight ? "var(--blue)" : "#fff",
                    transition: "opacity .2s, transform .2s"
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.opacity = ".85"; e.currentTarget.style.transform = "scale(.98)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <MessageCircle size={18} />
                  Assinar pelo WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <section className="reveal" style={{ padding: "80px 40px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          background: "var(--blue)", borderRadius: 32, padding: "72px 64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 32, flexWrap: "wrap",
          position: "relative", overflow: "hidden"
        }}>
          {/* Deco circles */}
          <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,.06)" }}></div>
          <div style={{ position: "absolute", right: 60, bottom: -100, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,.04)" }}></div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 600, color: "#fff", marginBottom: 12 }}>
              Pronto para elevar o padrão?
            </h2>
            <p style={{ color: "rgba(255,255,255,.75)", fontSize: 16, maxWidth: 460 }}>
              Junte-se a mais de 50 empresas angolanas que já transformaram o atendimento com o NEXT.
            </p>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=Olá! Quero saber mais sobre o NEXT.`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "18px 36px",
              background: "#fff", color: "var(--blue)",
              borderRadius: 16, textDecoration: "none",
              fontFamily: "'Outfit', sans-serif", fontWeight: 600,
              fontSize: 14, letterSpacing: ".06em", textTransform: "uppercase",
              transition: "transform .2s, box-shadow .2s",
              boxShadow: "0 8px 32px rgba(0,0,0,.15)",
              position: "relative", zIndex: 1
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,.20)"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,.15)"; }}
          >
            <MessageCircle size={20} />
            Falar Connosco
          </a>
        </div>
      </section>

      {/* ── CONTACTOS ─────────────────────────────────────────────── */}
      <section style={{ background: "var(--surface)", padding: "80px 40px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div className="reveal">
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 600, marginBottom: 8 }}>Fale Connosco</h2>
            <p style={{ color: "var(--muted)", fontSize: 16 }}>Pronto para elevar o padrão do seu atendimento?</p>
          </div>
          <div className="reveal reveal-delay-1" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: <Mail size={18} />, label: "suporte@next.ao", href: `mailto:${supportEmail}` },
              { icon: <Instagram size={18} />, label: "@next_gestao", href: "https://www.instagram.com/dsousa.capital.ao" },
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 20px", background: "#fff",
                border: "1px solid var(--border)", borderRadius: 14,
                fontSize: 14, fontWeight: 500, color: "var(--ink)", textDecoration: "none",
                transition: "border-color .2s, color .2s"
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--blue)"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink)"; }}
              >
                <span style={{ color: "var(--blue)" }}>{c.icon}</span>
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer style={{ background: "var(--ink)", padding: "56px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="footer-grid">
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 600, color: "#fff", letterSpacing: "-.02em" }}>
            NEXT<span style={{ color: "var(--blue)" }}>.</span>
          </div>

          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
            {[["FAQ", "/faq"], ["Cookies", "/cookies"], ["Suporte", `mailto:${supportEmail}`]].map(([l, h]) => (
              <a key={l} href={h} style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600,
                letterSpacing: ".1em", textTransform: "uppercase",
                color: "#6B7280", textDecoration: "none", transition: "color .2s"
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#fff"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#6B7280"}
              >{l}</a>
            ))}
          </div>

          <div style={{ textAlign: "right", fontSize: 11, color: "#4B5563", letterSpacing: ".08em", textTransform: "uppercase", lineHeight: 1.8 }}>
            © 2026 NEXT · Gestão de Filas<br />
            <span style={{ color: "#374151" }}>D'Sousa Capital · Angola</span>
          </div>
        </div>
      </footer>
    </div>
  );
}