'use client';
import { useState } from 'react';
import { skills } from '../lib/data';

const allSkills = [
  { name: 'React.js / Next.js', pct: 90, cat: 'Frontend' },
  { name: 'Node.js / Express', pct: 85, cat: 'Backend' },
  { name: 'Spring Boot', pct: 80, cat: 'Backend' },
  { name: 'PostgreSQL / MySQL', pct: 85, cat: 'Database' },
  { name: 'Laravel / Django', pct: 78, cat: 'Backend' },
  { name: 'Docker / Git', pct: 75, cat: 'DevOps' },
  { name: 'JavaScript / TypeScript', pct: 88, cat: 'Language' },
  { name: 'Java / Python', pct: 80, cat: 'Language' },
  { name: 'Flask / Angular', pct: 70, cat: 'Frontend' },
  { name: 'API REST / UML', pct: 85, cat: 'Architecture' },
];

function SkillBar({ skill, index }) {
  return (
    <div className={`reveal delay-${Math.min(index + 1, 5)}`} style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: 'var(--white)', fontSize: '12px' }}>{skill.name}</span>
          <span style={{
            fontSize: '8px', padding: '2px 8px',
            border: '1px solid rgba(201,168,76,0.2)',
            color: 'var(--white-dimmer)', letterSpacing: '0.1em',
          }}>{skill.cat}</span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
          {skill.pct}%
        </span>
      </div>
      <div style={{
        height: '1px', background: 'rgba(255,255,255,0.05)',
        position: 'relative', overflow: 'visible',
      }}>
        <div style={{
          height: '1px',
          width: `${skill.pct}%`,
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', right: 0, top: '-3px',
            width: '7px', height: '7px',
            borderRadius: '50%',
            background: 'var(--gold)',
            boxShadow: '0 0 8px var(--gold)',
          }} />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTag, setActiveTag] = useState(null);

  const stackGroups = [
    {
      label: 'Langages',
      items: skills.languages,
      icon: '{ }',
    },
    {
      label: 'Frameworks',
      items: skills.frameworks,
      icon: '⬡',
    },
    {
      label: 'Bases de Données',
      items: skills.databases,
      icon: '◈',
    },
    {
      label: 'Outils',
      items: skills.tools,
      icon: '⚙',
    },
  ];

  return (
    <section id="skills" style={{
      padding: '120px 40px',
      maxWidth: '1400px', margin: '0 auto',
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
        }}>05</div>
        <div>
          <p className="section-label" style={{ marginBottom: '8px' }}>Mon Arsenal Tech</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 300, lineHeight: 1.1,
          }}>Compétences</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>

        {/* LEFT — SKILL BARS */}
        <div>
          <p className="section-label reveal" style={{ marginBottom: '40px' }}>Niveau de Maîtrise</p>
          {allSkills.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
        </div>

        {/* RIGHT — STACK GRID */}
        <div>
          <p className="section-label reveal" style={{ marginBottom: '40px' }}>Stack Technologique</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {stackGroups.map((group, gi) => (
              <div key={group.label} className={`reveal delay-${gi + 1}`}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  marginBottom: '16px',
                }}>
                  <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                    {group.icon}
                  </span>
                  <span className="section-label">{group.label}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.items.map(item => (
                    <span
                      key={item}
                      className="tech-tag"
                      data-hover
                      onClick={() => setActiveTag(activeTag === item ? null : item)}
                      style={{
                        cursor: 'none',
                        background: activeTag === item ? 'rgba(201,168,76,0.12)' : 'transparent',
                        borderColor: activeTag === item ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)',
                        transition: 'all 0.2s ease',
                        padding: '6px 14px',
                        fontSize: '10px',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* DECORATION */}
          <div className="reveal delay-5" style={{
            marginTop: '48px',
            padding: '28px',
            border: '1px solid rgba(201,168,76,0.1)',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.04), transparent)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-30px', right: '-20px',
              fontFamily: 'var(--font-display)',
              fontSize: '100px', fontWeight: 200,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(201,168,76,0.06)',
              userSelect: 'none',
            }}>∞</div>
            <p className="section-label" style={{ marginBottom: '12px' }}>En apprentissage continu</p>
            <p style={{ fontSize: '12px', color: 'var(--white-dim)', lineHeight: 2 }}>
              Cybersécurité · Cloud · DevOps avancé · Intelligence Artificielle
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #skills > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}