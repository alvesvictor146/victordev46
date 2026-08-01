import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';

// Add the other sections below as we build them.
import MorphingShowcase from './components/MorphingShowcase';
import InteractivePlayground from './components/InteractivePlayground';
import Projetos from './components/Projetos';
import CtaFinal from './components/CtaFinal';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <MorphingShowcase />
        <Marquee text="VAMOS CRIAR JUNTOS EFEITOS PARA CHAMAR ATENÇÃO NA SUA PAGINA !" />
        <InteractivePlayground />
        <Projetos />
        <CtaFinal />
      </main>
    </>
  );
}

export default App;
