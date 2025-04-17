import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import { Box } from '@mui/material';
import Layout from './components/layout/Layout';
import { useRef } from 'react';

function App() {
  const homeRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout onNavigate={scrollToSection} refs={{ homeRef, skillsRef, experienceRef, projectsRef, contactRef }}>
      <Box ref={homeRef}>
        <Home />
      </Box>
      <Box ref={skillsRef}>
        <Skills />
      </Box>
      <Box ref={experienceRef}>
        <Experience />
      </Box>
      <Box ref={projectsRef}>
        <Projects />
      </Box>
      <Box ref={contactRef}>
        <Contact />
      </Box>
    </Layout>
  );
}

export default App;