export default function Navbar() {
  return (
    <nav style={{ padding: '20px', background: '#0d0e15', position: 'sticky', top: 0, borderBottom: '1px solid #2d2d3f' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#fff' }}>ASYL</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#pengalaman" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Pengalaman</a>
          <a href="#organisasi" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Organisasi</a>
          <a href="#kontak" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Kontak</a>
        </div>
      </div>
    </nav>
  );
}