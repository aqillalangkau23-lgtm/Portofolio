import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Contact from './components/Contact';
import InteractiveBackground from './components/InteractiveBackground';
import './App.css';

function App() {
  // State Utama Warna Aksen Tema (Default: Violet Galaxy)
  const [activeColor, setActiveColor] = useState('#8b5cf6');

  // Handler untuk mengubah warna aksen di seluruh website secara global
  const handleColorChange = (hexColor, glowColor) => {
    setActiveColor(hexColor);
    document.documentElement.style.setProperty('--accent-primary', hexColor);
    document.documentElement.style.setProperty('--accent-secondary', hexColor);
    document.documentElement.style.setProperty('--accent-glow', glowColor || `${hexColor}35`);
  };

  // Set default CSS Variables saat website pertama kali dibuka
  useEffect(() => {
    handleColorChange('#8b5cf6', 'rgba(139, 92, 246, 0.35)');
  }, []);

  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh', 
      color: '#ffffff',
      overflowX: 'hidden'
    }}>
      {/* 1. Latar Belakang Partikel & Spotlight Kursor Interaktif */}
      <InteractiveBackground />

      {/* 2. Navigation Bar (Terhubung dengan Pemilih Warna) */}
      <Navbar activeColor={activeColor} onChangeColor={handleColorChange} />

      {/* 3. Hero Section (3D Holographic Lanyard & Real Synth Audio Vibe) */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />

        {/* 4. Section Tentang Saya & Modal Carousel Karya */}
        <AboutSection />

        {/* 5. Section Kontak & Social Links (Footer) */}
        <div style={{ width: '100%', margin: '0 auto', padding: '0 4% 60px 4%', boxSizing: 'border-box' }}>
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;