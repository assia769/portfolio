'use client';
import { personal, education, languages, softSkills } from '../lib/data';

export default function About() {
  return (
    <section id="about" style={{
      padding: '120px 40px',
      maxWidth: '1400px', margin: '0 auto',
      position: 'relative',
    }}>

      {/* SECTION HEADER */}
      <div className="reveal" style={{ marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 12vw, 160px)',
          fontWeight: 200,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.1)',
          lineHeight: 1,
          userSelect: 'none',
        }}>01</div>
        <div>
          <p className="section-label" style={{ marginBottom: '8px' }}>Qui suis-je</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 300,
            color: 'var(--white)',
            lineHeight: 1.1,
          }}>À Propos</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

        {/* LEFT — BIO */}
        <div>
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', marginBottom: '24px' }} />
            <p style={{ color: 'var(--white-dim)', lineHeight: 2.2, fontSize: '13px' }}>
              Je suis <span style={{ color: 'var(--white)', fontWeight: 400 }}>Assia Houbbadi</span>,
              étudiante en cycle Ingénieur Génie Informatique à l'<span style={{ color: 'var(--gold)' }}>ENSAKH de Khouribga</span>.
              Passionnée par le développement full stack, j'aime transformer des idées complexes
              en expériences digitales élégantes et fonctionnelles.
            </p>
          </div>

          <div className="reveal delay-1" style={{ marginBottom: '40px' }}>
            <p style={{ color: 'var(--white-dim)', lineHeight: 2.2, fontSize: '13px' }}>
              Leader dans l'âme, j'ai eu la chance de diriger des projets au sein de clubs,
              d'organiser des événements à grande échelle, et de représenter mon école au
              <span style={{ color: 'var(--gold)' }}> Hult Prize</span> — où j'ai décroché le
              <span style={{ color: 'var(--gold)' }}> 3ème prix</span> avec mon projet Marinova
              de réutilisation des sardines en 2026.
            </p>
          </div>

          {/* SOFT SKILLS */}
          <div className="reveal delay-2">
            <p className="section-label" style={{ marginBottom: '20px' }}>Soft Skills</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {softSkills.map((s) => (
                <span key={s} className="tech-tag">{s}</span>
              ))}
            </div>
          </div>

          {/* LANGUAGES */}
          <div className="reveal delay-3" style={{ marginTop: '48px' }}>
            <p className="section-label" style={{ marginBottom: '24px' }}>Langues</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {languages.map(({ name, level, pct }) => (
                <div key={name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--white)' }}>{name}</span>
                    <span style={{ fontSize: '10px', color: 'var(--white-dim)', letterSpacing: '0.1em' }}>{level}</span>
                  </div>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0,
                      height: '1px',
                      width: `${pct}%`,
                      background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — EDUCATION + INFO */}
        <div>
          {/* INFO CARD */}
          <div className="reveal reveal-right delay-1" style={{
            background: 'var(--black-3)',
            border: '1px solid rgba(201,168,76,0.1)',
            padding: '36px',
            marginBottom: '40px',
          }}>
            <p className="section-label" style={{ marginBottom: '24px' }}>Informations</p>
            {[
              { label: 'Naissance', value: personal.birthdate },
              { label: 'Nationalité', value: personal.nationality },
              { label: 'Localisation', value: personal.location },
              { label: 'Email', value: personal.email },
              { label: 'Téléphone', value: personal.phone },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(201,168,76,0.06)',
              }}>
                <span style={{ fontSize: '10px', color: 'var(--white-dimmer)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
                <span style={{ fontSize: '12px', color: 'var(--white-dim)', textAlign: 'right' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* FORMATION */}
          <div className="reveal reveal-right delay-2">
            <p className="section-label" style={{ marginBottom: '24px' }}>Formation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {education.map(({ school, degree, period, full }, i) => (
                <div key={i} style={{ display: 'flex', gap: '20px', paddingBottom: '28px', position: 'relative' }}>
                  {/* Timeline line */}
                  {i < education.length - 1 && (
                    <div style={{
                      position: 'absolute', left: '7px', top: '16px', bottom: 0,
                      width: '1px', background: 'rgba(201,168,76,0.15)',
                    }} />
                  )}
                  <div style={{
                    width: '15px', height: '15px', borderRadius: '50%',
                    border: '1px solid var(--gold)',
                    background: 'var(--black)',
                    flexShrink: 0, marginTop: '3px',
                    position: 'relative', zIndex: 1,
                  }} />
                  <div>
                    <p style={{ fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '4px' }}>{period}</p>
                    <p style={{ fontSize: '13px', color: 'var(--white)', marginBottom: '4px', fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 300 }}>{school}</p>
                    <p style={{ fontSize: '11px', color: 'var(--white-dim)' }}>{degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}