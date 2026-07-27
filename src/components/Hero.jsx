import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const roles = ["Frontend Developer", "UI/UX Designer", "Creative Media Head"];
  const [currentRole, setCurrentRole] = useState(0);

  // State Fitur Interaktif (Drag & Flip 3D)
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  // State Audio Player Sederhana
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Handler Dragging Lanyard
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newX = e.clientX - startPos.current.x;
      const newY = e.clientY - startPos.current.y;
      
      setDragOffset({
        x: Math.max(-200, Math.min(200, newX)),
        y: Math.max(-30, Math.min(300, newY))
      });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragOffset({ x: 0, y: 0 });
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section 
      style={{ 
        paddingTop: '40px', 
        paddingBottom: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px',
        flexWrap: 'wrap',
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '20px',
        paddingRight: '20px',
        userSelect: 'none'
      }}
    >
      {/* 🌌 BACKGROUND GLOW SOFT */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(60px)'
      }}></div>

      {/* SISI KIRI: TEKS INFORMASI + INTERACTIVE AUDIO CARD */}
      <div style={{ flex: '1 1 480px', maxWidth: '580px', zIndex: 2 }}>
        
        {/* Badge Status */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '0.82rem',
          color: '#60a5fa',
          marginBottom: '18px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            boxShadow: '0 0 8px #22c55e'
          }}></span>
          Terbuka untuk Kolaborasi & Proyek
        </div>

        <p style={{ color: '#3b82f6', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
          — S1 INFORMATIKA
        </p>

        <h1 style={{ fontSize: '3rem', color: '#ffffff', lineHeight: '1.18', margin: '12px 0', fontWeight: '800' }}>
          Aqilla Sofia Yaqutah Langkau
        </h1>

        <h3 style={{ fontSize: '1.3rem', color: '#94a3b8', fontWeight: '500', marginBottom: '20px' }}>
          Saya seorang <span style={{ color: '#60a5fa', borderBottom: '2px solid #3b82f6' }}>{roles[currentRole]}</span>
        </h3>

        <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '30px', lineHeight: '1.6' }}>
          Halo! Saya Aqilla Sofia Yaqutah Langkau, mahasiswi Teknik Informatika Universitas Esa Unggul. 
          Memiliki ketertarikan mendalam pada pengembangan antarmuka web, perancangan desain visual, 
          video editing, dan pembuatan konten media yang menarik.
        </p>

        {/* Tombol Utama */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '35px' }}>
          <a href="#tentang-saya" className="btn">Lihat Portofolio ↓</a>
          <a href="#kontak" className="btn" style={{ background: 'transparent', border: '1px solid #3b82f6' }}>Hubungi Saya</a>
        </div>

        {/* PENGGANTI STATS/TERMINAL: VIBE MUSIC WIDGET (RAPI & ESTETIK) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          padding: '12px 18px',
          background: 'rgba(24, 25, 38, 0.7)',
          border: '1px solid #2d2d3f',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          maxWidth: '420px'
        }}>
          {/* Cover & Tombol Play */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#3b82f6',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
              fontSize: '0.9rem'
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Info Music / Coding Vibe */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 'bold', color: '#ffffff' }}>
              Coding & Designing Vibe 🎧
            </p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>
              {isPlaying ? 'Currently playing: Focus Mode' : 'Paused'}
            </p>
          </div>

          {/* Animasi Soundwave */}
          <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '18px' }}>
            {[14, 22, 10, 18, 24, 12].map((height, i) => (
              <span
                key={i}
                style={{
                  width: '3px',
                  height: isPlaying ? `${height}px` : '4px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '3px',
                  transition: 'height 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* SISI KANAN: LANYARD INTERAKTIF (BERSIH TANPA BADGE BERANTAKAN) */}
      <div style={{ 
        flex: '0 0 auto', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '60px',
        zIndex: 2
      }}>

        {/* 1. TALI LANYARD ELASTIS */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          width: '32px',
          height: `${140 + dragOffset.y}px`,
          background: 'linear-gradient(180deg, #1d4ed8 0%, #3b82f6 100%)',
          borderRadius: '4px',
          zIndex: 1,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          borderLeft: '1px solid rgba(255,255,255,0.2)',
          borderRight: '1px solid rgba(255,255,255,0.2)',
          transform: `rotate(${dragOffset.x * 0.08}deg)`,
          transformOrigin: 'top center',
          transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <span style={{ writingMode: 'vertical-rl', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '3px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 'bold', paddingTop: '10px' }}>
            INFORMATIKA • BEM MEDIA
          </span>
        </div>

        {/* Petunjuk Interaktif */}
        <div style={{
          position: 'absolute',
          top: '20px',
          color: '#60a5fa',
          fontSize: '0.72rem',
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          zIndex: 6,
          pointerEvents: 'none',
          background: 'rgba(13, 14, 21, 0.85)',
          padding: '3px 10px',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          🖱️ Tarik / Klik Card
        </div>

        {/* 2. KAIT METAL */}
        <div style={{
          position: 'absolute',
          top: '50px',
          width: '36px',
          height: '24px',
          border: '3px solid #cbd5e1',
          borderRadius: '6px',
          backgroundColor: '#64748b',
          zIndex: 4,
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.08}deg)`,
          transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}></div>

        {/* 3. WADAH ID CARD */}
        <div 
          onMouseDown={handleMouseDown}
          onClick={() => {
            if (Math.abs(dragOffset.x) < 5 && Math.abs(dragOffset.y) < 5) {
              setIsFlipped(!isFlipped);
            }
          }}
          style={{
            position: 'relative',
            width: '290px',
            height: '400px',
            backgroundColor: '#181926',
            borderRadius: '22px',
            border: '2px solid #2d2d3f',
            boxShadow: isDragging 
              ? '0 35px 70px rgba(59, 130, 246, 0.5)' 
              : '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(59, 130, 246, 0.2)',
            padding: '16px',
            cursor: isDragging ? 'grabbing' : 'grab',
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.08}deg) ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}`,
            transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
            transformStyle: 'preserve-3d',
            zIndex: 3
          }}
        >
          <div style={{ position: 'absolute', inset: '8px', border: '1px dashed rgba(255, 255, 255, 0.15)', borderRadius: '16px', pointerEvents: 'none' }}></div>
          <div style={{ width: '40px', height: '9px', backgroundColor: '#0d0e15', borderRadius: '10px', margin: '0 auto 12px auto' }}></div>

          {/* SISI DEPAN */}
          <div style={{
            backfaceVisibility: 'hidden',
            width: '100%',
            height: 'calc(100% - 25px)',
            backgroundColor: '#1e1e2f',
            borderRadius: '14px',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            padding: '15px 12px',
            display: isFlipped ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ width: '150px', height: '170px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #3b82f6', marginBottom: '12px', backgroundColor: '#13141f' }}>
              <img 
                src="/foto-profil.jpg" 
                alt="Aqilla Sofia" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150x170/1e1e2f/ffffff?text=Foto+Aqilla'; }}
              />
            </div>

            <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 2px 0', fontWeight: 'bold' }}>Aqilla Sofia Y. L.</h4>
            <p style={{ color: '#60a5fa', fontSize: '0.78rem', fontWeight: '600', margin: '0 0 8px 0' }}>ID: 2026-INFORMATIKA</p>
            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', color: '#cbd5e1', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              UI/UX & FRONTEND DEV
            </div>
            
            <div style={{ marginTop: 'auto', width: '85%', height: '12px', background: 'repeating-linear-gradient(90deg, #94a3b8, #94a3b8 2px, transparent 2px, transparent 4px)', opacity: 0.5 }}></div>
          </div>

          {/* SISI BELAKANG */}
          <div style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            width: '100%',
            height: 'calc(100% - 25px)',
            backgroundColor: '#13141f',
            borderRadius: '14px',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            padding: '20px 15px',
            display: isFlipped ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎓</div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '6px' }}>Teknik & Informatika</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.78rem', lineHeight: '1.4', marginBottom: '15px' }}>
              "Membangun antarmuka web yang estetis, fungsional, dan memberikan solusi visual terbaik."
            </p>

            <div style={{ width: '80px', height: '80px', background: '#fff', padding: '6px', borderRadius: '8px', marginBottom: '10px' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://github.com" alt="QR" style={{ width: '100%', height: '100%' }} />
            </div>
            <p style={{ color: '#60a5fa', fontSize: '0.7rem', fontWeight: 'bold' }}>SCAN FOR CONTACT</p>
          </div>

        </div>

      </div>
    </section>
  );
}