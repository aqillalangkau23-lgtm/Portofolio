import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Contact from './components/Contact';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#0d0e15', 
      minHeight: '100vh', 
      color: '#ffffff',
      overflowX: 'hidden'
    }}>
      {/* 1. Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section (Lanyard 3D & Music Vibe Player) */}
      <Hero />

      {/* 3. Section Tentang Saya & 3 Kotak Interaktif Modal Karya */}
      <AboutSection />

      {/* 4. Section Kontak & Media Sosial (Footer) */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 10px 40px 10px' }}>
        <Contact />
      </main>
    </div>
  );
}

export default App;