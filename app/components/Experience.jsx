'use client';
import { experiences, activities } from '../lib/data';

export default function Experience() {
  return (
    <section id="experience" style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, var(--black) 0%, var(--black-2) 50%, var(--black) 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

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
          }}>02</div>
          <div>
            <p className="section-label" style={{ marginBottom: '8px' }}>Mon Parcours</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.1,
            }}>Expériences</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>

          {/* PROFESSIONAL */}
          <div>
            <p className="section-label reveal" style={{ marginBottom: '40px' }}>Expérience Professionnelle</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {experiences.map((exp, i) => (
                <div key={i} className={`reveal delay-${i + 1}`} style={{
                  padding: '36px',
                  border: '1px solid rgba(201,168,76,0.08)',
                  marginBottom: '16px',
                  position: 'relative',
                  background: 'var(--black-3)',
                  transition: 'border-color 0.4s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)'}
                >
                  {/* Gold accent left bar */}
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--gold), transparent)',
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 300, color: 'var(--white)', marginBottom: '4px' }}>
                        {exp.company}
                      </p>
                      <p style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em' }}>{exp.role}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '10px', color: 'var(--white-dimmer)', letterSpacing: '0.1em' }}>{exp.period}</p>
                      <p style={{ fontSize: '10px', color: 'var(--white-dimmer)', marginTop: '4px' }}>{exp.location}</p>
                    </div>
                  </div>

                  <p style={{ color: 'var(--white-dim)', fontSize: '12px', lineHeight: 1.9, marginBottom: '20px' }}>
                    {exp.description}
                  </p>

                  <ul style={{ paddingLeft: '0', listStyle: 'none', marginBottom: '20px' }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{
                        color: 'var(--white-dimmer)', fontSize: '11px', padding: '4px 0',
                        paddingLeft: '16px', position: 'relative',
                      }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>—</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.tags.map(tag => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVITIES */}
          <div>
            <p className="section-label reveal" style={{ marginBottom: '40px' }}>Activités & Engagements</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {activities.map((act, i) => (
                <div key={i} className={`reveal delay-${i + 1}`} style={{
                  display: 'flex', gap: '24px',
                  paddingBottom: '32px',
                  position: 'relative',
                }}>
                  {/* Timeline */}
                  {i < activities.length - 1 && (
                    <div style={{
                      position: 'absolute', left: '23px', top: '28px', bottom: 0,
                      width: '1px', background: 'rgba(201,168,76,0.12)',
                    }} />
                  )}

                  {/* Year bubble */}
                  <div style={{
                    minWidth: '48px', height: '48px',
                    border: '1px solid rgba(201,168,76,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    position: 'relative', zIndex: 1,
                    background: 'var(--black)',
                  }}>
                    <span style={{ fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.05em', textAlign: 'center' }}>
                      {act.year === 'En cours' ? '●' : act.year.slice(2)}
                    </span>
                  </div>

                  <div style={{ paddingTop: '10px' }}>
                    <p style={{ color: 'var(--white)', fontSize: '13px', marginBottom: '4px' }}>{act.role}</p>
                    <p style={{ color: 'var(--white-dimmer)', fontSize: '11px', letterSpacing: '0.05em' }}>{act.org}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* HULT PRIZE HIGHLIGHT */}
            <div className="reveal delay-5" style={{
              marginTop: '24px',
              padding: '28px',
              border: '1px solid rgba(201,168,76,0.3)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.06), transparent)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                fontFamily: 'var(--font-display)',
                fontSize: '80px', fontWeight: 200,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(201,168,76,0.1)',
                userSelect: 'none',
              }}>🏆</div>
              <p className="section-label" style={{ marginBottom: '12px' }}>Prix Hult Prize 2026</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300, color: 'var(--gold)', marginBottom: '8px' }}>
                2nd Runner Up 🥉
              </p>
              <p style={{ fontSize: '11px', color: 'var(--white-dim)', lineHeight: 1.9 }}>
                Projet Marinova — Réutilisation innovante des sardines.
                Solution durable pour valoriser les déchets de pêche.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #experience > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}