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

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollReveal />
      <Particles />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
        <About />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
        <Experience />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
        <Projects />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
        <Certifications />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
        <Skills />
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
        <Contact />
      </main>
    </>
  );
}