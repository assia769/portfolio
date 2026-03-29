'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { projects } from '../lib/data';

// ─── VIDEO PLAYER ────────────────────────────────────────────────────────────
function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100 || 0);
  };

  const onLoaded = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const toggleFS = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!document.fullscreenElement) {
      v.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  return (
    <div style={{
      position: 'relative',
      background: '#000',
      border: '1px solid rgba(201,168,76,0.2)',
      overflow: 'hidden',
    }}>
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoaded}
        onEnded={() => setPlaying(false)}
        style={{ width: '100%', display: 'block', maxHeight: '360px', objectFit: 'contain', background: '#000' }}
        onClick={togglePlay}
      />

      {/* PLAY OVERLAY */}
      {!playing && (
        <div
          onClick={togglePlay}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'none',
            background: 'rgba(0,0,0,0.35)',
          }}
        >
          <div style={{
            width: '64px', height: '64px',
            border: '2px solid var(--gold)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(201,168,76,0.1)',
            transition: 'transform 0.2s ease',
          }}>
            <span style={{ color: 'var(--gold)', fontSize: '22px', marginLeft: '4px' }}>▶</span>
          </div>
        </div>
      )}

      {/* CONTROLS */}
      <div style={{
        background: 'linear-gradient(to top, rgba(4,4,4,0.95), transparent)',
        padding: '12px 16px 10px',
        position: 'absolute', bottom: 0, left: 0, right: 0,
      }}>
        {/* PROGRESS BAR */}
        <div
          onClick={seek}
          style={{
            height: '3px', background: 'rgba(255,255,255,0.15)',
            marginBottom: '10px', cursor: 'none', position: 'relative',
          }}
        >
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            position: 'relative',
            transition: 'width 0.1s linear',
          }}>
            <div style={{
              position: 'absolute', right: '-4px', top: '-3px',
              width: '9px', height: '9px',
              background: 'var(--gold)', borderRadius: '50%',
            }} />
          </div>
        </div>

        {/* BUTTONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={togglePlay} style={btnStyle}>
            {playing ? '⏸' : '▶'}
          </button>
          <span style={{ fontSize: '10px', color: 'rgba(245,240,232,0.5)', fontFamily: 'var(--font-mono)', minWidth: '80px' }}>
            {fmt(currentTime)} / {fmt(duration)}
          </span>
          <div style={{ flex: 1 }} />
          <button onClick={() => { setMuted(m => !m); }} style={btnStyle}>
            {muted ? '🔇' : '🔊'}
          </button>
          <button onClick={toggleFS} style={btnStyle}>⛶</button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  background: 'none', border: 'none',
  color: 'rgba(245,240,232,0.7)', fontSize: '14px',
  cursor: 'none', padding: '2px 6px',
  transition: 'color 0.2s ease',
};

// ─── MODAL ───────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState(project.video ? 'video' : 'images');

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  const hasImages = project.images && project.images.length > 0;
  const hasVideo = !!project.video;

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(4,4,4,0.94)',
        backdropFilter: 'blur(10px)',
        zIndex: 9990,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '820px', width: '100%',
          background: 'var(--black-3)',
          border: '1px solid rgba(201,168,76,0.2)',
          padding: '44px',
          position: 'relative',
          marginTop: 'auto', marginBottom: 'auto',
        }}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          data-hover
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none',
            border: '1px solid rgba(201,168,76,0.3)',
            color: 'var(--gold)', width: '34px', height: '34px',
            cursor: 'none', fontSize: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>

        {/* BADGE PRIZE */}
        {project.prize && (
          <div style={{
            display: 'inline-block', padding: '5px 14px',
            border: '1px solid var(--gold)', color: 'var(--gold)',
            fontSize: '10px', letterSpacing: '0.2em',
            marginBottom: '18px',
          }}>{project.prize}</div>
        )}

        {/* TITLE */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 300, color: 'var(--white)', marginBottom: '6px',
        }}>{project.title}</h3>
        <p style={{
          color: 'var(--gold)', fontSize: '11px',
          letterSpacing: '0.2em', marginBottom: '28px',
        }}>{project.subtitle}</p>

        {/* TABS — Video / Images */}
        {(hasVideo || hasImages) && (
          <>
            {hasVideo && hasImages && (
              <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                {['video', 'images'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    data-hover
                    style={{
                      padding: '8px 20px',
                      border: `1px solid ${tab === t ? 'var(--gold)' : 'rgba(201,168,76,0.15)'}`,
                      background: tab === t ? 'rgba(201,168,76,0.08)' : 'transparent',
                      color: tab === t ? 'var(--gold)' : 'var(--white-dimmer)',
                      fontFamily: 'var(--font-mono)', fontSize: '9px',
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      cursor: 'none', transition: 'all 0.3s ease',
                    }}
                  >
                    {t === 'video' ? '▶ Vidéo Démo' : '🖼 Screenshots'}
                  </button>
                ))}
              </div>
            )}

            {/* VIDEO PLAYER */}
            {(tab === 'video' || (!hasImages && hasVideo)) && hasVideo && (
              <div style={{ marginBottom: '28px' }}>
                <VideoPlayer src={project.video} />
                <p style={{
                  fontSize: '9px', color: 'var(--white-dimmer)',
                  marginTop: '8px', letterSpacing: '0.1em',
                  textAlign: 'right',
                }}>
                  Cliquer sur la vidéo ou le bouton ▶ pour lancer · ESC pour fermer
                </p>
              </div>
            )}

            {/* IMAGE GALLERY */}
            {(tab === 'images' || (!hasVideo && hasImages)) && hasImages && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{
                  position: 'relative', width: '100%', aspectRatio: '16/9',
                  border: '1px solid rgba(201,168,76,0.15)',
                  overflow: 'hidden', background: 'var(--black-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Image
                    src={project.images[imgIdx]}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'contain', padding: '8px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {/* Prev / Next arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIdx(i => (i - 1 + project.images.length) % project.images.length)}
                        style={{
                          position: 'absolute', left: '12px',
                          background: 'rgba(4,4,4,0.7)',
                          border: '1px solid rgba(201,168,76,0.3)',
                          color: 'var(--gold)', width: '32px', height: '32px',
                          cursor: 'none', fontSize: '14px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >‹</button>
                      <button
                        onClick={() => setImgIdx(i => (i + 1) % project.images.length)}
                        style={{
                          position: 'absolute', right: '12px',
                          background: 'rgba(4,4,4,0.7)',
                          border: '1px solid rgba(201,168,76,0.3)',
                          color: 'var(--gold)', width: '32px', height: '32px',
                          cursor: 'none', fontSize: '14px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >›</button>
                    </>
                  )}
                </div>
                {project.images.length > 1 && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {project.images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setImgIdx(i)}
                        data-hover
                        style={{
                          width: '60px', height: '44px', position: 'relative',
                          border: `1px solid ${i === imgIdx ? 'var(--gold)' : 'rgba(201,168,76,0.15)'}`,
                          overflow: 'hidden', cursor: 'none',
                          background: 'var(--black)',
                          transition: 'border-color 0.2s ease',
                        }}
                      >
                        <Image src={img} alt="" fill style={{ objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* NO MEDIA */}
        {!hasVideo && !hasImages && (
          <div style={{
            height: '120px',
            border: '1px solid rgba(201,168,76,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '28px',
            background: 'var(--black-2)',
          }}>
            <span style={{ color: 'var(--white-dimmer)', fontSize: '11px', letterSpacing: '0.15em' }}>
              SCREENSHOTS À VENIR
            </span>
          </div>
        )}

        {/* DESCRIPTION */}
        <p style={{
          color: 'var(--white-dim)', fontSize: '13px',
          lineHeight: 2, marginBottom: '24px',
        }}>{project.description}</p>

        {/* TAGS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.tags.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>

        {/* LINK */}
        {project.link && project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ display: 'inline-flex', marginTop: '24px' }}
          >
            <span>Voir le Projet →</span>
          </a>
        )}
      </div>
    </div>
  );
}

// ─── TERMINAL CARD ────────────────────────────────────────────────────────────
function TerminalCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const hasMedia = project.video || (project.images && project.images.length > 0);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        background: 'var(--black-3)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.38)' : 'rgba(201,168,76,0.08)'}`,
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
        cursor: 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Terminal top bar */}
      <div style={{
        padding: '11px 18px',
        borderBottom: '1px solid rgba(201,168,76,0.07)',
        display: 'flex', alignItems: 'center', gap: '7px',
        background: 'rgba(201,168,76,0.03)',
      }}>
        {['#c0392b', '#c9a84c', '#27ae60'].map((c) => (
          <div key={c} style={{
            width: '8px', height: '8px',
            borderRadius: '50%', background: c, opacity: 0.7,
          }} />
        ))}
        <span style={{
          fontSize: '9px', color: 'var(--white-dimmer)',
          marginLeft: '8px', letterSpacing: '0.1em',
        }}>
          {project.year} · {project.title.toLowerCase().replace(/ /g, '-')}.js
        </span>
        {hasMedia && (
          <span style={{
            marginLeft: 'auto', fontSize: '9px',
            color: 'var(--gold)', letterSpacing: '0.1em',
            opacity: 0.8,
          }}>
            {project.video ? '▶ vidéo' : '🖼 images'}
          </span>
        )}
      </div>

      {/* Code */}
      <div style={{
        padding: '26px', fontFamily: 'var(--font-mono)',
        fontSize: '11px', lineHeight: 2,
      }}>
        <div style={{ marginBottom: '2px' }}>
          <span style={{ color: 'rgba(201,168,76,0.5)' }}>const </span>
          <span style={{ color: 'var(--white)' }}>project</span>
          <span style={{ color: 'rgba(245,240,232,0.3)' }}> = {'{'}</span>
        </div>
        <div style={{ paddingLeft: '18px' }}>
          <div>
            <span style={{ color: 'rgba(201,168,76,0.5)' }}>name</span>
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>: </span>
            <span style={{ color: 'var(--gold)' }}>'{project.title}'</span>
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>,</span>
          </div>
          <div style={{ margin: '2px 0' }}>
            <span style={{ color: 'rgba(201,168,76,0.5)' }}>stack</span>
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>: [</span>
            {project.tags.map((t, i) => (
              <span key={t}>
                <span style={{ color: '#8db8c4' }}>'{t}'</span>
                {i < project.tags.length - 1 && (
                  <span style={{ color: 'rgba(245,240,232,0.3)' }}>, </span>
                )}
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
          <div style={{ marginTop: '6px' }}>
            <span style={{ color: 'rgba(201,168,76,0.5)' }}>desc</span>
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>: </span>
            <span style={{
              color: 'rgba(245,240,232,0.45)',
              fontStyle: 'italic', fontSize: '10px',
            }}>
              '{project.description.slice(0, 55)}...'
            </span>
          </div>
        </div>
        <div style={{ color: 'rgba(245,240,232,0.3)' }}>{'}'}</div>
      </div>

      {/* Hover CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '10px 26px',
        background: 'linear-gradient(to top, rgba(201,168,76,0.07), transparent)',
        fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.2em',
        textTransform: 'uppercase',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        textAlign: 'right',
      }}>
        {hasMedia ? (project.video ? '▶ Voir la démo' : '🖼 Voir screenshots') : 'Voir détails'} →
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function Projects() {
  const [selected, setSelected] = useState(null);
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" style={{
      padding: '120px 40px',
      maxWidth: '1400px', margin: '0 auto',
      position: 'relative',
    }}>
      {/* HEADER */}
      <div className="reveal" style={{
        marginBottom: '80px',
        display: 'flex', alignItems: 'center', gap: '24px',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 12vw, 160px)',
          fontWeight: 200,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.1)',
          lineHeight: 1, userSelect: 'none',
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
      <p className="section-label reveal" style={{ marginBottom: '28px' }}>Projets Phares</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px', marginBottom: '60px',
      }}>
        {featured.map((p, i) => (
          <div key={p.title} className={`reveal delay-${i + 1}`}>
            <TerminalCard project={p} onClick={() => setSelected(p)} />
          </div>
        ))}
      </div>

      {/* OTHERS */}
      <p className="section-label reveal" style={{ marginBottom: '28px' }}>Tous les Projets</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        {others.map((p, i) => (
          <div key={p.title} className={`reveal delay-${(i % 3) + 1}`}>
            <TerminalCard project={p} onClick={() => setSelected(p)} />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}

      <style>{`
        @media (max-width: 900px) {
          #projects > div:nth-of-type(3) { grid-template-columns: 1fr !important; }
          #projects > div:nth-of-type(5) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}