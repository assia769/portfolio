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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.5s ease',
      background: scrolled ? 'rgba(4,4,4,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : '1px solid transparent',
    }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '0 40px',
        height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#" onClick={(e) => handleNav(e, '#')} style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 300,
          color: 'var(--white)',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          cursor: 'none',
        }}>
          A<span style={{ color: 'var(--gold)' }}>.</span>H
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="desktop-nav">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link"
              onClick={(e) => handleNav(e, href)}
              style={{ color: active === href ? 'var(--gold)' : undefined }}
            >
              {label}
            </a>
          ))}
          <a href="/cv.pdf" target="_blank" className="btn-gold" style={{ padding: '10px 24px', fontSize: '9px' }}>
            <span>CV</span>
          </a>
        </div>

        {/* Mobile Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none',
            cursor: 'none', display: 'none',
            flexDirection: 'column', gap: '5px',
            padding: '4px',
          }}
          className="burger-btn"
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '1px',
              background: 'var(--gold)',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'translateY(6px) rotate(45deg)'
                : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(4,4,4,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--gold-border)',
          padding: '30px 40px',
          display: 'flex', flexDirection: 'column', gap: '24px',
        }}>
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link" style={{ fontSize: '14px' }}
              onClick={(e) => handleNav(e, href)}>
              {label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}