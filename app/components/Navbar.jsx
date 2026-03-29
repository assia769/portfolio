'use client';
import { useState, useEffect } from 'react';
import { personal } from '../lib/data';

const LINKS = [
  { href: '#about',          label: 'À Propos' },
  { href: '#experience',     label: 'Expérience' },
  { href: '#projects',       label: 'Projets' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#skills',         label: 'Compétences' },
  { href: '#contact',        label: 'Contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState('');
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [imgOpen,   setImgOpen]   = useState(false);

  /* ── Scroll : glassmorphism + section active ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

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

  /* ── Fermer le modal au clavier ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setImgOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── Navigation smooth ── */
  const nav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ════════════════════════════════════════════ */
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,
        transition: 'all .5s cubic-bezier(.16,1,.3,1)',
        background: scrolled ? 'rgba(3,3,10,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(201,168,76,0.12)'
          : '1px solid transparent',
        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
      }}>
        <div style={{
          maxWidth: '1500px', margin: '0 auto',
          padding: '0 6vw',
          height: '72px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* ── AVATAR cliquable ── */}
          <button
            onClick={() => setImgOpen(true)}
            aria-label="Voir la photo de profil"
            style={{
              background: 'none', border: 'none', padding: 0,
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '46px', height: '46px',
                borderRadius: '50%', overflow: 'hidden',
                border: '1.5px solid rgba(201,168,76,0.55)',
                boxShadow: '0 0 0 3px rgba(201,168,76,0.1)',
                transition: 'transform .3s ease, box-shadow .3s ease, border-color .3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(201,168,76,0.35)';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.55)';
              }}
            >
              <img
                src="/images/profile.png"
                alt="A.H"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </button>

          {/* ── LIENS DESKTOP ── */}
          <div className="nav-desktop" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {LINKS.map(({ href, label }) => {
              const isActive = active === href;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => nav(e, href)}
                  className="nav-link"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--gold)' : 'var(--white-dim)',
                    textDecoration: 'none',
                    cursor: 'none',
                    position: 'relative',
                    padding: '4px 0',
                    transition: 'color .3s ease',
                  }}
                >
                  {label}
                  {/* Soulignement animé */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: '1px',
                    width: isActive ? '100%' : '0%',
                    background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                    transition: 'width .35s cubic-bezier(.16,1,.3,1)',
                    boxShadow: '0 0 6px rgba(201,168,76,0.5)',
                  }} />
                </a>
              );
            })}

            {/* Bouton CV */}
            <a
              href={personal.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ padding: '9px 22px', fontSize: '9px' }}
            >
              <span>CV</span>
              <span style={{ fontSize: '11px' }}>↗</span>
            </a>
          </div>

          {/* ── BURGER MOBILE ── */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="burger-btn"
            aria-label="Menu"
            style={{
              display: 'none',
              background: 'none', border: 'none', cursor: 'none',
              flexDirection: 'column', gap: '5px', padding: '6px',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1px',
                background: 'var(--gold)',
                transition: 'all .3s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                boxShadow: '0 0 4px rgba(201,168,76,0.4)',
              }} />
            ))}
          </button>
        </div>

        {/* ── MENU MOBILE ── */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '420px' : '0',
          transition: 'max-height .4s cubic-bezier(.16,1,.3,1)',
          background: 'rgba(3,3,10,0.97)',
          backdropFilter: 'blur(24px)',
          borderTop: menuOpen ? '1px solid rgba(201,168,76,0.1)' : 'none',
        }}>
          <div style={{ padding: '20px 6vw 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => nav(e, href)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: active === href ? 'var(--gold)' : 'var(--white-dim)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
            <a
              href={personal.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: '10px' }}
            >
              <span>Télécharger CV</span>
            </a>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .nav-desktop { display: none !important; }
            .burger-btn  { display: flex !important; }
          }
          .nav-link:hover {
            color: var(--gold) !important;
            opacity: 1 !important;
          }
        `}</style>
      </nav>

      {/* ── MODAL ZOOM AVATAR ── */}
      {imgOpen && (
        <div
          onClick={() => setImgOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn .25s ease',
            cursor: 'pointer',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', animation: 'zoomIn .3s cubic-bezier(.34,1.56,.64,1)' }}
          >
            <img
              src="/images/profile.png"
              alt="A.H"
              style={{
                width: '320px', height: '320px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(201,168,76,0.8)',
                boxShadow: '0 0 60px rgba(201,168,76,0.25), 0 20px 60px rgba(0,0,0,0.6)',
                display: 'block',
              }}
            />
            <button
              onClick={() => setImgOpen(false)}
              aria-label="Fermer"
              style={{
                position: 'absolute', top: '-12px', right: '-12px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(201,168,76,0.9)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', color: '#000', fontWeight: 'bold',
                boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                transition: 'background .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.9)'}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </>
  );
}