import React, { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'aqillalangkau23@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    {
      name: 'Email',
      handle: 'aqillalangkau23@gmail.com',
      url: `mailto:${emailAddress}`,
      brandColor: 'var(--accent-primary, #3b82f6)',
      icon: '✉️'
    },
    {
      name: 'LinkedIn',
      handle: 'Aqilla Sofia',
      url: 'https://www.linkedin.com/in/aqillasofia23/',
      brandColor: '#0a66c2',
      icon: '💼'
    },
    {
      name: 'GitHub',
      handle: 'aqillalangkau23-lgtm',
      url: 'https://github.com/aqillalangkau23-lgtm',
      brandColor: '#a855f7',
      icon: '💻'
    },
    {
      name: 'WhatsApp',
      handle: 'Chat Direct WhatsApp',
      url: 'https://wa.me/6285813462446',
      brandColor: '#22c55e',
      icon: '💬'
    },
    {
      name: 'Instagram',
      handle: '@aqillasofia.yl',
      url: 'https://www.instagram.com/aqillasofia.yl?igsh=ODJ3dXY4Z3R5Znpk&utm_source=qr',
      brandColor: '#e1306c',
      icon: '📷'
    },
    {
      name: 'TikTok',
      handle: '@qillaasyl',
      url: 'https://www.tiktok.com/@qillaasyl',
      brandColor: '#00f2fe',
      icon: '🎵'
    }
  ];

  return (
    <div id="kontak-section" style={{
      position: 'relative',
      marginTop: '40px',
      padding: '20px 0'
    }}>
      
      {/* AMBIENT BACKGROUND GLOW */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '70%',
        background: 'radial-gradient(circle, var(--accent-glow, rgba(59, 130, 246, 0.18)) 0%, rgba(168, 85, 247, 0.12) 50%, transparent 80%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="glass-card" style={{
        padding: '36px 24px',
        maxWidth: '1140px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        
        <span style={{ 
          fontSize: '0.78rem', 
          fontWeight: 'bold', 
          letterSpacing: '1.5px', 
          color: 'var(--accent-secondary, #60a5fa)', 
          textTransform: 'uppercase',
          background: 'rgba(59, 130, 246, 0.12)',
          padding: '6px 16px',
          borderRadius: '20px',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          📬 MARI BEKERJA SAMA
        </span>

        <h2 style={{ fontSize: '2.4rem', color: '#ffffff', marginTop: '16px', marginBottom: '12px', fontWeight: '900', letterSpacing: '-0.5px' }}>
          Hubungi & Konek Dengan Saya
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '0.96rem', maxWidth: '560px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
          Tertarik untuk berkolaborasi dalam pengembangan antarmuka web, perancangan desain visual, maupun pengelolaan konten media? Jangan ragu untuk terhubung!
        </p>

        {/* EMAIL COPY QUICK BUTTON */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '36px', background: 'rgba(15, 16, 25, 0.8)', padding: '10px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: '600' }}>✉️ {emailAddress}</span>
          <button
            onClick={handleCopyEmail}
            style={{
              background: copied ? '#22c55e' : 'var(--accent-primary, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {copied ? '✓ Salin!' : 'Salin Email'}
          </button>
        </div>

        {/* SOCIAL LINKS GRID (SEJAJAR HORISONTAL / LANDSCAPE ALL 6 IN 1 ROW) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          alignItems: 'stretch'
        }}>
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                background: 'rgba(24, 25, 38, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '16px 10px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                wordBreak: 'break-word',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.brandColor;
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 10px 20px ${item.brandColor}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{item.name}</span>
              <span style={{ color: '#64748b', fontSize: '0.68rem', textAlign: 'center', wordBreak: 'break-all' }}>{item.handle}</span>
            </a>
          ))}
        </div>

        {/* FOOTER COPYRIGHT */}
        <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', color: '#64748b', fontSize: '0.78rem' }}>
          © 2026 Aqilla Sofia Yaqutah Langkau • Built with React & Vite
        </div>

      </div>
    </div>
  );
}