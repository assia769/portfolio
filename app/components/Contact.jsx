'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { personal } from '../lib/data';

// 🔧 Clés EmailJS
const EMAILJS_SERVICE_ID  = 'service_sad8f0t';
const EMAILJS_TEMPLATE_ID = 'template_tcsoqdv';
const EMAILJS_PUBLIC_KEY  = 'Li-ISb4IRbxkplC3F';

export default function Contact() {
  const [form,         setForm]         = useState({ name: '', email: '', message: '' });
  const [copied,       setCopied]       = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [status,       setStatus]       = useState('idle'); // idle | sending | sent | error

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    form.name,    // correspond à {{name}} dans le template
          email:   form.email,   // correspond à {{email}} dans Reply To
          message: form.message, // correspond à {{message}} dans le template
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const buttonLabel = {
    idle:    'Envoyer le Message',
    sending: 'Envoi en cours...',
    sent:    '✓ Message Envoyé !',
    error:   '✗ Erreur, réessayer',
  }[status];

  /* ── Style dynamique des champs ── */
  const inputStyle = (field) => ({
    width: '100%', padding: '14px 18px',
    background: 'rgba(13,13,26,0.8)',
    border: `1px solid ${focusedField === field ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.12)'}`,
    color: 'var(--white)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    outline: 'none',
    transition: 'border-color .3s ease, box-shadow .3s ease',
    boxShadow: focusedField === field
      ? '0 0 20px rgba(201,168,76,0.08), inset 0 0 20px rgba(201,168,76,0.03)'
      : 'none',
    backdropFilter: 'blur(8px)',
  });

  /* ════════════════════════════════════════════ */
  return (
    <section id="contact" style={{
      padding: '140px 6vw 100px',
      background: 'linear-gradient(180deg, var(--black) 0%, var(--black-2) 100%)',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* BIG GHOST TEXT */}
      <div style={{
        position: 'absolute', bottom: '-8%', left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(80px, 18vw, 250px)',
        fontWeight: 200,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(201,168,76,0.04)',
        whiteSpace: 'nowrap',
        userSelect: 'none', pointerEvents: 'none',
      }}>CONTACT</div>

      {/* ORBS */}
      <div style={{
        position: 'absolute', top: '20%', right: '-5%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'float 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '-5%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,108,247,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'float 8s ease-in-out 2s infinite',
      }} />

      <div style={{ maxWidth: '1500px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* HEADER avec numéro de section (fichier 2) + style titre (fichier 1) */}
        <div className="reveal" style={{ marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 12vw, 160px)',
            fontWeight: 200,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.08)',
            lineHeight: 1,
            userSelect: 'none',
          }}>06</div>
          <div>
            <p className="section-label" style={{ marginBottom: '14px' }}>// Travaillons Ensemble</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px, 6vw, 80px)',
              fontWeight: 300, lineHeight: 1.05,
            }}>
              Contact<span style={{ color: 'var(--gold)' }}>.</span>
            </h2>
            <div style={{
              width: '60px', height: '1px',
              background: 'linear-gradient(90deg, var(--gold), transparent)',
              marginTop: '20px',
            }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>

          {/* ── GAUCHE ── */}
          <div>
            <div className="reveal" style={{ marginBottom: '52px' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: 300, lineHeight: 1.2,
                marginBottom: '20px',
              }}>
                Vous avez un projet ?<br />
                <span style={{
                  color: 'var(--gold)',
                  textShadow: '0 0 30px rgba(201,168,76,0.2)',
                }}>Parlons-en.</span>
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.9,
              }}>
                Je suis toujours ouverte à de nouvelles opportunités, collaborations,
                ou simplement une bonne conversation autour de la tech et de l'innovation.
              </p>
            </div>

            {/* CONTACT INFOS — cartes (fichier 1) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '44px' }}>
              {[
                {
                  icon: '✉', label: 'Email', value: personal.email,
                  action: copyEmail,
                  badge: copied ? '✓ Copié !' : 'Cliquer pour copier',
                  badgeColor: copied ? '#22c55e' : 'var(--gold)',
                },
                { icon: '☎', label: 'Téléphone',   value: personal.phone },
                { icon: '📍', label: 'Localisation', value: personal.location },
              ].map(({ icon, label, value, action, badge, badgeColor }) => (
                <div
                  key={label}
                  onClick={action || undefined}
                  data-hover={action ? true : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px',
                    background: 'rgba(13,13,26,0.5)',
                    border: '1px solid rgba(201,168,76,0.1)',
                    backdropFilter: 'blur(8px)',
                    cursor: action ? 'none' : 'default',
                    transition: 'all .3s ease',
                  }}
                  onMouseEnter={e => {
                    if (action) {
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)';
                      e.currentTarget.style.background  = 'rgba(201,168,76,0.04)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)';
                    e.currentTarget.style.background  = 'rgba(13,13,26,0.5)';
                  }}
                >
                  <div style={{
                    width: '38px', height: '38px',
                    border: '1px solid rgba(201,168,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', flexShrink: 0,
                    background: 'rgba(201,168,76,0.04)',
                  }}>{icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '9px', color: 'var(--white-dimmer)',
                      letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '3px',
                    }}>{label}</p>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--white)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{value}</p>
                  </div>
                  {badge && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '8px',
                      color: badgeColor, letterSpacing: '0.1em', flexShrink: 0,
                    }}>{badge}</span>
                  )}
                </div>
              ))}
            </div>

            {/* RÉSEAUX SOCIAUX */}
            <div className="reveal delay-3">
              <p className="section-label" style={{ marginBottom: '16px' }}>Retrouvez-moi</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { href: personal.github,   label: 'GitHub',   color: 'var(--white-dim)' },
                  { href: personal.linkedin, label: 'LinkedIn', color: '#7dd3fc' },
                ].map(({ href, label, color }) => (
                  <a
                    key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="btn-gold"
                    data-hover
                    style={{ padding: '11px 24px', fontSize: '9px', borderColor: `${color}44`, color }}
                  >
                    <span>{label} ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── DROITE — FORMULAIRE ── */}
          <div className="reveal reveal-right">
            <form onSubmit={handleSubmit}>
              <div style={{
                background: 'rgba(13,13,26,0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(201,168,76,0.1)',
                padding: '40px',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Ligne top dégradée */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { key: 'name',  label: 'Votre Nom',   type: 'text',  placeholder: 'Marie Dupont' },
                    { key: 'email', label: 'Votre Email',  type: 'email', placeholder: 'marie@exemple.com' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <p style={{
                        fontFamily: 'var(--font-mono)', fontSize: '9px',
                        letterSpacing: '0.25em', textTransform: 'uppercase',
                        color: focusedField === key ? 'var(--gold)' : 'var(--white-dimmer)',
                        marginBottom: '8px', transition: 'color .3s ease',
                      }}>{label}</p>
                      <input
                        type={type}
                        value={form[key]}
                        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        placeholder={placeholder}
                        required
                        style={inputStyle(key)}
                        onFocus={() => setFocusedField(key)}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  ))}

                  <div>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '9px',
                      letterSpacing: '0.25em', textTransform: 'uppercase',
                      color: focusedField === 'message' ? 'var(--gold)' : 'var(--white-dimmer)',
                      marginBottom: '8px', transition: 'color .3s ease',
                    }}>Message</p>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Bonjour Assia, je voudrais..."
                      required rows={6}
                      style={{ ...inputStyle('message'), resize: 'vertical' }}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    disabled={status === 'sending'}
                    style={{
                      alignSelf: 'stretch', justifyContent: 'center',
                      opacity: status === 'sending' ? 0.7 : 1,
                      transition: 'opacity .3s ease',
                    }}
                  >
                    <span>{buttonLabel}</span>
                    {status === 'idle' && <span>→</span>}
                  </button>

                  {status === 'error' && (
                    <p style={{ fontSize: '11px', color: '#e74c3c', letterSpacing: '0.1em' }}>
                      Une erreur s'est produite. Vérifiez vos clés EmailJS.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{
          marginTop: '100px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '20px',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 300,
              color: 'var(--white)',
            }}>
              Assia<span style={{ color: 'var(--gold)' }}>.</span>Houbbadi
            </p>
            <p style={{ fontSize: '10px', color: 'var(--white-dimmer)', marginTop: '4px', letterSpacing: '0.15em' }}>
              Ingénieure Informatique · ENSAKH · Khouribga
            </p>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--white-dimmer)', letterSpacing: '0.12em' }}>
            © 2026 — ASSIA HOUBBADI — TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}