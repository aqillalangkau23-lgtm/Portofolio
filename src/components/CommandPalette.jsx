import React, { useState, useEffect } from 'react';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState('blue');
  const [soundFx, setSoundFx] = useState(true);

  const themes = [
    { id: 'blue', name: 'Cyber Blue', primary: '#3b82f6', secondary: '#60a5fa', glow: 'rgba(59, 130, 246, 0.4)' },
    { id: 'purple', name: 'Neon Purple', primary: '#a855f7', secondary: '#c084fc', glow: 'rgba(168, 85, 247, 0.4)' },
    { id: 'emerald', name: 'Emerald Mint', primary: '#10b981', secondary: '#34d399', glow: 'rgba(16, 185, 129, 0.4)' },
    { id: 'rose', name: 'Sunset Crimson', primary: '#f43f5e', secondary: '#fb7185', glow: 'rgba(244, 63, 94, 0.4)' }
  ];

  const menuItems = [
    { id: 'tentang-saya', title: '🚀 Section Pengalaman & Project', desc: 'Lihat karya BEM Media, Solo Exploration & Kolaborasi Tim' },
    { id: 'kontak-section', title: '💬 Section Kontak & Media Sosial', desc: 'Email, LinkedIn, GitHub, Instagram, WhatsApp' },
    { id: 'audio-player', title: '🎧 Toggle Music Vibe Player', desc: 'Mainkan / Matikan musik Lo-Fi Focus Mode' }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose((prev) => !prev);
      }
      if (e.key === 'Escape') {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const changeTheme = (t) => {
    setActiveTheme(t.id);
    document.documentElement.style.setProperty('--accent-primary', t.primary);
    document.documentElement.style.setProperty('--accent-secondary', t.secondary);
    document.documentElement.style.setProperty('--accent-glow', t.glow);
  };

  const handleSelect = (id) => {
    if (id === 'audio-player') {
      const btn = document.getElementById('music-toggle-btn');
      if (btn) btn.click();
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose(false);
  };

  if (!isOpen) return null;

  const filteredItems = menuItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={() => onClose(false)}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        backgroundColor: '#13141f',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(59, 130, 246, 0.25)',
        overflow: 'hidden',
        animation: 'fadeInScale 0.2s ease-out'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Search Bar Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          gap: '12px'
        }}>
          <span style={{ fontSize: '1.1rem', color: '#94a3b8' }}>🔍</span>
          <input
            type="text"
            placeholder="Cari navigasi, proyek, atau ubah tema... (Ctrl+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: '500'
            }}
          />
          <kbd style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            padding: '2px 8px',
            fontSize: '0.72rem',
            color: '#cbd5e1'
          }}>ESC</kbd>
        </div>

        {/* Theme Color Customizer Bar */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(20, 21, 33, 0.6)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>🎨 Warna Aksen Tema:</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t)}
                title={t.name}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: t.primary,
                  border: activeTheme === t.id ? '2px solid #ffffff' : 'none',
                  cursor: 'pointer',
                  boxShadow: activeTheme === t.id ? `0 0 10px ${t.glow}` : 'none',
                  transition: 'transform 0.2s',
                  transform: activeTheme === t.id ? 'scale(1.15)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Quick Menu Items */}
        <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.9rem' }}>{item.title}</div>
                <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{item.desc}</div>
              </div>
            ))
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
              Tidak menemukan hasil untuk "{query}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: '#0d0e15',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.72rem',
          color: '#64748b'
        }}>
          <span>Tip: Gunakan `Ctrl + K` kapan saja</span>
          <span>ASYL Portfolio 2026</span>
        </div>

      </div>
    </div>
  );
}
