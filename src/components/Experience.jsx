import React from 'react';

export default function Experience() {
  return (
    <div>
      <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>Praktik Kerja Lapangan</h2>
      
      {/* Card 1 */}
      <div className="card">
        <h3>PT Akebono Brake Astra Indonesia</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>
          Praktik Kerja Lapangan • 3 Bulan (2023)
        </p>
        <p>
          Berkontribusi pada proyek digitalisasi sistem internal dan pengelolaan data operasional. 
          Mempelajari standar kerja industri manufaktur modern dengan kolaborasi antar tim.
        </p>
        <a href="/sertifikat-akebono.pdf" target="_blank" rel="noreferrer" className="btn">
          📄 Lihat Sertifikat
        </a>
      </div>
      
      {/* Card 2 */}
      <div className="card">
        <h3>PT Toa Galva Industries</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>
          Praktik Kerja Lapangan • 3 Bulan (2023)
        </p>
        <p>
          Berkontribusi pada proyek digitalisasi sistem internal dan pengelolaan data operasional. 
          Mempelajari standar kerja industri manufaktur modern dengan kolaborasi antar tim.
        </p>
        <a href="/sertifikat-toa.pdf" target="_blank" rel="noreferrer" className="btn">
          📄 Lihat Sertifikat
        </a>
      </div>
    </div>
  );
}