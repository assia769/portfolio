'use client';
import Image from 'next/image';
import { personal, education, languages, softSkills } from '../lib/data';

export default function About() {
  return (
    <section id="about" style={{
      padding: '140px 6vw',
      maxWidth: '1500px', margin: '0 auto',
      position: 'relative',
    }}>
      {/* BIG GHOST NUMBER */}
      <div style={{
        position: 'absolute', top: '60px', right: '-2%',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(120px, 20vw, 280px)',
        fontWeight: 200,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(201,168,76,0.05)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>01</div>

      {/* HEADER */}
      <div className="reveal" style={{ marginBottom: '80px' }}>
        <p className="section-label" style={{ marginBottom: '14px' }}>// Qui suis-je</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(42px, 6vw, 80px)',
          fontWeight: 300, lineHeight: 1.05,
          color: 'var(--white)',
        }}>
          À Propos<span style={{ color: 'var(--gold)' }}>.</span>
        </h2>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)', marginTop: '20px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '60px', alignItems: 'start' }}>

        {/* LEFT — PROFILE CARD 3D */}
        <div className="reveal reveal-left">
          {/* Profile image card */}
          <div style={{
            position: 'relative',
            marginBottom: '24px',
          }}>
            {/* Decorative frame */}
            <div style={{
              position: 'absolute', top: '-12px', left: '-12px', right: '12px', bottom: '12px',
              border: '1px solid rgba(201,168,76,0.15)',
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute', top: '12px', left: '12px', right: '-12px', bottom: '-12px',
              border: '1px solid rgba(74,108,247,0.1)',
              zIndex: 0,
            }} />

            {/* Photo container */}
            <div style={{
              position: 'relative', zIndex: 1,
              aspectRatio: '3/4',
              overflow: 'hidden',
              border: '1px solid rgba(201,168,76,0.2)',
              background: 'var(--black-3)',
            }}>
              <Image
                src={personal.image}
                alt="Assia Houbbadi"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(3,3,10,0.7) 0%, transparent 50%)',
              }} />
              {/* Bottom info */}
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 300, color: 'var(--white)' }}>
                  {personal.name}
                </p>
                <p style={{ fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.25em', marginTop: '2px' }}>
                  INGÉNIEURE INFORMATIQUE
                </p>
              </div>

              {/* NO PHOTO fallback */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '12px',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(74,108,247,0.04))',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '80px', fontWeight: 200,
                  color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.2)',
                }}>AH</div>
              </div>
            </div>

            {/* Gold corner accent */}
            <div style={{
              position: 'absolute', bottom: '0', right: '0',
              width: '40px', height: '40px',
              borderRight: '2px solid var(--gold)',
              borderBottom: '2px solid var(--gold)',
              zIndex: 2,
              boxShadow: '4px 4px 12px rgba(201,168,76,0.2)',
            }} />
          </div>

          {/* LINKS */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {[
              { href: personal.github,   label: 'GitHub',   icon: '⌥' },
              { href: personal.linkedin, label: 'LinkedIn', icon: '◈' },
              { href: personal.cv,       label: 'CV PDF',   icon: '↗' },
            ].map(({ href, label, icon }) => (
              <a
                key={label} href={href} target="_blank" rel="noopener noreferrer"
                data-hover
                style={{
                  flex: 1, padding: '10px 8px',
                  border: '1px solid rgba(201,168,76,0.15)',
                  background: 'rgba(201,168,76,0.03)',
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  color: 'var(--white-dim)', textDecoration: 'none',
                  letterSpacing: '0.15em', cursor: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'all .3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; e.currentTarget.style.color = 'var(--white-dim)'; }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* BIO */}
          <div className="reveal delay-1" style={{ marginBottom: '48px' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              color: 'var(--white-dim)', lineHeight: 2.1,
              marginBottom: '20px',
            }}>
              Je suis <span style={{ color: 'var(--white)', fontWeight: 500 }}>Assia Houbbadi</span>,
              étudiante en Cycle Ingénieur Génie Informatique à l'
              <span style={{ color: 'var(--gold)' }}>ENSAKH de Khouribga</span>.
              Passionnée par le développement full stack, je transforme des idées complexes
              en expériences digitales élégantes et performantes.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              color: 'var(--white-dim)', lineHeight: 2.1,
            }}>
              Leader dans l'âme, j'ai eu la chance de diriger des événements,
              des clubs, et de représenter mon école au <span style={{ color: 'var(--gold)' }}>Hult Prize</span> —
              où j'ai décroché la <span style={{ color: 'var(--gold)' }}>2ème place</span> avec
              Marinova, mon projet de réutilisation des sardines en 2026.
            </p>
          </div>

          {/* INFO GRID */}
          <div className="reveal delay-2" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.08)',
            marginBottom: '48px',
          }}>
            {[
              { label: 'Naissance',    value: personal.birthdate },
              { label: 'Nationalité',  value: personal.nationality },
              { label: 'Localisation', value: personal.location },
              { label: 'Email',        value: personal.email },
            ].map(({ label, value }) => (
              <div key={label} style={{
                padding: '18px 22px',
                background: 'var(--black-3)',
              }}>
                <p style={{ fontSize: '9px', color: 'var(--white-dimmer)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</p>
                <p style={{ fontSize: '12px', color: 'var(--white)', fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* FORMATION */}
          <div className="reveal delay-3" style={{ marginBottom: '40px' }}>
            <p className="section-label" style={{ marginBottom: '28px' }}>Formation</p>
            <div style={{ position: 'relative', paddingLeft: '28px' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute', left: '6px', top: 0, bottom: 0,
                width: '1px',
                background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.1))',
              }} />
              {education.map(({ school, degree, period }, i) => (
                <div key={i} style={{
                  marginBottom: '28px', position: 'relative',
                }}>
                  <div className="timeline-dot" style={{
                    position: 'absolute', left: '-28px', top: '4px',
                  }} />
                  <p style={{ fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '4px' }}>{period}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 300, color: 'var(--white)', marginBottom: '3px' }}>{school}</p>
                  <p style={{ fontSize: '11px', color: 'var(--white-dimmer)', letterSpacing: '0.04em' }}>{degree}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LANGUAGES */}
          <div className="reveal delay-4" style={{ marginBottom: '36px' }}>
            <p className="section-label" style={{ marginBottom: '24px' }}>Langues</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {languages.map(({ name, level, pct }) => (
                <div key={name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white)' }}>{name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--white-dimmer)', letterSpacing: '0.1em' }}>{level}</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOFT SKILLS */}
          <div className="reveal delay-5">
            <p className="section-label" style={{ marginBottom: '20px' }}>Soft Skills</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {softSkills.map(s => (
                <span key={s} className="tech-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}