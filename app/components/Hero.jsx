'use client';
import { useEffect, useRef, useState } from 'react';
import { personal } from '../lib/data';

const ROLES = [
  'Full Stack Developer',
  'Ingénieure Informatique',
  'Leader & Innovatrice',
  '2nd Runner Up — Hult Prize 2026',
  'Chef Cellule Organisation — Open Source',
  'Animatrice des Évènements',
  'Chef de Projets',
];

// ─── PAGE PROGRESS BAR ───────────────────────────────────────────────────────
function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="page-progress" style={{ width: `${progress}%` }} />;
}

// ─── ANIMATED CODE BLOCK ─────────────────────────────────────────────────────
function CodeBlock({ visible }) {
  const lines = [
    { delay: 0,    content: [{ t: 'rose',   v: 'const ' }, { t: 'white', v: 'assia' }, { t: 'dim', v: ' = {' }] },
    { delay: 120,  content: [{ t: 'dim',    v: '  ' }, { t: 'prop',  v: 'role' }, { t: 'dim', v: ': ' }, { t: 'str', v: '"Full Stack Engineer"' }, { t: 'dim', v: ',' }] },
    { delay: 240,  content: [{ t: 'dim',    v: '  ' }, { t: 'prop',  v: 'school' }, { t: 'dim', v: ': ' }, { t: 'str', v: '"ENSAKH Khouribga"' }, { t: 'dim', v: ',' }] },
    { delay: 360,  content: [{ t: 'dim',    v: '  ' }, { t: 'prop',  v: 'stack' }, { t: 'dim', v: ': [' }, { t: 'blue', v: '"React"' }, { t: 'dim', v: ', ' }, { t: 'blue', v: '"Next.js"' }, { t: 'dim', v: ', ' }, { t: 'blue', v: '"Spring"' }, { t: 'dim', v: '],' }] },
    { delay: 480,  content: [{ t: 'dim',    v: '  ' }, { t: 'prop',  v: 'award' }, { t: 'dim', v: ': ' }, { t: 'str', v: '"🥉 Hult Prize 2026"' }, { t: 'dim', v: ',' }] },
    { delay: 600,  content: [{ t: 'dim',    v: '  ' }, { t: 'prop',  v: 'passion' }, { t: 'dim', v: ': ' }, { t: 'green', v: 'true' }, { t: 'dim', v: ',' }] },
    { delay: 720,  content: [{ t: 'dim',    v: '}' }] },
    { delay: 900,  content: [{ t: 'dim',    v: '' }] },
    { delay: 1000, content: [{ t: 'rose',   v: 'assia' }, { t: 'dim', v: '.' }, { t: 'blue', v: 'buildTheFuture' }, { t: 'dim', v: '(); // 🌸' }] },
  ];

  const colorMap = {
    rose:  'var(--rose)',
    str:   'var(--rose-light)',
    white: 'var(--white)',
    prop:  'rgba(192,53,94,0.65)',
    dim:   'rgba(253,240,246,0.28)',
    blue:  '#a5d8ff',
    green: '#b9f0c0',
  };

  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', lineHeight: 1.9, padding: '28px 32px' }}>
      {lines.map((line, i) => (
        <div key={i} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateX(-10px)',
          transition: `opacity .5s ease ${line.delay}ms, transform .5s ease ${line.delay}ms`,
          display: 'flex', flexWrap: 'wrap',
        }}>
          <span style={{ color: 'rgba(192,53,94,0.18)', marginRight: '16px', userSelect: 'none', width: '20px', textAlign: 'right', fontSize: '10px' }}>
            {i + 1}
          </span>
          {line.content.map((part, j) => (
            <span key={j} style={{ color: colorMap[part.t] }}>{part.v}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── FLOATING ORB ────────────────────────────────────────────────────────────
function Orb({ size, top, left, color, delay, blur }) {
  return (
    <div style={{
      position: 'absolute',
      width: size, height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      top, left,
      filter: `blur(${blur || size})`,
      opacity: 0.38,
      pointerEvents: 'none',
      animation: `float ${4 + delay}s ease-in-out ${delay}s infinite`,
    }} />
  );
}

// ─── MAIN HERO ────────────────────────────────────────────────────────────────
export default function Hero() {
  const [roleIdx, setRoleIdx]       = useState(0);
  const [displayed, setDisplayed]   = useState('');
  const [typing, setTyping]         = useState(true);
  const [loaded, setLoaded]         = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
  const cardRef = useRef(null);

  // Entry animation
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 100);
    const t2 = setTimeout(() => setCodeVisible(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIdx];
    let i = typing ? 0 : current.length;
    let timeout;
    const type = () => {
      if (typing) {
        if (i <= current.length) { setDisplayed(current.slice(0, i++)); timeout = setTimeout(type, 52); }
        else timeout = setTimeout(() => setTyping(false), 2000);
      } else {
        if (i >= 0) { setDisplayed(current.slice(0, i--)); timeout = setTimeout(type, 28); }
        else { setRoleIdx(p => (p + 1) % ROLES.length); setTyping(true); }
      }
    };
    timeout = setTimeout(type, 100);
    return () => clearTimeout(timeout);
  }, [roleIdx, typing]);

  // 3D tilt on code card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
    };
    const onLeave = () => { card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)'; card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)'; };
    const onEnter = () => { card.style.transition = 'transform .1s ease'; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('mouseenter', onEnter);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); card.removeEventListener('mouseenter', onEnter); };
  }, []);

  const nav = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <ProgressBar />

      <section id="home" style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '60px',
        padding: '130px 6vw 80px',
        maxWidth: '1500px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* ── FLOATING ORBS — rose palette ── */}
        <Orb size="420px" top="-8%"  left="-6%"  color="rgba(192,53,94,0.45)"  delay={0}   blur="130px" />
        <Orb size="320px" top="62%"  left="55%"  color="rgba(139,74,139,0.35)" delay={1.5} blur="110px" />
        <Orb size="220px" top="20%"  left="72%"  color="rgba(192,53,94,0.28)"  delay={3}   blur="80px" />
        <Orb size="260px" top="78%"  left="-8%"  color="rgba(138,31,66,0.25)"  delay={2}   blur="90px" />

        {/* ── LEFT — TEXT ── */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* BADGE */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(20px)',
            transition: 'all .8s cubic-bezier(.16,1,.3,1) .1s',
            marginBottom: '32px',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <div className="badge-gold">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', display: 'inline-block' }} />
              Disponible pour opportunités
            </div>
          </div>

          {/* NAME */}
          <div style={{
            marginBottom: '4px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) .2s',
          }}>
            <h1 className="hero-title-main">Assia</h1>
          </div>

          <div style={{
            marginBottom: '40px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) .35s',
          }}>
            <div className="glitch-wrapper" data-text="Houbbadi" style={{ display: 'inline-block' }}>
              <h1 className="hero-title-outline">Houbbadi</h1>
            </div>
          </div>

          {/* TYPEWRITER */}
          <div style={{
            marginBottom: '28px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(25px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) .5s',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--rose)', opacity: 0.6 }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(12px, 1.6vw, 15px)',
              color: 'var(--rose)',
              letterSpacing: '0.06em',
            }}>
              {displayed}<span className="typewriter-cursor" />
            </span>
          </div>

          {/* DESCRIPTION */}
          <p style={{
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            color: 'var(--white-dim)',
            maxWidth: '480px',
            lineHeight: 1.9,
            marginBottom: '48px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(25px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) .65s',
          }}>
            Étudiante Ingénieure à l'ENSAKH — je construis des applications full stack
            robustes et des expériences utilisateur mémorables. Leader, innovatrice,
            et{' '}
            <span style={{ color: 'var(--rose-light)', fontStyle: 'italic' }}>
              2nd Runner Up au Hult Prize 2026
            </span>.
          </p>

          {/* BUTTONS */}
          <div style={{
            display: 'flex', gap: '16px', flexWrap: 'wrap',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(25px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) .8s',
          }}>
            <a href="#projects" className="btn-gold"
              onClick={(e) => { e.preventDefault(); nav('#projects'); }}>
              <span>Voir mes Projets</span>
              <span style={{ fontSize: '12px' }}>→</span>
            </a>
            <a href="#contact" className="btn-ghost"
              onClick={(e) => { e.preventDefault(); nav('#contact'); }}>
              <span>Me Contacter</span>
            </a>
          </div>

          {/* STATS */}
          <div style={{
            display: 'flex', gap: '36px', marginTop: '56px',
            paddingTop: '36px',
            borderTop: '1px solid rgba(192,53,94,0.12)',
            opacity: loaded ? 1 : 0,
            transition: 'all 1s cubic-bezier(.16,1,.3,1) 1s',
          }}>
            {[
              { n: '5+',  l: 'Projets' },
              { n: '3',   l: 'Prix' },
              { n: '2',   l: 'Stages' },
              { n: '11+', l: 'Certifications' },
            ].map(({ n, l }) => (
              <div key={l}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, var(--rose-light), var(--rose))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: '4px',
                  filter: 'drop-shadow(0 0 12px rgba(192,53,94,0.35))',
                }}>{n}</div>
                <div style={{
                  fontSize: '9px', color: 'var(--white-dimmer)',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — 3D CODE CARD ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'none' : 'translateX(50px)',
          transition: 'all 1.2s cubic-bezier(.16,1,.3,1) .4s',
        }}>
          {/* Decorative rings */}
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '180px', height: '180px',
            border: '1px solid rgba(192,53,94,0.14)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', top: '-20px', right: '-20px',
            width: '120px', height: '120px',
            border: '1px solid rgba(139,74,139,0.16)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out 1s infinite',
          }} />

          {/* MAIN CODE CARD */}
          <div
            ref={cardRef}
            className="terminal-window"
            style={{ borderRadius: '2px', transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            {/* Top bar */}
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(192,53,94,0.08)',
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.015)',
            }}>
              {['#ef4444', '#f59e0b', '#4ade80'].map((c, i) => (
                <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8, boxShadow: `0 0 6px ${c}55` }} />
              ))}
              <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(253,240,246,0.28)', letterSpacing: '0.1em' }}>
                assia.config.js
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--rose)', letterSpacing: '0.1em' }}>
                ● live
              </div>
            </div>

            <CodeBlock visible={codeVisible} />

            {/* Bottom status bar */}
            <div style={{
              padding: '10px 20px',
              borderTop: '1px solid rgba(192,53,94,0.06)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'rgba(255,255,255,0.01)',
            }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                {['JavaScript', 'UTF-8', 'LF'].map(s => (
                  <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(253,240,246,0.2)', letterSpacing: '0.1em' }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--rose)' }}>compiled</span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div style={{
            position: 'absolute', bottom: '-20px', left: '-24px',
            padding: '10px 16px',
            background: 'rgba(13,11,16,0.92)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(192,53,94,0.25)',
            fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--rose-light)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4), 0 0 15px rgba(192,53,94,0.1)',
            animation: 'float 4s ease-in-out 0.5s infinite',
            whiteSpace: 'nowrap',
          }}>
            🥉 Hult Prize 2026
          </div>

          <div style={{
            position: 'absolute', top: '-18px', left: '20%',
            padding: '8px 14px',
            background: 'rgba(13,11,16,0.92)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(139,74,139,0.28)',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'var(--mauve)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            animation: 'float 5s ease-in-out 1.5s infinite',
            whiteSpace: 'nowrap',
          }}>
            ⚡ Next.js + React
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div style={{
          position: 'absolute', bottom: '36px', left: '50%',
          opacity: loaded ? 0.5 : 0,
          transition: 'opacity 1s ease 1.5s',
          animation: 'scrollBounce 2.5s ease-in-out infinite',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.35em', color: 'var(--white-dimmer)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Scroll
          </span>
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, var(--rose), transparent)' }} />
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          #home {
            grid-template-columns: 1fr !important;
            padding-top: 110px !important;
          }
          #home > div:last-of-type { display: none; }
        }
      `}</style>
    </>
  );
}