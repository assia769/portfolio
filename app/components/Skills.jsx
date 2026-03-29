'use client';
import { useEffect, useRef, useState } from 'react';
import { skills } from '../lib/data';

const allSkills = [
  { name: 'React.js / Next.js',      pct: 90, cat: 'Frontend',     color: '#61dafb' },
  { name: 'Node.js / Express',       pct: 85, cat: 'Backend',      color: '#86efac' },
  { name: 'Spring Boot',             pct: 80, cat: 'Backend',      color: '#6ee7b7' },
  { name: 'PostgreSQL / MySQL',      pct: 85, cat: 'Database',     color: '#a5b4fc' },
  { name: 'Laravel / Django',        pct: 78, cat: 'Backend',      color: '#fca5a5' },
  { name: 'JavaScript / TypeScript', pct: 88, cat: 'Language',     color: '#fde68a' },
  { name: 'Docker / Git',            pct: 75, cat: 'DevOps',       color: '#7dd3fc' },
  { name: 'Java / Python',           pct: 80, cat: 'Language',     color: '#c4b5fd' },
];

function AnimatedBar({ skill, visible, index }) {
  return (
    <div className={`reveal delay-${Math.min(index + 1, 6)}`} style={{ marginBottom: '22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: skill.color,
            boxShadow: `0 0 8px ${skill.color}88`,
          }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white)' }}>
            {skill.name}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '8px',
            padding: '2px 8px',
            border: `1px solid ${skill.color}33`,
            color: skill.color, opacity: 0.7,
            letterSpacing: '0.1em',
          }}>{skill.cat}</span>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: 'var(--gold)',
        }}>{skill.pct}%</span>
      </div>

      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: visible ? `${skill.pct}%` : '0%',
            transition: `width 1.2s cubic-bezier(.16,1,.3,1) ${index * 80}ms`,
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stackGroups = [
    { label: 'Langages', items: skills.languages, icon: '{ }', color: '#fde68a' },
    { label: 'Frameworks', items: skills.frameworks, icon: '⬡', color: '#a5b4fc' },
    { label: 'Bases de Données', items: skills.databases, icon: '◈', color: '#86efac' },
    { label: 'Outils & Méthodes', items: skills.tools, icon: '⚙', color: '#7dd3fc' },
  ];

  return (
    <section id="skills" ref={sectionRef} style={{
      padding: '140px 6vw',
      maxWidth: '1500px', margin: '0 auto',
      position: 'relative',
    }}>
      {/* BG GLOW */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* HEADER */}
      <div className="reveal" style={{ marginBottom: '80px' }}>
        <p className="section-label" style={{ marginBottom: '14px' }}>// Mon Arsenal</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(42px, 6vw, 80px)',
          fontWeight: 300, lineHeight: 1.05,
        }}>
          Compétences<span style={{ color: 'var(--gold)' }}>.</span>
        </h2>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)', marginTop: '20px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>

        {/* LEFT — ANIMATED BARS */}
        <div>
          <p className="section-label reveal" style={{ marginBottom: '36px' }}>Niveau de Maîtrise</p>
          {allSkills.map((s, i) => (
            <AnimatedBar key={s.name} skill={s} visible={visible} index={i} />
          ))}
        </div>

        {/* RIGHT — STACK */}
        <div>
          <p className="section-label reveal" style={{ marginBottom: '36px' }}>Stack Technologique</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {stackGroups.map((group, gi) => (
              <div key={group.label} className={`reveal delay-${gi + 1}`}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  marginBottom: '14px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '16px',
                    color: group.color,
                    textShadow: `0 0 10px ${group.color}66`,
                  }}>{group.icon}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: group.color, opacity: 0.8,
                  }}>{group.label}</span>
                  <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${group.color}33, transparent)` }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.items.map(item => (
                    <span
                      key={item}
                      className="tech-tag"
                      data-hover
                      style={{
                        borderColor: `${group.color}33`,
                        color: group.color,
                        cursor: 'none',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `${group.color}15`;
                        e.currentTarget.style.borderColor = `${group.color}66`;
                        e.currentTarget.style.boxShadow = `0 0 12px ${group.color}22`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                        e.currentTarget.style.borderColor = `${group.color}33`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* LEARNING CARD */}
          <div className="reveal delay-5" style={{
            marginTop: '40px', padding: '24px 28px',
            background: 'linear-gradient(135deg, rgba(74,108,247,0.06), rgba(124,58,237,0.04))',
            border: '1px solid rgba(74,108,247,0.15)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-15px', right: '-15px',
              fontFamily: 'var(--font-display)', fontSize: '70px', fontWeight: 200,
              color: 'transparent', WebkitTextStroke: '1px rgba(74,108,247,0.1)',
              userSelect: 'none',
            }}>∞</div>
            <p className="section-label" style={{ color: '#7dd3fc', marginBottom: '10px' }}>En apprentissage</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Cybersécurité', 'Cloud AWS', 'DevOps', 'IA / ML'].map(s => (
                <span key={s} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  padding: '4px 12px',
                  border: '1px solid rgba(74,108,247,0.2)',
                  color: '#7dd3fc', background: 'rgba(74,108,247,0.06)',
                  letterSpacing: '0.12em',
                }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #skills > div:last-child { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}