import React, { useState } from 'react';

export default function AboutSection() {
  // State Modal (null jika tertutup, atau 'bem' / 'mandiri' / 'team')
  const [activeModal, setActiveModal] = useState(null);

  // State Indeks Judul Karya Utama
  const [mainProjectIndex, setMainProjectIndex] = useState(0);

  // State Indeks Foto/Dokumentasi Dalam Gambar
  const [innerMediaIndex, setInnerMediaIndex] = useState(0);

  // DATABASE KARYA LENGKAP PER KATEGORI (TETAP SAMA LENGKAP)
  const modalData = {
    bem: {
      categoryTitle: '📣 Kegiatan & Media BEM',
      color: '#a855f7',
      projects: [
        {
          title: '🎨 Desain Poster & Feed Instagram Event',
          tools: 'Canva Pro • Photoshop',
          desc: 'Perancangan materi publikasi visual mingguan & poster acara besar BEM untuk meningkatkan engagement followers.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Poster+Event+1+(Canva)', caption: 'Poster Utama Event Kampus' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=Feed+Instagram+2+(Canva)', caption: 'Microblog Carousel Feed Instagram' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Pamflet+Publikasi+3+(Canva)', caption: 'Pamflet Informasi Pendaftaran' }
          ]
        },
        {
          title: '🎬 Video Reels Aftermath & Teaser Event',
          tools: 'Premiere Pro • CapCut Pro',
          desc: 'Editing video dokumentasi acara, gabungan transisi dinamik, color grading, serta sound design cinematic.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Video+Reels+Highlight+1', caption: 'Teaser Video Instagram Reels' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Dokumentasi+Proses+Editing+2', caption: 'Proses Video Editing di Premiere Pro' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=Hasil+Export+Video+3', caption: 'Dokumentasi Screening Acara' }
          ]
        },
        {
          title: '📸 Dokumentasi & Kepemimpinan Divisi Media',
          tools: 'Team Leadership • Media Management',
          desc: 'Dokumentasi aksi lapangan, koordinasi liputan divisi, dan pengelolaan aset digital media BEM.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=Foto+Tim+Media+BEM+1', caption: 'Foto Bersama Divisi Media & Komunikasi' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Dokumentasi+Liputan+2', caption: 'Dokumentasi Tugas Liputan Lapangan' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Rapat+Koordinasi+3', caption: 'Rapat Perencanaan Media BEM' }
          ]
        }
      ]
    },
    mandiri: {
      categoryTitle: '💻 Project Mandiri (Solo Exploration)',
      color: '#3b82f6',
      projects: [
        {
          title: '🌐 Interactive Portfolio Web (React 3D)',
          tools: 'React JS • CSS 3D • Figma',
          desc: 'Pengembangan portofolio web interaktif dengan fitur Lanyard 3D Drag & Drop, Modal Carousel, dan Bento Grid.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Hero+Section+Lanyard+1', caption: 'Tampilan Utama Hero Lanyard 3D' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Bento+Grid+Tentang+Saya+2', caption: 'Bagian Bento Grid Interaktif' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=Responsive+Mobile+View+3', caption: 'Tampilan Mobile Responsive' }
          ]
        },
        {
          title: '🎨 UI/UX E-Commerce Redesign Concept',
          tools: 'Figma • UI/UX Design',
          desc: 'Rancangan desain antarmuka aplikasi belanja online dengan pendekatan kenyamanan navigasi pengguna.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Figma+Wireframe+1', caption: 'Wireframing & Flowchart' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=High+Fidelity+UI+2', caption: 'High-Fidelity UI Design' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Design+System+3', caption: 'Design System & Color Palette' }
          ]
        }
      ]
    },
    team: {
      categoryTitle: '👥 Project Team & Kolaborasi',
      color: '#22c55e',
      projects: [
        {
          title: '🚀 Digitalisasi Sistem Informasi Kampus',
          tools: 'React JS • Figma • Team Collaboration',
          desc: 'Fokus Saya: Lead Frontend & UI/UX Designer. Bertanggung jawab memimpin desain antarmuka dan implementasi komponen React.',
          media: [
            { type: 'image', url: 'https://via.placeholder.com/600x350/1e1e2f/ffffff?text=Tampilan+Dashboard+Tim+1', caption: 'Dashboard Sistem Informasi Kampus' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/181926/ffffff?text=Kolaborasi+Figma+2', caption: 'Sesi Kolaborasi UI/UX di Figma' },
            { type: 'image', url: 'https://via.placeholder.com/600x350/252638/ffffff?text=Testing+Frontend+React+3', caption: 'Testing Kode Frontend Bersama Tim' }
          ]
        }
      ]
    }
  };

  const openCategoryModal = (categoryKey) => {
    setActiveModal(categoryKey);
    setMainProjectIndex(0);
    setInnerMediaIndex(0);
  };

  const handleNextProject = (totalProjects) => {
    setMainProjectIndex((prev) => (prev + 1) % totalProjects);
    setInnerMediaIndex(0);
  };

  const handlePrevProject = (totalProjects) => {
    setMainProjectIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    setInnerMediaIndex(0);
  };

  const handleNextInnerMedia = (totalMedia) => {
    setInnerMediaIndex((prev) => (prev + 1) % totalMedia);
  };

  const handlePrevInnerMedia = (totalMedia) => {
    setInnerMediaIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
  };

  return (
    <section id="tentang-saya" style={{ 
      paddingTop: '60px', 
      paddingBottom: '80px',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      paddingLeft: '15px',
      paddingRight: '15px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      
      {/* GLOW LIGHT BACKGROUND DIBELAKANG SECTION */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '350px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* HEADER SECTION */}
      <div style={{ marginBottom: '28px', textAlign: 'left' }}>
        <span style={{ 
          fontSize: '0.78rem', 
          fontWeight: 'bold', 
          letterSpacing: '1.5px', 
          color: '#60a5fa', 
          textTransform: 'uppercase',
          background: 'rgba(59, 130, 246, 0.12)',
          padding: '6px 16px',
          borderRadius: '20px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 0 15px rgba(59, 130, 246, 0.15)'
        }}>
          💡 LATAR BELAKANG
        </span>
        <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginTop: '12px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          Tentang Saya
        </h2>
      </div>

      {/* PANEL BIO UTAMA (VISUAL GLASSMORPHISM + HYBRID CARD) */}
      <div 
        style={{
          backgroundColor: 'rgba(19, 20, 31, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '28px',
          padding: '36px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          marginBottom: '28px',
          textAlign: 'left'
        }}
      >
        {/* PARAGRAF HOOK UTAMA */}
        <p style={{ color: '#ffffff', fontSize: '1.12rem', lineHeight: '1.75', marginBottom: '18px', fontWeight: '600' }}>
          Saya adalah mahasiswi S1 Teknik Informatika di Universitas Esa Unggul yang berfokus pada{' '}
          <span style={{ 
            background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '800'
          }}>
            web development (React)
          </span>, perancangan UI/UX, serta eksekusi media kreatif seperti desain visual dan <i>video editing</i>.
        </p>

        {/* PARAGRAF PENGALAMAN & INDUSTRI */}
        <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '24px' }}>
          Berbekal pengalaman di lingkungan manufaktur (PT Akebono Brake Astra & PT TOA Galva) serta peran aktif di divisi media BEM, saya terbiasa memproses ide kreatif menjadi produk digital yang estetis, terstruktur, dan efisien.
        </p>

        {/* MINI CARDS HIGHLIGHTS (Bikin Kelihatan "Real" & Interaktif) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '26px'
        }}>
          {/* Card Mini 1 */}
          <div style={{
            background: 'rgba(24, 25, 38, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '18px',
            padding: '16px 20px',
            transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '4px' }}>🎓 Akademik</span>
            <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>S1 Teknik Informatika</strong>
            <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Universitas Esa Unggul</span>
          </div>

          {/* Card Mini 2 */}
          <div style={{
            background: 'rgba(24, 25, 38, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '18px',
            padding: '16px 20px',
            transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '4px' }}>🏭 Pengalaman Industri</span>
            <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>Ketelitian & Process Efficiency</strong>
            <span style={{ color: '#64748b', fontSize: '0.8rem' }}>PT Akebono & PT TOA Galva</span>
          </div>

          {/* Card Mini 3 */}
          <div style={{
            background: 'rgba(24, 25, 38, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '18px',
            padding: '16px 20px',
            transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '4px' }}>🎨 Media & Organisasi</span>
            <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>Desain Visual & Video Editing</strong>
            <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Divisi Media BEM</span>
          </div>
        </div>

        {/* BOTTOM TAGS & STATUS BADGE */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', background: 'rgba(24, 25, 38, 0.8)', color: '#94a3b8', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              📍 Jakarta, Indonesia
            </span>
            <span style={{ fontSize: '0.78rem', background: 'rgba(24, 25, 38, 0.8)', color: '#94a3b8', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              ⚡ Fast Learner
            </span>
            <span style={{ fontSize: '0.78rem', background: 'rgba(24, 25, 38, 0.8)', color: '#94a3b8', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              🎯 Adaptif & Disiplin
            </span>
          </div>

          {/* STATUS PULSE GREEN */}
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

      {/* 3 KOTAK PINTU MASUK KARYA (DENGAN HOVER GLOW BERWARNA BISA DIKLIK) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {[
          { id: 'bem', icon: '📣', title: 'Kegiatan & Media BEM', desc: 'Desain poster Canva, editan video event, dan foto dokumentasi.', color: '#a855f7' },
          { id: 'mandiri', icon: '💻', title: 'Project Mandiri', desc: 'Eksperimen personal, web app, tools, dan penjelasan fokus teknis.', color: '#3b82f6' },
          { id: 'team', icon: '👥', title: 'Project Team', desc: 'Kolaborasi tim, role & jobdesk spesifik, serta hasil akhir proyek.', color: '#22c55e' }
        ].map((item) => (
          <div 
            key={item.id}
            onClick={() => openCategoryModal(item.id)}
            style={{
              backgroundColor: 'rgba(19, 20, 31, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '20px',
              padding: '22px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = item.color;
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 12px 30px ${item.color}33`;
              e.currentTarget.style.backgroundColor = 'rgba(28, 29, 45, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundColor = 'rgba(19, 20, 31, 0.75)';
            }}
          >
            <div style={{ fontSize: '1.5rem', background: 'rgba(24, 25, 38, 0.9)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              {item.icon}
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: '0 0 4px 0', fontWeight: '700' }}>{item.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0, lineHeight: '1.4' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MODAL POP-UP DI TENGAH LAYAR (LENGKAP SEMUA NAVIGASI & SLIDER) */}
      {/* ========================================================================= */}
      {activeModal && (() => {
        const currentCategory = modalData[activeModal];
        const currentProject = currentCategory.projects[mainProjectIndex];
        const currentMedia = currentProject.media[innerMediaIndex];
        const totalProjects = currentCategory.projects.length;
        const totalMedia = currentProject.media.length;

        return (
          <div 
            onClick={() => setActiveModal(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '750px',
                backgroundColor: '#13141f',
                border: `2px solid ${currentCategory.color}`,
                borderRadius: '24px',
                padding: '30px',
                boxSizing: 'border-box',
                position: 'relative',
                boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${currentCategory.color}30`,
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
              }}
            >
              {/* Tombol Close (✕) */}
              <button 
                onClick={() => setActiveModal(null)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: '#181926',
                  border: '1px solid #2d2d3f',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  zIndex: 10
                }}
              >
                ✕
              </button>

              {/* Sub-Header Modal Category */}
              <div>
                <span style={{ color: currentCategory.color, fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {currentCategory.categoryTitle}
                </span>
                <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '2px 0 0 0' }}>
                  Karya {mainProjectIndex + 1} dari {totalProjects}
                </p>
              </div>

              {/* NAVIGASI UTAMA (PANAH KIRI & KANAN UTAMA) + JUDUL KARYA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
                <button 
                  onClick={() => handlePrevProject(totalProjects)}
                  style={{
                    background: '#181926',
                    border: '1px solid #2d2d3f',
                    color: '#fff',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}
                  title="Ke Judul Sebelumnya"
                >
                  ◀
                </button>

                <div style={{ textAlign: 'center', flex: 1 }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: '0 0 4px 0', fontWeight: '800' }}>
                    {currentProject.title}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#60a5fa', background: 'rgba(59, 130, 246, 0.15)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    Tools: {currentProject.tools}
                  </span>
                </div>

                <button 
                  onClick={() => handleNextProject(totalProjects)}
                  style={{
                    background: '#181926',
                    border: '1px solid #2d2d3f',
                    color: '#fff',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}
                  title="Ke Judul Selanjutnya"
                >
                  ▶
                </button>
              </div>

              {/* INNER SLIDER: AREA GAMBAR DENGAN PANAH DIDALAMNYA */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '320px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #2d2d3f',
                backgroundColor: '#181926'
              }}>
                <img 
                  src={currentMedia.url} 
                  alt={currentMedia.caption} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Panah Kiri Inner Gambar */}
                {totalMedia > 1 && (
                  <button 
                    onClick={() => handlePrevInnerMedia(totalMedia)}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(19, 20, 31, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ❮
                  </button>
                )}

                {/* Panah Kanan Inner Gambar */}
                {totalMedia > 1 && (
                  <button 
                    onClick={() => handleNextInnerMedia(totalMedia)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(19, 20, 31, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ❯
                  </button>
                )}

                {/* Indikator Caption Foto */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  background: 'rgba(19, 20, 31, 0.85)',
                  backdropFilter: 'blur(6px)',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: '500' }}>
                    {currentMedia.caption}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                    {innerMediaIndex + 1} / {totalMedia}
                  </span>
                </div>
              </div>

              {/* INDIKATOR TITIK (PAGINATION DOTS) UNTUK INNER SLIDER */}
              {totalMedia > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '-8px' }}>
                  {currentProject.media.map((_, idx) => (
                    <span 
                      key={idx}
                      onClick={() => setInnerMediaIndex(idx)}
                      style={{
                        width: idx === innerMediaIndex ? '20px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: idx === innerMediaIndex ? currentCategory.color : '#2d2d3f',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Deskripsi Singkat Karya */}
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6', margin: 0, textAlign: 'center' }}>
                {currentProject.desc}
              </p>

            </div>
          </div>
        );
      })()}

    </section>
  );
}