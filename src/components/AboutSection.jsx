import React, { useState, useEffect, useRef } from 'react';
import { 
  FaGraduationCap, 
  FaIndustry, 
  FaPalette, 
  FaBullhorn, 
  FaLaptopCode, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaBolt, 
  FaCheckCircle, 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaArrowRight, 
  FaPlay, 
  FaFilm, 
  FaImage 
} from 'react-icons/fa';

// ============================================================
// HOOK: Typewriter Effect
// ============================================================
function useTypewriter(text, speed = 22, isActive = false) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isActive || !text) {
      setDisplayed('');
      setIsDone(false);
      return;
    }
    setDisplayed('');
    setIsDone(false);
    let i = 0;
    const type = () => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
        timeoutRef.current = setTimeout(type, speed);
      } else {
        setIsDone(true);
      }
    };
    // Small delay before starting
    timeoutRef.current = setTimeout(type, 180);
    return () => clearTimeout(timeoutRef.current);
  }, [text, isActive, speed]);

  return { displayed, isDone };
}

// ============================================================
// COMPONENT: Media Renderer (Image / MP4 Video / YouTube)
// ============================================================
function MediaRenderer({ media }) {
  if (!media) return null;

  if (media.type === 'youtube') {
    const embedId = media.url.includes('watch?v=')
      ? media.url.split('watch?v=')[1].split('&')[0]
      : media.url.split('/').pop();
    return (
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#0a0b10' }}>
        <iframe
          src={`https://www.youtube.com/embed/${embedId}?autoplay=0&rel=0&modestbranding=1`}
          title={media.caption}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <video
        src={media.url}
        controls
        style={{ width: '100%', borderRadius: '14px', backgroundColor: '#0a0b10', maxHeight: '340px', objectFit: 'contain' }}
      />
    );
  }

  // Default: image
  return (
    <img
      src={media.url}
      alt={media.caption}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      onError={(e) => { e.target.src = `https://via.placeholder.com/600x350/181926/60a5fa?text=${encodeURIComponent(media.caption || 'Preview')}`; }}
    />
  );
}

// ============================================================
// COMPONENT: 3D Tilt + Typewriter Modal (Full-screen overlay)
// ============================================================
function ProjectModal({ categoryData, onClose }) {
  const [projectIdx, setProjectIdx] = useState(0);
  const [mediaIdx, setMediaIdx] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);

  const currentProject = categoryData.projects[projectIdx];
  const currentMedia = currentProject.media[mediaIdx];

  // Trigger panel + typewriter after mount or project change
  useEffect(() => {
    setPanelVisible(false);
    const t = setTimeout(() => setPanelVisible(true), 80);
    return () => clearTimeout(t);
  }, [projectIdx]);

  const { displayed: typedDesc, isDone } = useTypewriter(currentProject.desc, 18, panelVisible);
  const { displayed: typedTitle } = useTypewriter(currentProject.title, 30, panelVisible);

  const goProject = (dir) => {
    setProjectIdx((prev) => (prev + dir + categoryData.projects.length) % categoryData.projects.length);
    setMediaIdx(0);
  };

  const goMedia = (dir) => {
    setMediaIdx((prev) => (prev + dir + currentProject.media.length) % currentProject.media.length);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const accentColor = categoryData.color;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeInScale 0.22s ease-out',
      }}
    >
      {/* Modal Container — two-panel layout */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1020px',
          maxHeight: '88vh',
          gap: '20px',
          position: 'relative',
        }}
      >
        {/* ---- LEFT PANEL: 3D Tilted Media Card ---- */}
        <div
          style={{
            flex: '1 1 55%',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Media Card with 3D Tilt */}
          <div
            style={{
              backgroundColor: '#13141f',
              border: `1px solid ${accentColor}50`,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: `0 30px 70px rgba(0,0,0,0.9), 0 0 50px ${accentColor}25`,
              transform: `perspective(1100px) rotateY(-12deg) rotateX(3deg) scale(0.97)`,
              transformOrigin: 'center center',
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              position: 'relative',
              height: '320px',
            }}
          >
            {/* Media area */}
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <MediaRenderer media={currentMedia} />

              {/* Caption Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '10px 16px',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: '500',
              }}>
                {currentMedia.caption}
              </div>

              {/* Media type badge */}
              {currentMedia.type !== 'image' && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: currentMedia.type === 'youtube' ? 'rgba(255,0,0,0.85)' : 'rgba(59,130,246,0.85)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {currentMedia.type === 'youtube' ? <><FaPlay size={10} /> YouTube</> : <><FaFilm size={10} /> VIDEO</>}
                </div>
              )}
            </div>
          </div>

          {/* Media Thumbnails Navigator */}
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <button
              onClick={() => goMedia(-1)}
              style={{ background: 'rgba(255,255,255,0.08)', border: `1px solid ${accentColor}40`, color: '#fff', width: '36px', height: '36px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <FaChevronLeft size={12} />
            </button>

            {currentProject.media.map((m, i) => (
              <button
                key={i}
                onClick={() => setMediaIdx(i)}
                style={{
                  width: i === mediaIdx ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '6px',
                  backgroundColor: i === mediaIdx ? accentColor : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}

            <button
              onClick={() => goMedia(1)}
              style={{ background: 'rgba(255,255,255,0.08)', border: `1px solid ${accentColor}40`, color: '#fff', width: '36px', height: '36px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <FaChevronRight size={12} />
            </button>
          </div>

          {/* Project Tabs (switcher) */}
          {categoryData.projects.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categoryData.projects.map((p, i) => (
                <button
                  key={i}
                  onClick={() => goProject(i - projectIdx)}
                  style={{
                    fontSize: '0.72rem',
                    padding: '6px 14px',
                    borderRadius: '10px',
                    border: `1px solid ${i === projectIdx ? accentColor : 'rgba(255,255,255,0.1)'}`,
                    background: i === projectIdx ? `${accentColor}25` : 'rgba(255,255,255,0.04)',
                    color: i === projectIdx ? '#fff' : '#64748b',
                    cursor: 'pointer',
                    fontWeight: i === projectIdx ? '700' : '400',
                    transition: 'all 0.2s',
                  }}
                >
                  {p.title.slice(0, 22)}{p.title.length > 22 ? '…' : ''}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---- RIGHT PANEL: Typewriter Description ---- */}
        <div
          style={{
            flex: '1 1 42%',
            backgroundColor: 'rgba(13, 14, 21, 0.92)',
            border: `1px solid ${accentColor}35`,
            borderRadius: '20px',
            padding: '28px 24px',
            boxShadow: `0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            maxHeight: '88vh',
            overflowY: 'auto',
            opacity: panelVisible ? 1 : 0,
            transform: panelVisible ? 'translateX(0)' : 'translateX(20px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              color: '#fff',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaTimes size={14} />
          </button>

          {/* Category label */}
          <div>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: '800',
              letterSpacing: '2px',
              color: accentColor,
              textTransform: 'uppercase',
              background: `${accentColor}18`,
              padding: '4px 12px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}30`,
            }}>
              {categoryData.categoryTitle}
            </span>
          </div>

          {/* Typewriter Project Title */}
          <h3 style={{
            color: '#ffffff',
            fontSize: '1.2rem',
            fontWeight: '800',
            lineHeight: '1.35',
            minHeight: '2.7rem',
            letterSpacing: '-0.3px',
          }}>
            {typedTitle}<span style={{ opacity: isDone ? 0 : 1, animation: 'cursorBlink 0.7s infinite' }}>|</span>
          </h3>

          {/* Tools badge */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
          }}>
            {currentProject.tools.split('•').map((tool, i) => (
              <span key={i} style={{
                fontSize: '0.72rem',
                background: 'rgba(255,255,255,0.07)',
                color: '#94a3b8',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.08)',
                fontWeight: '500',
              }}>
                {tool.trim()}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: '40px', height: '3px', borderRadius: '3px', background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

          {/* Typewriter Description */}
          <div style={{
            flex: 1,
            fontSize: '0.92rem',
            color: '#cbd5e1',
            lineHeight: '1.75',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            minHeight: '80px',
          }}>
            {typedDesc}
            {!isDone && (
              <span style={{ animation: 'cursorBlink 0.6s steps(1) infinite', color: accentColor }}>▌</span>
            )}
          </div>

          {/* Media count indicator */}
          <div style={{
            fontSize: '0.73rem',
            color: '#475569',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>Media {mediaIdx + 1} / {currentProject.media.length}</span>
            <span style={{ color: accentColor, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {currentProject.media[mediaIdx].type === 'youtube' ? <><FaPlay size={10} /> YouTube Embed</> :
               currentProject.media[mediaIdx].type === 'video' ? <><FaFilm size={10} /> Video Preview</> : <><FaImage size={10} /> Gambar</>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT: AboutSection
// ============================================================
export default function AboutSection() {
  const [activeModal, setActiveModal] = useState(null);

  // DATABASE KARYA LENGKAP PER KATEGORI
  const modalData = {
    bem: {
      categoryTitle: 'Kegiatan & Media BEM',
      color: '#a855f7',
      projects: [
        {
          title: 'Desain Poster & Feed Instagram Event',
          tools: 'Canva Pro • Photoshop',
          desc: 'Perancangan materi publikasi visual mingguan & poster acara besar BEM untuk meningkatkan engagement followers. Setiap aset visual dirancang dengan identitas visual yang konsisten, tipografi yang bersih, dan estetika yang sesuai target audiens mahasiswa.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Poster+Event+1+(Canva)', caption: 'Poster Utama Event Kampus' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=Feed+Instagram+2+(Canva)', caption: 'Microblog Carousel Feed Instagram' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Pamflet+Publikasi+3+(Canva)', caption: 'Pamflet Informasi Pendaftaran' },
          ]
        },
        {
          title: 'Video Reels Aftermath & Teaser Event',
          tools: 'Premiere Pro • CapCut Pro',
          desc: 'Editing video dokumentasi acara, gabungan transisi dinamik, color grading, serta sound design cinematic. Hasil akhir diterbitkan sebagai Instagram Reels dan story highlight yang mencapai ribuan tayangan organik.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Video+Reels+Highlight+1', caption: 'Teaser Video Instagram Reels' },
            { type: 'youtube', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', caption: 'Contoh: Embed Demo Video Event (ganti URL)' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Dokumentasi+Proses+Editing+2', caption: 'Proses Video Editing di Premiere Pro' },
          ]
        },
        {
          title: 'Dokumentasi & Kepemimpinan Divisi Media',
          tools: 'Team Leadership • Media Management',
          desc: 'Dokumentasi aksi lapangan, koordinasi liputan divisi, dan pengelolaan aset digital media BEM. Bertanggung jawab atas seluruh output konten mingguan divisi media & komunikasi.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=Foto+Tim+Media+BEM+1', caption: 'Foto Bersama Divisi Media & Komunikasi' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Dokumentasi+Liputan+2', caption: 'Dokumentasi Tugas Liputan Lapangan' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Rapat+Koordinasi+3', caption: 'Rapat Perencanaan Media BEM' },
          ]
        }
      ]
    },
    mandiri: {
      categoryTitle: 'Project Mandiri (Solo Exploration)',
      color: '#3b82f6',
      projects: [
        {
          title: 'Interactive Portfolio Web (React 3D)',
          tools: 'React JS • CSS 3D • Figma',
          desc: 'Pengembangan portofolio web interaktif dengan fitur Lanyard 3D Drag & Drop, Modal Carousel, dan Bento Grid. Dibangun menggunakan React + Vite, dengan animasi halus berbasis Web Audio API dan efek glassmorphism premium.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Hero+Section+Lanyard+1', caption: 'Tampilan Utama Hero Lanyard 3D' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Bento+Grid+Tentang+Saya+2', caption: 'Bagian Bento Grid Interaktif' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=Responsive+Mobile+View+3', caption: 'Tampilan Mobile Responsive' },
          ]
        },
        {
          title: 'UI/UX E-Commerce Redesign Concept',
          tools: 'Figma • UI/UX Design',
          desc: 'Rancangan desain antarmuka aplikasi belanja online dengan pendekatan kenyamanan navigasi pengguna. Meliputi wireframing, user flow, hi-fi prototype, dan design system lengkap dengan komponen reusable.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Figma+Wireframe+1', caption: 'Wireframing & Flowchart' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=High+Fidelity+UI+2', caption: 'High-Fidelity UI Design' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Design+System+3', caption: 'Design System & Color Palette' },
          ]
        }
      ]
    },
    team: {
      categoryTitle: 'Project Team & Kolaborasi',
      color: '#22c55e',
      projects: [
        {
          title: 'Digitalisasi Sistem Informasi Kampus',
          tools: 'React JS • Figma • Team Collaboration',
          desc: 'Fokus Saya: Lead Frontend & UI/UX Designer. Bertanggung jawab memimpin desain antarmuka dan implementasi komponen React. Berkolaborasi dengan backend developer untuk integrasi API dan validasi data form.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=Tampilan+Dashboard+Tim+1', caption: 'Dashboard Sistem Informasi Kampus' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Kolaborasi+Figma+2', caption: 'Sesi Kolaborasi UI/UX di Figma' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Testing+Frontend+React+3', caption: 'Testing Kode Frontend Bersama Tim' },
          ]
        }
      ]
    }
  };

  return (
    <>
      {/* CURSOR BLINK KEYFRAME injected once */}
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes categoryCardHover {
          from { transform: translateY(0); }
          to { transform: translateY(-4px); }
        }
      `}</style>

      <section id="tentang-saya" style={{
        paddingTop: '60px',
        paddingBottom: '80px',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        paddingLeft: '24px',
        paddingRight: '24px',
        boxSizing: 'border-box',
        position: 'relative'
      }}>

        {/* GLOW LIGHT BACKGROUND */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '350px',
          height: '250px',
          background: 'radial-gradient(circle, var(--accent-glow, rgba(59, 130, 246, 0.12)) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />

        {/* HEADER SECTION */}
        <div style={{ marginBottom: '28px', textAlign: 'left' }}>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 'bold',
            letterSpacing: '1.5px',
            color: 'var(--accent-secondary, #60a5fa)',
            textTransform: 'uppercase',
            background: 'rgba(59, 130, 246, 0.12)',
            padding: '6px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 0 15px var(--accent-glow, rgba(59, 130, 246, 0.15))'
          }}>
            💡 LATAR BELAKANG
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginTop: '12px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Tentang Saya
          </h2>
        </div>

        {/* PANEL BIO UTAMA */}
        <div style={{
          backgroundColor: 'rgba(19, 20, 31, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '28px',
          padding: '36px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          marginBottom: '28px',
          textAlign: 'left'
        }}>
          <p style={{ color: '#ffffff', fontSize: '1.12rem', lineHeight: '1.75', marginBottom: '18px', fontWeight: '600' }}>
            Saya adalah mahasiswi S1 Teknik Informatika di Universitas Esa Unggul yang berfokus pada{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-secondary, #60a5fa) 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '800'
            }}>
              web development (React)
            </span>, perancangan UI/UX, serta eksekusi media kreatif seperti desain visual dan <i>video editing</i>.
          </p>

          <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '24px' }}>
            Berbekal pengalaman di lingkungan manufaktur (PT Akebono Brake Astra & PT TOA Galva) serta peran aktif di divisi media BEM, saya terbiasa memproses ide kreatif menjadi produk digital yang estetis, terstruktur, dan efisien.
          </p>

          {/* MINI CARDS HIGHLIGHTS (IKON ORIGINAL SVG) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '26px'
          }}>
            <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaGraduationCap size={20} color="#60a5fa" />
              </div>
              <div>
                <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>Akademik — S1 Informatika</strong>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Universitas Esa Unggul</span>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaIndustry size={18} color="#c084fc" />
              </div>
              <div>
                <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>Pengalaman Industri</strong>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>PT Akebono & PT TOA Galva</span>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaPalette size={18} color="#f87171" />
              </div>
              <div>
                <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>Media & Organisasi</strong>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Divisi Media BEM</span>
              </div>
            </div>
          </div>

          {/* BOTTOM TAGS & STATUS BADGE */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', background: 'rgba(24, 25, 38, 0.8)', color: '#94a3b8', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <FaMapMarkerAlt color="#f43f5e" size={12} /> Jakarta, Indonesia
              </span>
              <span style={{ fontSize: '0.78rem', background: 'rgba(24, 25, 38, 0.8)', color: '#94a3b8', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <FaBolt color="#eab308" size={12} /> Fast Learner
              </span>
              <span style={{ fontSize: '0.78rem', background: 'rgba(24, 25, 38, 0.8)', color: '#94a3b8', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <FaCheckCircle color="#3b82f6" size={12} /> Adaptif & Disiplin
              </span>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              padding: '6px 14px',
              borderRadius: '12px',
              fontSize: '0.78rem',
              color: '#4ade80',
              fontWeight: '600'
            }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></span>
              Ready to Collaborate
            </div>
          </div>
        </div>

        {/* HEADER KARYA */}
        <div style={{ marginBottom: '18px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: '800', marginBottom: '6px' }}>
            Portofolio Karya
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            Klik kategori untuk membuka galeri interaktif — efek 3D tilt + penjelasan live typing ✨
          </p>
        </div>

        {/* 3 KOTAK PINTU MASUK KARYA */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {[
            { id: 'bem', icon: <FaBullhorn size={20} color="#c084fc" />, title: 'Kegiatan & Media BEM', desc: 'Desain poster Canva, editan video event, dan foto dokumentasi.', color: '#a855f7' },
            { id: 'mandiri', icon: <FaLaptopCode size={20} color="#60a5fa" />, title: 'Project Mandiri', desc: 'Eksperimen personal, web app, tools, dan penjelasan fokus teknis.', color: '#3b82f6' },
            { id: 'team', icon: <FaUsers size={20} color="#4ade80" />, title: 'Project Team', desc: 'Kolaborasi tim, role & jobdesk spesifik, serta hasil akhir proyek.', color: '#22c55e' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Subtle color glow bg */}
              <div style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '80px', height: '80px',
                background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />

              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: `${item.color}20`,
                border: `1px solid ${item.color}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {item.icon}
              </div>

              <div style={{ flex: 1, textAlign: 'left' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.05rem', margin: '0 0 5px 0', fontWeight: 'bold' }}>
                  {item.title}
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0, lineHeight: '1.4' }}>
                  {item.desc}
                </p>
              </div>

              <span style={{
                color: item.color,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s',
              }}>
                <FaArrowRight size={16} />
              </span>
            </div>
          ))}
        </div>

      </section>

      {/* INTERACTIVE 3D MODAL */}
      {activeModal && modalData[activeModal] && (
        <ProjectModal
          categoryData={modalData[activeModal]}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}