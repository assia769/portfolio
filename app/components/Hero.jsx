'use client';
import { useEffect, useRef, useState } from 'react';
import { personal } from '../lib/data';

const ROLES = [
  'Full Stack Developer',
  'Leader & Innovatrice',
  'Ingénieure Informatique',
  'Hult Prize 2nd Runner Up',
  'Chef de Projets',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIndex];
    let i = typing ? 0 : current.length;
    let timeout;

    const type = () => {
      if (typing) {
        if (i <= current.length) {
          setDisplayed(current.slice(0, i));
          i++;
          timeout = setTimeout(type, 55);
        } else {
          timeout = setTimeout(() => setTyping(false), 1800);
        }
      } else {
        if (i >= 0) {
          setDisplayed(current.slice(0, i));
          i--;
          timeout = setTimeout(type, 30);
        } else {
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          setTyping(true);
        }
      }
    };
    timeout = setTimeout(type, 100);
    return () => clearTimeout(timeout);
  }, [roleIndex, typing]);

  // Entry animation
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Parallax on hero number
  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      heroRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 40px 80px',
      maxWidth: '1400px', margin: '0 auto',
    }}>
      {/* BIG GHOST NUMBER */}
      <div ref={heroRef} style={{
        position: 'absolute',
        right: '-5%',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(180px, 28vw, 400px)',
        fontWeight: 200,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(201,168,76,0.06)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'transform 0.1s ease',
      }}>
        AH
      </div>

      {/* DECORATIVE HORIZONTAL LINE */}
      <div style={{
        position: 'absolute', top: '20%', left: 0, right: '40%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)',
      }} />

      {/* CONTENT */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>

        {/* Label */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
          marginBottom: '28px',
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <span className="section-label">Portfolio 2026</span>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
        </div>

        {/* NAME */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 9vw, 130px)',
          fontWeight: 300,
          lineHeight: 1.0,
          color: 'var(--white)',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.2s',
        }}>
          Assia
        </h1>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 9vw, 130px)',
          fontWeight: 300,
          lineHeight: 1.0,
          color: 'transparent',
          WebkitTextStroke: '1px var(--gold)',
          letterSpacing: '-0.02em',
          marginBottom: '40px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.35s',
        }}>
          Houbbadi
        </h1>

        {/* TYPEWRITER */}
        <div style={{
          marginBottom: '48px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.5s',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(13px, 2vw, 18px)',
            color: 'var(--gold)',
            letterSpacing: '0.08em',
          }}>
            {displayed}
            <span className="typewriter-cursor" />
          </span>
        </div>

        {/* DESCRIPTION */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(12px, 1.4vw, 14px)',
          color: 'var(--white-dim)',
          maxWidth: '520px',
          lineHeight: 2,
          marginBottom: '52px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.65s',
        }}>
          Étudiante Ingénieure à l'ENSAKH, je construis des expériences digitales
          complètes — du back-end robuste aux interfaces qui donnent envie de rester.
          Leader, innovatrice, et passionnée par les défis qui comptent.
        </p>

        {/* BUTTONS */}
        <div style={{
          display: 'flex', gap: '20px', flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.8s',
        }}>
          <a href="#projects" className="btn-gold"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>Voir mes Projets</span>
          </a>
          <a href="#contact" className="btn-gold"
            style={{ background: 'transparent', borderColor: 'rgba(245,240,232,0.15)', color: 'var(--white-dim)' }}
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>Me Contacter</span>
          </a>
        </div>
      </div>

      {/* STATS */}
      <div style={{
        position: 'absolute', bottom: '60px', right: '60px',
        display: 'flex', gap: '48px',
        opacity: loaded ? 1 : 0,
        transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 1s',
      }} className="hero-stats">
        {[
          { num: '5+', label: 'Projets\nDéployés' },
          { num: '3+', label: 'Prix &\nDistinctions' },
          { num: '2', label: 'Stages\nProfessionnels' },
        ].map(({ num, label }) => (
          <div key={num} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '42px', fontWeight: 300,
              color: 'var(--gold)', lineHeight: 1,
              marginBottom: '6px',
            }}>{num}</div>
            <div style={{
              fontSize: '9px', letterSpacing: '0.2em',
              color: 'var(--white-dimmer)',
              textTransform: 'uppercase',
              whiteSpace: 'pre-line',
              textAlign: 'center',
            }}>{label}</div>
          </div>
        ))}
      </div>

      {/* SCROLL INDICATOR */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        opacity: loaded ? 0.5 : 0,
        transition: 'opacity 1s ease 1.2s',
        animation: 'float 3s ease-in-out infinite',
      }}>
        <span style={{ fontSize: '8px', letterSpacing: '0.3em', color: 'var(--white-dim)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-stats { display: none !important; }
        }
      `}</style>
    </section>
  );
}