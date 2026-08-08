import React, { useState } from 'react';

export default function Navbar({ activeColor = '#8b5cf6', onChangeColor }) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Palet Warna Elegan, Mewah & Modern
  const colorThemes = [
    { id: 'galaxy', name: 'Violet Galaxy', hex: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.35)' },
    { id: 'pink', name: 'Cyber Pink', hex: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)' },
    { id: 'white', name: 'Platinum White', hex: '#f8fafc', glow: 'rgba(248, 250, 252, 0.35)' },
    { id: 'emerald', name: 'Deep Emerald', hex: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' },
    { id: 'gold', name: 'Champagne Gold', hex: '#f59e0b', glow: 'rgba(245, 158, 11, 0.35)' }
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTheme = (theme) => {
    if (typeof onChangeColor === 'function') {
      onChangeColor(theme.hex, theme.glow);
    } else {
      // Fallback langsung mengubah CSS Variable jika props onChangeColor belum terhubung
      document.documentElement.style.setProperty('--accent-primary', theme.hex);
      document.documentElement.style.setProperty('--accent-secondary', theme.hex);
      document.documentElement.style.setProperty('--accent-glow', theme.glow);
    }
    setShowColorPicker(false);
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
            background: `linear-gradient(135deg, ${activeColor} 0%, #a855f7 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '0.95rem',
            boxShadow: `0 0 15px ${activeColor}60`,
            transition: 'all 0.3s ease'
          }}>
            A
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.5px' }}>
              ASYL<span style={{ color: activeColor, transition: 'color 0.3s ease' }}>.</span>
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

        {/* MENU NAVIGASI KANAN */}
        <div className="navbar-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          
          {/* TOMBOL PINTU MASUK GANTI WARNA TEMA */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${activeColor}80`,
                padding: '7px 14px',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: `0 0 12px ${activeColor}30`
              }}
            >
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: activeColor,
                boxShadow: `0 0 8px ${activeColor}`
              }} />
              <span>Tema Warna</span>
            </button>

            {/* FLOATING DROPDOWN PILIHAN WARNA */}
            {showColorPicker && (
              <div style={{
                position: 'absolute',
                top: '125%',
                right: 0,
                backgroundColor: '#13141f',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '14px',
                width: '210px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)',
                zIndex: 101,
                textAlign: 'left'
              }}>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.68rem', 
                  fontWeight: '800', 
                  textTransform: 'uppercase', 
                  margin: '0 0 10px 0', 
                  letterSpacing: '1px' 
                }}>
                  Pilih Warna Aksen
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleSelectTheme(theme)}
                      style={{
                        background: activeColor === theme.hex ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                        border: `1px solid ${activeColor === theme.hex ? theme.hex : 'transparent'}`,
                        borderRadius: '10px',
                        padding: '8px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: theme.hex,
                          boxShadow: `0 0 8px ${theme.hex}`
                        }} />
                        <span style={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: '600' }}>
                          {theme.name}
                        </span>
                      </div>
                      {activeColor === theme.hex && (
                        <span style={{ color: theme.hex, fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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
              background: `linear-gradient(135deg, ${activeColor}30 0%, rgba(168, 85, 247, 0.2) 100%)`,
              border: `1px solid ${activeColor}60`, 
              padding: '8px 20px', 
              borderRadius: '12px',
              boxShadow: `0 0 15px ${activeColor}20`,
              transition: 'all 0.3s ease'
            }}
          >
            Kontak 💬
          </a>

        </div>

      </div>
    </header>
  );
}