import React, { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'aqillalangkau23@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: 'Email',
      handle: 'aqillalangkau23@gmail.com',
      url: `mailto:${emailAddress}`,
      brandColor: '#3b82f6',
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.5 4.5h21V19.5h-21V4.5zm2.25 2.25v.38l8.25 5.5 8.25-5.5v-.38H3.75zm0 2.7v7.8h16.5v-7.8l-8.25 5.5-8.25-5.5z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      handle: 'Aqilla Sofia',
      url: 'https://www.linkedin.com/in/aqillasofia23/',
      brandColor: '#0a66c2',
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.49 1.49 0 1 0 0 2.98 1.49 1.49 0 0 0 0-2.98z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      handle: 'aqillalangkau23-lgtm',
      url: 'https://github.com/aqillalangkau23-lgtm',
      brandColor: '#a855f7',
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      handle: 'Chat Direct WhatsApp',
      url: 'https://wa.me/6285813462446',
      brandColor: '#22c55e',
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      handle: '@aqillasofia.yl',
      url: 'https://www.instagram.com/aqillasofia.yl?igsh=ODJ3dXY4Z3R5Znpk&utm_source=qr',
      brandColor: '#e1306c',
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      handle: '@qillaasyl',
      url: 'https://www.tiktok.com/@qillaasyl',
      brandColor: '#00f2fe',
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.56-1.3 2.56.01.89.42 1.78 1.12 2.33.79.62 1.86.83 2.82.63.97-.19 1.83-.88 2.22-1.79.26-.6.38-1.27.37-1.93.02-4.92.01-9.85.01-14.77z"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{
      position: 'relative',
      marginTop: '60px',
      padding: '2px'
    }}>
      
      {/* AMBIENT BACKGROUND GLOW LIGHT */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '70%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(168, 85, 247, 0.12) 50%, transparent 80%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* MAIN GLASS CONTAINER */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(19, 20, 31, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '28px',
        padding: '50px 30px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        overflow: 'hidden'
      }}>

        {/* HEADER SECTION */}
        <div style={{ maxWidth: '650px', margin: '0 auto 40px auto' }}>
          
          {/* Live Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: '600',
            color: '#4ade80',
            marginBottom: '18px',
            boxShadow: '0 0 15px rgba(34, 197, 94, 0.15)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#22c55e',
              borderRadius: '50%',
              boxShadow: '0 0 10px #22c55e'
            }}></span>
            Terbuka untuk Diskusi & Kolaborasi Proyek
          </div>

          <h2 style={{ 
            fontSize: '2.4rem', 
            color: '#ffffff', 
            marginTop: '4px', 
            marginBottom: '14px',
            fontWeight: '800',
            lineHeight: '1.2',
            letterSpacing: '-0.5px'
          }}>
            Let's <span style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Connect</span>
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.65', margin: '0 0 25px 0' }}>
            Dari urusan logika kodingan sampai eksekusi media kreatif, aku selalu excited buat diajak kolaborasi. Punya ide yang mau direalisasikan? Sapa aku lewat link di bawah ya
          </p>

          {/* Quick Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            style={{
              background: copied ? '#22c55e' : 'rgba(30, 30, 47, 0.8)',
              border: copied ? '1px solid #22c55e' : '1px solid rgba(59, 130, 246, 0.4)',
              color: copied ? '#ffffff' : '#60a5fa',
              padding: '12px 26px',
              borderRadius: '14px',
              fontSize: '0.88rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: copied 
                ? '0 0 25px rgba(34, 197, 94, 0.4)' 
                : '0 4px 20px rgba(59, 130, 246, 0.15)',
              backdropFilter: 'blur(8px)'
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.background = '#3b82f6';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.background = 'rgba(30, 30, 47, 0.8)';
                e.currentTarget.style.color = '#60a5fa';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.15)';
              }
            }}
          >
            {copied ? '✅ Email Tersalin ke Clipboard!' : '✉️ Klik untuk Salin Email Direct'}
          </button>
        </div>

        {/* GRID SOSIAL MEDIA (SIMETRIS 3 KOLOM) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          maxWidth: '850px',
          margin: '0 auto'
        }}>
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                backgroundColor: 'rgba(24, 25, 38, 0.7)',
                borderRadius: '18px',
                color: '#94a3b8',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                textAlign: 'left',
                backdropFilter: 'blur(5px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.borderColor = item.brandColor;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(30, 31, 48, 0.9)';
                e.currentTarget.style.boxShadow = `0 12px 30px ${item.brandColor}33, inset 0 1px 0 rgba(255,255,255,0.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.backgroundColor = 'rgba(24, 25, 38, 0.7)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon Box */}
              <div style={{ 
                background: 'rgba(19, 20, 31, 0.8)', 
                padding: '11px', 
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>

              {/* Label Teks Dua Baris */}
              <div style={{ overflow: 'hidden' }}>
                <span style={{ fontSize: '0.98rem', fontWeight: 'bold', color: '#ffffff', display: 'block', marginBottom: '2px' }}>
                  {item.name}
                </span>
                <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {item.handle}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* FOOTER COPYRIGHT MINIMALIS */}
        <div style={{ 
          marginTop: '50px', 
          paddingTop: '20px', 
          borderTop: '1px solid rgba(255,255,255,0.06)',
          color: '#64748b',
          fontSize: '0.8rem'
        }}>
          © {new Date().getFullYear()} Aqilla Sofia Yaqutah Langkau. Designed & Built with React JS.
        </div>

      </div>

    </div>
  );
}