// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Organization from './components/Organization';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Experience />
      <Organization />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;