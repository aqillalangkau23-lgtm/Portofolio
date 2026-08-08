import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const roles = ["Frontend Developer", "UI/UX Designer", "Creative Media Head"];
  const [currentRole, setCurrentRole] = useState(0);

  // State Fitur Interaktif Lanyard Physics & Hologram
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [copiedToast, setCopiedToast] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  // State Real Web Audio Synth Player
  const [isPlaying, setIsPlaying] = useState(true);
  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);

  // Role Switcher Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Click Sound (Haptic Audio Feedback)
  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore if browser restricts audio
    }
  };

  // Real Web Audio Lo-Fi Generator
  const toggleAudio = () => {
    if (isPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      try {
        if (!audioCtxRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const ctx = new AudioContext();
          audioCtxRef.current = ctx;

          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const filterNode = ctx.createBiquadFilter();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(220, ctx.currentTime);

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(329.63, ctx.currentTime);

          filterNode.type = 'lowpass';
          filterNode.frequency.setValueAtTime(450, ctx.currentTime);

          gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

          osc1.connect(filterNode);
          osc2.connect(filterNode);
          filterNode.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc1.start();
          osc2.start();

          osc1Ref.current = osc1;
          osc2Ref.current = osc2;
        } else {
          audioCtxRef.current.resume();
        }
        setIsPlaying(true);
      } catch (err) {
        console.error("Audio error:", err);
      }
    }
  };

  // ----------------------------------------------------
  // REALISTIC PENDULUM SPRING PHYSICS ANIMATION LOOP
  // ----------------------------------------------------
  useEffect(() => {
    if (isDragging) return;

    let currentX = dragOffset.x;
    let currentY = dragOffset.y;
    let vx = velocity.x;
    let vy = velocity.y;

    const springK = 0.08;
    const damp = 0.82;

    const updatePhysics = () => {
      const ax = -springK * currentX;
      const ay = -springK * currentY;

      vx = (vx + ax) * damp;
      vy = (vy + ay) * damp;

      currentX += vx;
      currentY += vy;

      setDragOffset({ x: currentX, y: currentY });
      setVelocity({ x: vx, y: vy });

      if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1 || Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      } else {
        setDragOffset({ x: 0, y: 0 });
        setVelocity({ x: 0, y: 0 });
      }
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging]);

  // Handler Mouse / Touch Drag Lanyard
  const handleMouseDown = (e) => {
    setIsDragging(true);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX - dragOffset.x, y: clientY - dragOffset.y };
    lastPos.current = { x: clientX, y: clientY };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const newX = clientX - startPos.current.x;
      const newY = clientY - startPos.current.y;

      const vx = clientX - lastPos.current.x;
      const vy = clientY - lastPos.current.y;
      lastPos.current = { x: clientX, y: clientY };

      setDragOffset({
        x: Math.max(-150, Math.min(150, newX)),
        y: Math.max(-20, Math.min(180, newY))
      });
      setVelocity({ x: vx, y: vy });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        playClickSound();
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  // 3D Card Holographic Mouse Tracking
  const handleCardMouseMove = (e) => {
    if (isDragging) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = -((y - centerY) / centerY) * 18;
    const ry = ((x - centerX) / centerX) * 18;

    setTilt({ rx, ry });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35
    });
  };

  const handleCardMouseLeave = () => {
    if (!isDragging) {
      setTilt({ rx: 0, ry: 0 });
      setGlare({ x: 50, y: 50, opacity: 0 });
    }
  };

  const copyIdNumber = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText("2026-INFORMATIKA");
    playClickSound();
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pendulumAngle = dragOffset.x * 0.18 + velocity.x * 0.4;

  return (
    // ✅ Uses .hero-section CSS class — responsive via @media in App.css
    <section className="hero-section">

      {/* 🌌 SOFT AMBIENT GLOW BACKGROUND */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-2%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, var(--accent-glow, rgba(59, 130, 246, 0.12)) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(100px)'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '0%',
        right: '2%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(100px)'
      }} />

      {/* ======================================================
          📦 SISI KIRI: TEKS INFORMASI
          Uses .hero-text-col for responsive order/alignment
          ====================================================== */}
      <div className="hero-text-col">

        {/* Badge Status */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#4ade80',
          marginBottom: '20px'
        }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }} />
          Terbuka untuk Kolaborasi & Proyek
        </div>

        <p style={{ color: 'var(--accent-secondary, #60a5fa)', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', fontSize: '0.85rem', margin: '0 0 8px 0' }}>
          — S1 INFORMATIKA
        </p>

        {/* ✅ NAMA — uses .hero-title for responsive font-size */}
        <h1 className="hero-title">
          Aqilla Sofia<br />Yaqutah Langkau
        </h1>

        <h3 style={{ fontSize: '1.15rem', color: '#cbd5e1', fontWeight: '500', marginBottom: '16px' }}>
          Saya seorang <span style={{ color: 'var(--accent-secondary, #60a5fa)', fontWeight: '700', borderBottom: '2px dashed var(--accent-primary, #3b82f6)' }}>{roles[currentRole]}</span>
        </h3>

        <p style={{ fontSize: '0.93rem', color: '#94a3b8', marginBottom: '28px', lineHeight: '1.7', maxWidth: '560px' }}>
          Halo! Saya Aqilla, mahasiswi Teknik Informatika Universitas Esa Unggul. Memiliki ketertarikan mendalam pada pengembangan antarmuka web, perancangan desain visual, <i>video editing</i>, dan pembuatan konten media yang interaktif.
        </p>

        {/* Tombol Action */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <a
            href="#tentang-saya"
            onClick={(e) => scrollToSection(e, 'tentang-saya')}
            style={{
              textDecoration: 'none',
              background: 'linear-gradient(135deg, var(--accent-primary, #3b82f6) 0%, #2563eb 100%)',
              color: '#ffffff',
              padding: '11px 24px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.88rem',
              boxShadow: '0 10px 20px var(--accent-glow, rgba(59, 130, 246, 0.3))',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Lihat Portofolio ↓
          </a>

          <a
            href="https://wa.me/6285813462446"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              background: 'rgba(24, 25, 38, 0.8)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '11px 24px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.88rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease'
            }}
          >
            💬 Hubungi Saya
          </a>
        </div>

        {/* ✅ BENTO GRID — uses .hero-bento-grid for responsive columns */}
        <div className="hero-bento-grid">
          <div className="glass-card" style={{ padding: '14px 12px' }}>
            <h4 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px 0' }}>2+</h4>
            <p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0, fontWeight: '500' }}>Pengalaman Industri</p>
          </div>

          <div className="glass-card" style={{ padding: '14px 12px' }}>
            <h4 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px 0' }}>BEM</h4>
            <p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0, fontWeight: '500' }}>Divisi Media & Komtek</p>
          </div>

          <div className="glass-card" style={{ padding: '14px 12px' }}>
            <h4 style={{ color: 'var(--accent-secondary, #60a5fa)', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px 0' }}>React</h4>
            <p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0, fontWeight: '500' }}>Core Specialization</p>
          </div>
        </div>

        {/* ✅ VIBE MUSIC WIDGET — uses .hero-music-widget for responsive width */}
        <div className="hero-music-widget">
          <button
            id="music-toggle-btn"
            onClick={toggleAudio}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--accent-primary, #3b82f6)',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px var(--accent-glow, rgba(59, 130, 246, 0.4))',
              fontSize: '0.85rem',
              flexShrink: 0
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 'bold', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Coding & Designing Vibe 🎧
            </p>
            <p style={{ margin: 0, fontSize: '0.73rem', color: '#94a3b8' }}>
              {isPlaying ? 'Currently playing: Focus Mode' : 'Paused'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '18px', flexShrink: 0 }}>
            {[14, 22, 10, 18, 24, 12].map((height, i) => (
              <span
                key={i}
                style={{
                  width: '3px',
                  height: isPlaying ? `${height}px` : '4px',
                  backgroundColor: 'var(--accent-secondary, #3b82f6)',
                  borderRadius: '3px',
                  transition: 'height 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

      </div>
      {/* END LEFT COLUMN */}

      {/* ======================================================
          🪪 SISI KANAN: LANYARD PHYSICS & HOLOGRAPHIC BADGE
          Uses .hero-lanyard-col for responsive order/margin
          ====================================================== */}
      <div className="hero-lanyard-col">

        {/* PETUNJUK TEKS */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          color: 'rgba(148, 163, 184, 0.65)',
          fontSize: '0.65rem',
          fontWeight: '700',
          letterSpacing: '2px',
          pointerEvents: 'none',
          animation: 'floatAnim 3s infinite ease-in-out'
        }}>
          ↓ GRAB & SWING ↓
        </div>

        {/* ✅ DYNAMIC FLEXING SVG LANYARD STRAP RIBBON — uses .hero-lanyard-svg */}
        <svg className="hero-lanyard-svg">
          <defs>
            <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="var(--accent-primary, #3b82f6)" />
            </linearGradient>
          </defs>
          {/* Left Ribbon Strand — uses relative % of SVG width (~136/300 ≈ 45%) */}
          <path
            d={`M 136 0 Q ${136 + dragOffset.x * 0.5} ${70 + dragOffset.y * 0.5}, ${142 + dragOffset.x} ${135 + dragOffset.y}`}
            fill="none"
            stroke="url(#strapGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Right Ribbon Strand */}
          <path
            d={`M 164 0 Q ${164 + dragOffset.x * 0.5} ${70 + dragOffset.y * 0.5}, ${158 + dragOffset.x} ${135 + dragOffset.y}`}
            fill="none"
            stroke="url(#strapGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>

        {/* KAIT METAL PENDULUM CLIP */}
        <div style={{
          position: 'absolute',
          top: '125px',
          width: '34px',
          height: '24px',
          border: '3px solid #cbd5e1',
          borderRadius: '6px',
          backgroundColor: '#475569',
          zIndex: 4,
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${pendulumAngle}deg)`,
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          transition: isDragging ? 'none' : 'transform 0.05s ease-out'
        }} />

        {/* ✅ WADAH ID CARD — uses .hero-id-card-wrapper for responsive width/height */}
        <div
          className="hero-id-card-wrapper"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          onClick={() => {
            if (Math.abs(dragOffset.x) < 6 && Math.abs(dragOffset.y) < 6) {
              setIsFlipped(!isFlipped);
              playClickSound();
            }
          }}
          style={{
            backgroundColor: '#181926',
            borderRadius: '22px',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: isDragging
              ? '0 30px 60px var(--accent-glow, rgba(59, 130, 246, 0.5))'
              : '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 30px var(--accent-glow, rgba(59, 130, 246, 0.25))',
            padding: '14px',
            cursor: isDragging ? 'grabbing' : 'grab',
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${pendulumAngle}deg) perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry + (isFlipped ? 180 : 0)}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out, box-shadow 0.3s ease',
            transformStyle: 'preserve-3d',
            overflow: 'hidden',
            zIndex: 3,
            touchAction: 'none',
          }}
        >
          {/* HOLOGRAPHIC FOIL GLARE OVERLAY */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, rgba(96,165,250,0.12) 35%, transparent 70%)`,
            opacity: glare.opacity,
            pointerEvents: 'none',
            zIndex: 10,
            transition: 'opacity 0.3s'
          }} />

          <div style={{ position: 'absolute', inset: '8px', border: '1px dashed rgba(255, 255, 255, 0.15)', borderRadius: '16px', pointerEvents: 'none' }} />
          <div style={{ width: '40px', height: '9px', backgroundColor: '#0d0e15', borderRadius: '10px', margin: '0 auto 10px auto' }} />

          {/* SISI DEPAN CARD */}
          <div style={{
            backfaceVisibility: 'hidden',
            width: '100%',
            height: 'calc(100% - 25px)',
            backgroundColor: '#1e1e2f',
            borderRadius: '14px',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            padding: '14px 12px',
            display: isFlipped ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: '800', color: 'var(--accent-secondary, #60a5fa)', letterSpacing: '0.4px' }}>UNIVERSITAS ESA UNGGUL</span>
              <span style={{ fontSize: '0.6rem', fontWeight: '700', color: '#64748b' }}>2026</span>
            </div>

            <div style={{ width: '130px', height: '148px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--accent-primary, #3b82f6)', marginBottom: '10px', backgroundColor: '#13141f' }}>
              <img
                src="/foto-aqila.jpg"
                alt="Aqilla Sofia"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/130x148/1e1e2f/ffffff?text=Foto+Aqilla'; }}
              />
            </div>

            <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 2px 0', fontWeight: 'bold' }}>Aqilla Sofia Y. L.</h4>

            <p
              onClick={copyIdNumber}
              title="Klik untuk salin ID"
              style={{ color: 'var(--accent-secondary, #60a5fa)', fontSize: '0.72rem', fontWeight: '600', margin: '0 0 8px 0', cursor: 'pointer' }}
            >
              {copiedToast ? '✓ Copied!' : 'ID: 2026-INFORMATIKA'}
            </p>

            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.68rem', color: '#cbd5e1', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              UI/UX & FRONTEND DEV
            </div>

            <div style={{ marginTop: 'auto', width: '85%', height: '10px', background: 'repeating-linear-gradient(90deg, #94a3b8, #94a3b8 2px, transparent 2px, transparent 4px)', opacity: 0.5 }} />
          </div>

          {/* SISI BELAKANG CARD */}
          <div style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            width: '100%',
            height: 'calc(100% - 25px)',
            backgroundColor: '#13141f',
            borderRadius: '14px',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            padding: '18px 14px',
            display: isFlipped ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎓</div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '6px' }}>Teknik & Informatika</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.76rem', lineHeight: '1.4', marginBottom: '14px' }}>
              "Membangun antarmuka web yang estetis, fungsional, dan memberikan solusi visual terbaik."
            </p>

            <div style={{ width: '76px', height: '76px', background: '#fff', padding: '6px', borderRadius: '8px', marginBottom: '10px' }}>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/6285813462446"
                alt="QR WhatsApp"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: 'var(--accent-secondary, #60a5fa)', fontSize: '0.68rem', fontWeight: 'bold', margin: 0 }}>SCAN FOR CONTACT</p>
          </div>

        </div>
        {/* END ID CARD */}

      </div>
      {/* END RIGHT COLUMN */}

    </section>
  );
}