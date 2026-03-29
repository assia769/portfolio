'use client';
import { experiences, activities } from '../lib/data';

export default function Experience() {
  return (
    <section id="experience" style={{
      padding: '140px 6vw',
      background: 'linear-gradient(180deg, var(--black) 0%, var(--black-2) 50%, var(--black) 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG GLOW */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,108,247,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1500px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* HEADER */}
        <div className="reveal" style={{ marginBottom: '80px' }}>
          <p className="section-label" style={{ marginBottom: '14px' }}>// Mon Parcours</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(42px, 6vw, 80px)',
            fontWeight: 300, lineHeight: 1.05,
          }}>
            Expériences<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)', marginTop: '20px' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>

          {/* LEFT — STAGES */}
          <div>
            <p className="section-label reveal" style={{ marginBottom: '32px' }}>Expérience Pro</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className={`reveal delay-${i + 1} glass-card`}
                  style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}
                >
                  {/* Top gradient line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: 'linear-gradient(90deg, var(--gold), var(--gold-light), transparent)',
                    opacity: 0.5,
                  }} />
                  {/* Left accent */}
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
                    background: 'linear-gradient(to bottom, var(--gold), transparent)',
                  }} />

                  {/* Ghost text */}
                  <div style={{
                    position: 'absolute', top: '-10px', right: '-10px',
                    fontFamily: 'var(--font-display)', fontSize: '80px', fontWeight: 200,
                    color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.05)',
                    userSelect: 'none', lineHeight: 1,
                  }}>{i + 1}</div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '26px', fontWeight: 300,
                        color: 'var(--white)', marginBottom: '4px', lineHeight: 1.1,
                      }}>{exp.company}</p>
                      <p style={{ fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>{exp.role}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontFamily: 'var(--font-mono)', fontSize: '9px',
                        color: 'rgba(74,108,247,0.8)', letterSpacing: '0.1em',
                        background: 'rgba(74,108,247,0.1)', padding: '4px 10px',
                        border: '1px solid rgba(74,108,247,0.2)',
                        marginBottom: '6px',
                      }}>{exp.period}</p>
                      <p style={{ fontSize: '10px', color: 'var(--white-dimmer)' }}>📍 {exp.location}</p>
                    </div>
                  </div>

                  <p style={{ color: 'var(--white-dim)', fontSize: '12px', lineHeight: 1.9, marginBottom: '18px' }}>
                    {exp.description}
                  </p>

                  <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{
                        color: 'var(--white-dimmer)', fontSize: '11px',
                        padding: '5px 0 5px 18px', position: 'relative', lineHeight: 1.7,
                      }}>
                        <span style={{
                          position: 'absolute', left: 0,
                          color: 'var(--gold)', fontSize: '14px', top: '3px',
                        }}>›</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {exp.tags.map(tag => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — ACTIVITIES */}
          <div>
            <p className="section-label reveal" style={{ marginBottom: '32px' }}>Engagements & Clubs</p>

            <div style={{ position: 'relative', paddingLeft: '28px', marginBottom: '40px' }}>
              {/* Timeline line */}
              <div style={{
                position: 'absolute', left: '6px', top: 0, bottom: 0,
                width: '1px',
                background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.05))',
              }} />

              {activities.map((act, i) => (
                <div key={i} className={`reveal delay-${i + 1}`} style={{
                  marginBottom: '28px', position: 'relative',
                  display: 'flex', gap: '0',
                }}>
                  <div className="timeline-dot" style={{
                    position: 'absolute', left: '-28px', top: '6px',
                  }} />
                  <div style={{
                    background: 'rgba(201,168,76,0.03)',
                    border: '1px solid rgba(201,168,76,0.08)',
                    padding: '16px 20px', flex: 1,
                    transition: 'border-color .3s ease',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <p style={{ fontSize: '12px', color: 'var(--white)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                        {act.role}
                      </p>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '9px',
                        color: 'var(--gold)', background: 'rgba(201,168,76,0.08)',
                        padding: '2px 8px', letterSpacing: '0.1em',
                      }}>{act.year}</span>
                    </div>
                    <p style={{ fontSize: '10px', color: 'var(--white-dimmer)', letterSpacing: '0.04em' }}>
                      {act.org}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* HULT PRIZE HIGHLIGHT CARD */}
            <div className="reveal delay-5" style={{
              position: 'relative', overflow: 'hidden',
              padding: '32px',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02), transparent)',
              border: '1px solid rgba(201,168,76,0.3)',
              boxShadow: '0 0 40px rgba(201,168,76,0.06)',
            }}>
              {/* Glow behind trophy */}
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '100px', height: '100px',
                background: 'radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)',
                borderRadius: '50%',
              }} />
              <div style={{
                position: 'absolute', top: '0', right: '0',
                fontFamily: 'var(--font-display)', fontSize: '64px',
                color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.15)',
                userSelect: 'none', lineHeight: 1, padding: '16px',
              }}>🏆</div>

              <p className="section-label" style={{ marginBottom: '12px' }}>Hult Prize 2026</p>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px', fontWeight: 300,
                color: 'var(--gold)', marginBottom: '10px',
                textShadow: '0 0 20px rgba(201,168,76,0.3)',
              }}>
                2nd Runner Up 🥉
              </p>
              <p style={{ fontSize: '11px', color: 'var(--white-dim)', lineHeight: 2 }}>
                <strong style={{ color: 'var(--white)' }}>Marinova</strong> — Projet innovant de réutilisation
                des sardines pour créer des produits durables à haute valeur ajoutée.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #experience > div > div:last-child { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}