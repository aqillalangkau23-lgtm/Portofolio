import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Contact from './components/Contact';
import InteractiveBackground from './components/InteractiveBackground';
import CommandPalette from './components/CommandPalette';
import './App.css';

function App() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh', 
      color: '#ffffff',
      overflowX: 'hidden'
    }}>
      {/* 1. Latar Belakang Partikel & Spotlight Kursor Interaktif */}
      <InteractiveBackground />

      {/* 2. Navigation Bar */}
      <Navbar onOpenPalette={setIsPaletteOpen} />

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

      {/* 6. Quick Command Palette (Ctrl + K) & Theme Color Selector */}
      <CommandPalette isOpen={isPaletteOpen} onClose={setIsPaletteOpen} />
    </div>
  );
}

export default App;
