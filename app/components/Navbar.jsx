'use client';
import { useState, useEffect } from 'react';

const links = [
  { href: '#about', label: 'À Propos' },
  { href: '#experience', label: 'Expérience' },
  { href: '#projects', label: 'Projets' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#skills', label: 'Compétences' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [imgOpen, setImgOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setImgOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setActive(href);
    setMenuOpen(false);
    // Fix: '#' alone is not a valid querySelector selector
    if (href && href !== '#') {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.5s ease',
        background: scrolled ? 'rgba(4,4,4,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 40px',
          height: '80px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Avatar — click opens zoom modal */}
          <button
            onClick={() => setImgOpen(true)}
            aria-label="Voir la photo de profil"
            style={{
              background: 'none', border: 'none', padding: 0,
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <div style={{
              width: '52px', height: '52px',
              borderRadius: '50%', overflow: 'hidden',
              border: '2px solid rgba(201,168,76,0.6)',
              boxShadow: '0 0 0 3px rgba(201,168,76,0.12)',
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(201,168,76,0.35)';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)';
              }}
            >
              <img
                src="/images/profile.png"
                alt="A.H"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </button>

          {/* Desktop Links */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="nav-link"
                onClick={(e) => handleNav(e, href)}
                style={{
                  color: active === href ? 'var(--gold)' : undefined,
                  fontFamily: 'var(--font-display)',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  opacity: active === href ? 1 : 0.75,
                  transition: 'color 0.3s, opacity 0.3s',
                  position: 'relative',
                }}
              >
                {label}
                {active === href && (
                  <span style={{
                    position: 'absolute', bottom: '-4px', left: 0, right: 0,
                    height: '1px', background: 'var(--gold)',
                  }} />
                )}
              </a>
            ))}
            <a
              href="/cv.pdf" target="_blank" rel="noopener noreferrer"
              className="btn-gold"
              style={{ padding: '9px 22px', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              CV
            </a>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'none', flexDirection: 'column', gap: '6px', padding: '4px',
            }}
            className="burger-btn"
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '26px', height: '1.5px',
                background: 'var(--gold)', transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-7.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: 'rgba(4,4,4,0.98)', backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(201,168,76,0.15)',
            padding: '28px 40px 36px',
            display: 'flex', flexDirection: 'column', gap: '22px',
          }}>
            {links.map(({ href, label }) => (
              <a key={href} href={href} className="nav-link"
                style={{
                  fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: active === href ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                }}
                onClick={(e) => handleNav(e, href)}
              >
                {label}
              </a>
            ))}
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer"
              className="btn-gold"
              style={{ alignSelf: 'flex-start', padding: '10px 28px', fontSize: '10px' }}
            >
              CV
            </a>
          </div>
        )}
      </nav>

      {/* Image zoom modal */}
      {imgOpen && (
        <div
          onClick={() => setImgOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.25s ease',
            cursor: 'pointer',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              animation: 'zoomIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
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
            {/* Close button */}
            <button
              onClick={() => setImgOpen(false)}
              style={{
                position: 'absolute', top: '-12px', right: '-12px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(201,168,76,0.9)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', color: '#000', fontWeight: 'bold',
                boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.9)'}
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
        }
        .nav-link:hover {
          color: var(--gold) !important;
          opacity: 1 !important;
        }
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