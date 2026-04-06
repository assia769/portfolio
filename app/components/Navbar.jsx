'use client';
import { useState, useEffect } from 'react';
import { personal } from '../lib/data';

const LINKS = [
  { href: '#about',          label: 'À Propos',       num: '01' },
  { href: '#experience',     label: 'Expérience',     num: '02' },
  { href: '#projects',       label: 'Projets',        num: '03' },
  { href: '#certifications', label: 'Certifications', num: '04' },
  { href: '#skills',         label: 'Compétences',    num: '05' },
  { href: '#contact',        label: 'Contact',        num: '06' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState('');
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = LINKS.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!href || href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,
        transition: 'all .45s cubic-bezier(.16,1,.3,1)',
        background: scrolled ? 'rgba(8,6,10,0.90)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(192,53,94,0.14)' : '1px solid transparent',
        boxShadow: scrolled ? '0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(192,53,94,0.04) inset' : 'none',
      }}>
        <div style={{
          maxWidth: '1500px', margin: '0 auto',
          padding: '0 6vw',
          height: scrolled ? '76px' : '96px',
          transition: 'height .45s cubic-bezier(.16,1,.3,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* ── LOGO ── */}
          <button
            onClick={(e) => nav(e, null)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            
            {/* Name */}
            <div className="logo-text" style={{ lineHeight: 1.2 }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '15px', fontWeight: 400,
                color: 'var(--white)', margin: 0,
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {personal?.name ?? 'Assia H.'}
              </p>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px', fontWeight: 400,
                color: 'var(--rose)', margin: 0,
                letterSpacing: '0.26em', textTransform: 'uppercase',
                opacity: 0.9,
              }}>
                {personal?.title ?? 'Ingénieure Informatique'}
              </p>
            </div>
          </button>

          {/* ── DESKTOP LINKS ── */}
          <div className="nav-desktop" style={{ display: 'flex', gap: '0', alignItems: 'center' }}>
            {LINKS.map(({ href, label, num }) => {
              const isActive = active === href;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => nav(e, href)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--rose)' : 'rgba(253,240,246,0.52)',
                    textDecoration: 'none',
                    cursor: 'none',
                    position: 'relative',
                    padding: '8px 18px',
                    transition: 'color .3s ease',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '3px',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--rose-light)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(253,240,246,0.52)'; }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '7px',
                    color: isActive ? 'rgba(192,53,94,0.6)' : 'rgba(253,240,246,0.2)',
                    letterSpacing: '0.1em', transition: 'color .3s',
                  }}>{num}</span>
                  {label}
                  {/* Active underline */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    height: '1.5px',
                    width: isActive ? '60%' : '0%',
                    background: 'linear-gradient(90deg, transparent, var(--rose), transparent)',
                    transition: 'width .4s cubic-bezier(.16,1,.3,1)',
                    boxShadow: '0 0 6px rgba(192,53,94,0.5)',
                  }} />
                </a>
              );
            })}

            {/* Separator */}
            <div style={{ width: '1px', height: '28px', background: 'rgba(192,53,94,0.2)', margin: '0 10px' }} />

            {/* CV button */}
            <a
              href={personal.cv}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 24px',
                border: '1px solid rgba(192,53,94,0.45)',
                color: 'var(--rose)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                position: 'relative', overflow: 'hidden',
                transition: 'all .3s ease',
                cursor: 'none',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--rose)';
                e.currentTarget.style.background = 'rgba(192,53,94,0.10)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(192,53,94,0.18)';
                e.currentTarget.style.color = 'var(--rose-light)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(192,53,94,0.45)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = 'var(--rose)';
              }}
            >
              <span>Télécharger CV</span>
              <span style={{ fontSize: '13px' }}>↗</span>
            </a>
          </div>

          {/* ── BURGER MOBILE ── */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="burger-btn"
            aria-label="Menu"
            style={{
              display: 'none', background: 'none', border: 'none', cursor: 'none',
              flexDirection: 'column', gap: '6px', padding: '8px',
              position: 'relative', width: '44px', height: '44px',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: i === 1 ? (menuOpen ? '24px' : '16px') : '24px',
                height: '1.5px',
                background: 'linear-gradient(90deg, var(--rose), var(--mauve))',
                transition: 'all .35s cubic-bezier(.16,1,.3,1)',
                transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-7.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                boxShadow: '0 0 6px rgba(192,53,94,0.5)',
              }} />
            ))}
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '520px' : '0',
          transition: 'max-height .5s cubic-bezier(.16,1,.3,1)',
          background: 'rgba(8,6,10,0.98)',
          backdropFilter: 'blur(28px)',
          borderTop: menuOpen ? '1px solid rgba(192,53,94,0.12)' : 'none',
        }}>
          <div style={{ padding: '32px 6vw 40px', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {LINKS.map(({ href, label, num }, i) => (
              <a
                key={href} href={href} onClick={(e) => nav(e, href)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '18px',
                  padding: '14px 0',
                  borderBottom: i < LINKS.length - 1 ? '1px solid rgba(192,53,94,0.08)' : 'none',
                  textDecoration: 'none',
                  transition: 'padding-left .3s',
                }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft = '8px'}
                onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(192,53,94,0.4)', minWidth: '24px' }}>{num}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '13px',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: active === href ? 'var(--rose)' : 'rgba(253,240,246,0.7)',
                }}>{label}</span>
                {active === href && (
                  <div style={{ marginLeft: 'auto', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--rose)', boxShadow: '0 0 8px rgba(192,53,94,0.8)' }} />
                )}
              </a>
            ))}

            <a
              href={personal.cv} target="_blank" rel="noopener noreferrer"
              style={{
                marginTop: '28px', alignSelf: 'flex-start',
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 28px',
                border: '1px solid rgba(192,53,94,0.45)',
                color: 'var(--rose)',
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <span>Télécharger CV</span>
              <span style={{ fontSize: '14px' }}>↗</span>
            </a>
          </div>
        </div>

        <style>{`
          @media (max-width: 1100px) { .logo-text { display: none !important; } }
          @media (max-width: 900px)  { .nav-desktop { display: none !important; } .burger-btn { display: flex !important; } }
        `}</style>
      </nav>
    </>
  );
}