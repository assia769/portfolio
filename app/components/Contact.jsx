'use client';
import { useState } from 'react';
import { personal } from '../lib/data';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personal.email}?subject=Message de ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0ADe%3A ${encodeURIComponent(formState.email)}`;
    window.open(mailtoLink);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" style={{
      padding: '120px 40px 80px',
      background: 'linear-gradient(180deg, var(--black) 0%, var(--black-2) 100%)',
      position: 'relative',
    }}>
      {/* BIG GHOST TEXT */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(80px, 15vw, 200px)',
        fontWeight: 200,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(201,168,76,0.04)',
        whiteSpace: 'nowrap',
        userSelect: 'none', pointerEvents: 'none',
      }}>CONTACT</div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

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
          }}>06</div>
          <div>
            <p className="section-label" style={{ marginBottom: '8px' }}>Travaillons Ensemble</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 300, lineHeight: 1.1,
            }}>Contact</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>

          {/* LEFT */}
          <div>
            <div className="reveal" style={{ marginBottom: '48px' }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: 'var(--white)',
                marginBottom: '20px',
              }}>
                Vous avez un projet ?<br />
                <span style={{ color: 'var(--gold)' }}>Parlons-en.</span>
              </p>
              <p style={{ color: 'var(--white-dim)', fontSize: '13px', lineHeight: 2 }}>
                Je suis toujours ouverte à de nouvelles opportunités, collaborations,
                ou simplement une bonne conversation autour de la tech.
              </p>
            </div>

            {/* EMAIL */}
            <div className="reveal delay-1" style={{ marginBottom: '32px' }}>
              <p className="section-label" style={{ marginBottom: '12px' }}>Email</p>
              <div
                onClick={copyEmail}
                data-hover
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px',
                  border: '1px solid rgba(201,168,76,0.15)',
                  cursor: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'}
              >
                <span style={{ color: 'var(--white)', fontSize: '12px' }}>{personal.email}</span>
                <span style={{ fontSize: '9px', color: copied ? '#27ae60' : 'var(--gold)', letterSpacing: '0.15em' }}>
                  {copied ? '✓ COPIÉ' : 'COPIER'}
                </span>
              </div>
            </div>

            {/* PHONE */}
            <div className="reveal delay-2" style={{ marginBottom: '32px' }}>
              <p className="section-label" style={{ marginBottom: '12px' }}>Téléphone</p>
              <div style={{
                padding: '16px 20px',
                border: '1px solid rgba(201,168,76,0.15)',
              }}>
                <span style={{ color: 'var(--white)', fontSize: '12px' }}>{personal.phone}</span>
              </div>
            </div>

            {/* LOCATION */}
            <div className="reveal delay-3">
              <p className="section-label" style={{ marginBottom: '12px' }}>Localisation</p>
              <div style={{
                padding: '16px 20px',
                border: '1px solid rgba(201,168,76,0.15)',
              }}>
                <span style={{ color: 'var(--white)', fontSize: '12px' }}>📍 {personal.location}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="reveal reveal-right">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { key: 'name', label: 'Votre Nom', type: 'text', placeholder: 'Assia Houbbadi' },
                { key: 'email', label: 'Votre Email', type: 'email', placeholder: 'hello@example.com' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <p className="section-label" style={{ marginBottom: '10px' }}>{label}</p>
                  <input
                    type={type}
                    value={formState[key]}
                    onChange={e => setFormState(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    required
                    style={{
                      width: '100%', padding: '14px 18px',
                      background: 'var(--black-3)',
                      border: '1px solid rgba(201,168,76,0.15)',
                      color: 'var(--white)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                  />
                </div>
              ))}

              <div>
                <p className="section-label" style={{ marginBottom: '10px' }}>Message</p>
                <textarea
                  value={formState.message}
                  onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Bonjour Assia, j'ai un projet..."
                  required
                  rows={6}
                  style={{
                    width: '100%', padding: '14px 18px',
                    background: 'var(--black-3)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    color: 'var(--white)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    outline: 'none', resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                />
              </div>

              <button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start' }}>
                <span>{sent ? '✓ Message Envoyé !' : 'Envoyer le Message'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{
          marginTop: '100px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '20px',
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300, color: 'var(--white)' }}>
              Assia<span style={{ color: 'var(--gold)' }}>.</span>H
            </p>
            <p style={{ fontSize: '10px', color: 'var(--white-dimmer)', marginTop: '4px', letterSpacing: '0.1em' }}>
              Ingénieure Informatique · ENSAKH · Khouribga
            </p>
          </div>
          <p style={{ fontSize: '10px', color: 'var(--white-dimmer)', letterSpacing: '0.1em' }}>
            © 2026 — ASSIA HOUBBADI — TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}