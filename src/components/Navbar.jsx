import React from 'react';

export default function Navbar({ onOpenPalette }) {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      backgroundColor: 'rgba(10, 11, 16, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        
        {/* LOGO ASYL DENGAN AKSEN MODERN */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-primary, #3b82f6) 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '0.95rem',
            boxShadow: '0 0 15px var(--accent-glow, rgba(59, 130, 246, 0.4))'
          }}>
            A
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.5px' }}>
              ASYL<span style={{ color: 'var(--accent-secondary, #60a5fa)' }}>.</span>
            </span>
            <span style={{ 
              display: 'block', 
              fontSize: '0.65rem', 
              color: '#64748b', 
              fontWeight: '600', 
              letterSpacing: '1px',
              marginTop: '-2px'
            }}>
              PORTFOLIO 2026
            </span>
          </div>
        </a>

        {/* MENU NAVIGASI KANAN (STANDAR KELAS 1280px MODERN) */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {/* Quick Palette Trigger */}
          <button
            onClick={() => onOpenPalette(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '6px 12px',
              borderRadius: '10px',
              color: '#cbd5e1',
              fontSize: '0.8rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-secondary, #60a5fa)';
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <span>🔍 Cari...</span>
            <kbd style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              padding: '1px 5px',
              fontSize: '0.65rem',
              color: '#94a3b8'
            }}>Ctrl K</kbd>
          </button>

          <a 
            href="#tentang-saya" 
            onClick={(e) => scrollToSection(e, 'tentang-saya')}
            style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '500', transition: 'all 0.2s' }}
          >
            Pengalaman
          </a>
          <a 
            href="#tentang-saya" 
            onClick={(e) => scrollToSection(e, 'tentang-saya')}
            style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '500', transition: 'all 0.2s' }}
          >
            Organisasi
          </a>
          <a 
            href="https://wa.me/6285813462446" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#ffffff', 
              textDecoration: 'none', 
              fontSize: '0.85rem', 
              fontWeight: '700', 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
              border: '1px solid rgba(96, 165, 250, 0.4)', 
              padding: '8px 20px', 
              borderRadius: '12px',
              boxShadow: '0 0 15px var(--accent-glow, rgba(59, 130, 246, 0.15))'
            }}
          >
            Kontak 💬
          </a>
        </div>

      </div>
    </header>
  );
}