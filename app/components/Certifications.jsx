'use client';
import { useState } from 'react';
import Image from 'next/image';
import { certifications } from '../lib/data';

const CATEGORIES = ['Tous', 'Prix', 'Leadership', 'Stage', 'Excellence', 'Compétition', 'Conférence', 'Reconnaissance', 'Technique', 'Créatif'];

export default function Certifications() {
  const [filter, setFilter] = useState('Tous');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'Tous' ? certifications : certifications.filter(c => c.category === filter);

  return (
    <section id="certifications" style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, var(--black) 0%, var(--black-2) 50%, var(--black) 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* HEADER */}
        <div className="reveal" style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 12vw, 160px)',
            fontWeight: 200,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.1)',
            lineHeight: 1,
            userSelect: 'none',
          }}>04</div>
          <div>
            <p className="section-label" style={{ marginBottom: '8px' }}>Mes Reconnaissances</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 300, lineHeight: 1.1,
            }}>Certifications</h2>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="reveal" style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap',
          marginBottom: '52px',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-hover
              style={{
                padding: '8px 18px',
                border: `1px solid ${filter === cat ? 'var(--gold)' : 'rgba(201,168,76,0.15)'}`,
                background: filter === cat ? 'rgba(201,168,76,0.1)' : 'transparent',
                color: filter === cat ? 'var(--gold)' : 'var(--white-dimmer)',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {filtered.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} onClick={() => setSelected(cert)} />
          ))}
        </div>

        {/* COUNT */}
        <div className="reveal" style={{ marginTop: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: 'var(--white-dimmer)', letterSpacing: '0.2em' }}>
            {filtered.length} CERTIFICATION{filtered.length > 1 ? 'S' : ''} AFFICHÉE{filtered.length > 1 ? 'S' : ''}
          </p>
        </div>
      </div>

      {/* MODAL LIGHTBOX */}
      {selected && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(4,4,4,0.96)',
            backdropFilter: 'blur(12px)',
            zIndex: 9990,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelected(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '700px', width: '100%',
              background: 'var(--black-3)',
              border: '1px solid rgba(201,168,76,0.2)',
              padding: '40px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'none', border: '1px solid rgba(201,168,76,0.3)',
                color: 'var(--gold)', width: '32px', height: '32px',
                cursor: 'none', fontSize: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{
                padding: '4px 12px',
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'var(--gold)', fontSize: '9px', letterSpacing: '0.2em',
              }}>{selected.category}</span>
              <span style={{
                padding: '4px 12px',
                border: '1px solid rgba(245,240,232,0.1)',
                color: 'var(--white-dimmer)', fontSize: '9px', letterSpacing: '0.2em',
              }}>{selected.year}</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px', fontWeight: 300,
              color: 'var(--white)', marginBottom: '8px',
            }}>{selected.title}</h3>
            <p style={{ color: 'var(--gold)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '28px' }}>
              {selected.org}
            </p>

            {/* Image */}
            <div style={{
              position: 'relative', width: '100%', aspectRatio: '4/3',
              border: '1px solid rgba(201,168,76,0.15)',
              overflow: 'hidden',
              background: 'var(--black-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {selected.image ? (
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill style={{ objectFit: 'contain', padding: '16px' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📜</div>
                  <p style={{ color: 'var(--white-dimmer)', fontSize: '11px' }}>Image à venir</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CertCard({ cert, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`reveal delay-${Math.min(index % 6 + 1, 5)}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        border: `1px solid ${cert.highlight
          ? hovered ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.3)'
          : hovered ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.08)'}`,
        background: cert.highlight
          ? 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(4,4,4,0.5))'
          : 'var(--black-3)',
        cursor: 'none',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-4px) scale(1.01)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Image thumbnail */}
      <div style={{
        position: 'relative', width: '100%', height: '140px',
        overflow: 'hidden',
        background: 'var(--black-2)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}>
        {cert.image ? (
          <Image
            src={cert.image}
            alt={cert.title}
            fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
            onError={(e) => {
              e.target.parentElement.style.display = 'flex';
              e.target.parentElement.style.alignItems = 'center';
              e.target.parentElement.style.justifyContent = 'center';
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '32px', opacity: 0.3 }}>📜</span>
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(4,4,4,0.7), transparent 60%)',
        }} />
        {cert.highlight && (
          <div style={{
            position: 'absolute', top: '10px', left: '10px',
            padding: '3px 10px',
            background: 'rgba(201,168,76,0.2)',
            border: '1px solid rgba(201,168,76,0.5)',
            fontSize: '8px', color: 'var(--gold)', letterSpacing: '0.2em',
          }}>⭐ TOP</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{
            fontSize: '8px', color: 'var(--gold)', letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>{cert.category}</span>
          <span style={{ fontSize: '9px', color: 'var(--white-dimmer)' }}>{cert.year}</span>
        </div>
        <h4 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px', fontWeight: 300,
          color: 'var(--white)', marginBottom: '6px', lineHeight: 1.3,
        }}>{cert.title}</h4>
        <p style={{ fontSize: '10px', color: 'var(--white-dimmer)', lineHeight: 1.7 }}>{cert.org}</p>
      </div>

      {/* Hover overlay text */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '8px 20px',
        background: 'rgba(201,168,76,0.06)',
        fontSize: '8px', color: 'var(--gold)', letterSpacing: '0.2em',
        textAlign: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        CLIQUER POUR VOIR
      </div>
    </div>
  );
}