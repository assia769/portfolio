import Cursor from './components/ui/Cursor';
import ScrollReveal from './components/ui/ScrollReveal';
import Particles from './components/ui/Particles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Skills from './components/Skills';
import Contact from './components/Contact';

// Rose divider line
function Divider() {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(232,99,154,0.22), rgba(192,132,184,0.12), transparent)',
    }} />
  );
}

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollReveal />
      <Particles />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Certifications />
        <Divider />
        <Skills />
        <Divider />
        <Contact />
      </main>
    </>
  );
}