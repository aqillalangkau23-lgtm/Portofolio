import React, { useState } from 'react';

// Komponen Slider Gambar (Di dalam Modal)
function ImageSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#13141f', marginBottom: '20px' }}>
      
      {/* Area Gambar / Placeholder Slide */}
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', fontWeight: 'bold', padding: '20px', textAlign: 'center', border: '1px dashed #3b82f6' }}>
        {slides[currentIndex]}
      </div>

      {/* Tombol Panah Kiri */}
      <button 
        onClick={prevSlide}
        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.1rem' }}
      >
        ❮
      </button>

      {/* Tombol Panah Kanan */}
      <button 
        onClick={nextSlide}
        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.1rem' }}
      >
        ❯
      </button>

      {/* Indikator Dots */}
      <div style={{ position: 'absolute', bottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {slides.map((_, index) => (
          <span 
            key={index}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#3b82f6' : '#64748b',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  // State untuk menyimpan proyek mana yang sedang dibuka modal-nya
  const [selectedProject, setSelectedProject] = useState(null);

  const projectList = [
    {
      title: "Website Portofolio Personal",
      category: "React & CSS",
      type: "Mandiri",
      description: "Membangun website portofolio interaktif dari nol untuk menampilkan perjalanan akademik dan profesional.",
      slides: [
        "💻 Slide 1: Tampilan Hero & Navbar Utama",
        "📄 Slide 2: Tampilan Tab Navigasi Multi-page",
        "📱 Slide 3: Tampilan Responsive Mobile / Tablet"
      ]
    },
    {
      title: "Proyek Sistem Informasi Web Tim",
      category: "Web Development",
      type: "Tim",
      description: "Berkolaborasi dalam tim untuk menyelesaikan proyek pengembangan antarmuka dan sistem informasi.",
      slides: [
        "👥 Slide 1: Halaman Dashboard Utama Sistem",
        "📝 Slide 2: Form Input Data Operasional",
        "📊 Slide 3: Fitur Analytics & Visualisasi Laporan"
      ]
    },
    {
      title: "Video Editing & Media Campaign BEM",
      category: "Premiere / CapCut",
      type: "Tim",
      description: "Pengelolaan materi visual dan editan video publikasi acara fakultas sebagai Ketua Divisi Media.",
      slides: [
        "🎬 Slide 1: Cover / Thumbnail Video Publikasi",
        "✂️ Slide 2: Cuplikan Timeline Proses Editing",
        "📈 Slide 3: Hasil Engagement Feed / Reels Instagram"
      ]
    },
    {
      title: "Desain Grafis & Brand Identity",
      category: "Canva / Figma",
      type: "Mandiri",
      description: "Perancangan banner, poster acara, dan materi presentasi interaktif untuk kebutuhan organisasi.",
      slides: [
        "🎨 Slide 1: Poster Acara Utama FSRD/Fakultas",
        "📱 Slide 2: Design Template Story Instagram",
        "📑 Slide 3: Mockup Banner Digital Publikasi"
      ]
    }
  ];

  return (
    <div>
      <h2 style={{ color: '#ffffff', marginBottom: '10px' }}>🚀 Proyek, Desain & Karya Media</h2>
      <p style={{ color: '#94a3b8', marginBottom: '25px', fontSize: '0.95rem' }}>
        Klik pada kartu proyek untuk membuka preview slide dan detail galeri karya.
      </p>

      {/* Grid Kartu Proyek */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {projectList.map((item, idx) => (
          <div 
            key={idx} 
            className="card"
            onClick={() => setSelectedProject(item)}
            style={{ 
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s ease',
              border: '1px solid #2d2d3f',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#2d2d3f';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Sampul Singkat (1 Gambar/Placeholder Awal) */}
            <div style={{ 
              width: '100%', 
              height: '140px', 
              borderRadius: '8px', 
              backgroundColor: '#13141f', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#94a3b8',
              fontSize: '0.85rem',
              marginBottom: '15px',
              border: '1px dashed #334155',
              position: 'relative'
            }}>
              <span>{item.slides[0]}</span>

              {/* Tag Melayang Klik Preview */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(13, 14, 21, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                opacity: 0,
                transition: 'opacity 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
              >
                🔍 Klik untuk Slide Detail
              </div>
            </div>

            {/* Badge Tipe & Kategori */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', padding: '3px 10px', background: '#3b82f6', color: '#fff', borderRadius: '12px', fontWeight: 'bold' }}>
                {item.type}
              </span>
              <span style={{ fontSize: '0.75rem', padding: '3px 10px', background: '#2d2d3f', color: '#94a3b8', borderRadius: '12px' }}>
                {item.category}
              </span>
            </div>

            <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5' }}>{item.description}</p>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/* POPUP MODAL (HANYA MUNCUL SAAT CARD DIKLIK - UKURAN SETENGAH LAYAR) */}
      {/* ============================================================ */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)} // Klik di luar modal untuk menutup
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          {/* Box Modal Setengah Layar */}
          <div 
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat area dalam diklik
            style={{
              backgroundColor: '#1e1e2f',
              borderRadius: '16px',
              padding: '25px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              border: '1px solid #3b82f6',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            {/* Header Modal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', padding: '3px 10px', background: '#3b82f6', color: '#fff', borderRadius: '12px', fontWeight: 'bold', marginRight: '8px' }}>
                  {selectedProject.type}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{selectedProject.category}</span>
              </div>
              
              {/* Tombol Close */}
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  background: '#2d2d3f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ✕
              </button>
            </div>

            <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.4rem' }}>{selectedProject.title}</h2>

            {/* Slider 3 Slide Dalam Modal */}
            <ImageSlider slides={selectedProject.slides} />

            <h4 style={{ color: '#60a5fa', marginBottom: '5px' }}>Deskripsi Lengkap Proyek:</h4>
            <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {selectedProject.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}