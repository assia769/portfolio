'use client';
import { useState } from 'react';
import Image from 'next/image';
import { projects } from '../lib/data';

function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  if (!project) return null;
  return (
    <div className={`modal-overlay open`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'var(--black-3)',
        border: '1px solid rgba(201,168,76,0.2)',
        padding: '48px',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'none', border: '1px solid rgba(201,168,76,0.3)',
          color: 'var(--gold)', width: '36px', height: '36px',
          cursor: 'none', fontSize: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        {project.prize && (
          <div style={{
            display: 'inline-block', padding: '6px 16px',
            border: '1px solid var(--gold)', color: 'var(--gold)',
            fontSize: '10px', letterSpacing: '0.2em',
            marginBottom: '20px',
          }}>{project.prize}</div>
        )}

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 300, marginBottom: '8px' }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--gold)', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '24px' }}>
          {project.subtitle}
        </p>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              position: 'relative', width: '100%', aspectRatio: '16/9',
              border: '1px solid rgba(201,168,76,0.15)',
              overflow: 'hidden', marginBottom: '12px',
              background: 'var(--black)',
            }}>
              <Image
                src={project.images[imgIdx]}
                alt={project.title}
                fill style={{ objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            {project.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.images.map((img, i) => (
                  <div key={i} onClick={() => setImgIdx(i)} style={{
                    width: '64px', height: '48px', position: 'relative',
                    border: `1px solid ${i === imgIdx ? 'var(--gold)' : 'rgba(201,168,76,0.15)'}`,
                    overflow: 'hidden', cursor: 'none',
                    background: 'var(--black)',
                  }}>
                    <Image src={img} alt="" fill style={{ objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <p style={{ color: 'var(--white-dim)', fontSize: '13px', lineHeight: 2, marginBottom: '28px' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function TerminalCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        background: 'var(--black-3)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.08)'}`,
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Terminal top bar */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'rgba(201,168,76,0.03)',
      }}>
        {['#c0392b', '#c9a84c', '#27ae60'].map(c => (
          <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, opacity: 0.7 }} />
        ))}
        <span style={{ fontSize: '9px', color: 'var(--white-dimmer)', marginLeft: '8px', letterSpacing: '0.1em' }}>
          {project.year} · {project.title.toLowerCase().replace(/ /g, '-')}.js
        </span>
      </div>

      {/* Code content */}
      <div style={{ padding: '28px', fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 2 }}>
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: 'rgba(201,168,76,0.5)' }}>const </span>
          <span style={{ color: 'var(--white)' }}>project</span>
          <span style={{ color: 'rgba(245,240,232,0.3)' }}> = {'{'}</span>
        </div>
        <div style={{ paddingLeft: '20px' }}>
          <div>
            <span style={{ color: 'rgba(201,168,76,0.5)' }}>name</span>
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>: </span>
            <span style={{ color: 'var(--gold)' }}>'{project.title}'</span>
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>,</span>
          </div>
          <div style={{ margin: '4px 0' }}>
            <span style={{ color: 'rgba(201,168,76,0.5)' }}>stack</span>
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>: [</span>
            {project.tags.map((t, i) => (
              <span key={t}>
                <span style={{ color: '#8db8c4' }}>'{t}'</span>
                {i < project.tags.length - 1 && <span style={{ color: 'rgba(245,240,232,0.3)' }}>, </span>}
              </span>
            ))}
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>],</span>
          </div>
          {project.prize && (
            <div>
              <span style={{ color: 'rgba(201,168,76,0.5)' }}>award</span>
              <span style={{ color: 'rgba(245,240,232,0.3)' }}>: </span>
              <span style={{ color: '#c0392b' }}>'{project.prize}'</span>
              <span style={{ color: 'rgba(245,240,232,0.3)' }}>,</span>
            </div>
          )}
          <div style={{ marginTop: '8px' }}>
            <span style={{ color: 'rgba(201,168,76,0.5)' }}>description</span>
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>: </span>
            <span style={{ color: 'rgba(245,240,232,0.5)', fontStyle: 'italic', fontSize: '10px' }}>
              '{project.description.slice(0, 60)}...'
            </span>
          </div>
        </div>
        <div style={{ color: 'rgba(245,240,232,0.3)' }}>{'}'}</div>
      </div>

      {/* Hover CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 28px',
        background: 'linear-gradient(to top, rgba(201,168,76,0.08), transparent)',
        fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.2em',
        textTransform: 'uppercase',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        textAlign: 'right',
      }}>
        Voir détails →
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          padding: '3px 10px',
          background: 'rgba(201,168,76,0.15)',
          border: '1px solid rgba(201,168,76,0.3)',
          fontSize: '8px', color: 'var(--gold)', letterSpacing: '0.2em',
        }}>FEATURED</div>
      )}
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);

  return (
    <section id="projects" style={{
      padding: '120px 40px',
      maxWidth: '1400px', margin: '0 auto',
      position: 'relative',
    }}>
      {/* HEADER */}
      <div className="reveal" style={{ marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 12vw, 160px)',
          fontWeight: 200,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.1)',
          lineHeight: 1,
          userSelect: 'none',
        }}>03</div>
        <div>
          <p className="section-label" style={{ marginBottom: '8px' }}>Ce que je crée</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 300, lineHeight: 1.1,
          }}>Projets</h2>
        </div>
      </div>

      {/* FEATURED */}
      <div className="reveal" style={{ marginBottom: '16px' }}>
        <p className="section-label" style={{ marginBottom: '28px' }}>Projets Phares</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '60px' }}>
        {featured.map((p, i) => (
          <div key={p.title} className={`reveal delay-${i + 1}`}>
            <TerminalCard project={p} onClick={() => setSelected(p)} />
          </div>
        ))}
      </div>

      {/* OTHERS */}
      <div className="reveal" style={{ marginBottom: '28px' }}>
        <p className="section-label">Projets Académiques</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {others.map((p, i) => (
          <div key={p.title} className={`reveal delay-${i + 1}`}>
            <TerminalCard project={p} onClick={() => setSelected(p)} />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @media (max-width: 900px) {
          #projects > div:nth-child(4) { grid-template-columns: 1fr !important; }
          #projects > div:nth-child(6) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}