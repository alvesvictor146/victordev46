import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import './InteractivePlayground.css';

const InteractivePlayground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values for global glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // --- Card 1: 360 Spin ---
  const handleSpinClick = () => {
    const root = document.getElementById('root') || document.body;
    const scrollY = window.scrollY;
    const centerY = scrollY + window.innerHeight / 2;
    
    gsap.to(root, {
      rotateZ: 360,
      scale: 0.8,
      transformOrigin: `50% ${centerY}px`,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(root, { clearProps: "transform" });
      }
    });
  };

  // --- Card 2: Magnetic ---
  const MagneticCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const magSmoothX = useSpring(x, springConfig);
    const magSmoothY = useSpring(y, springConfig);
    
    const rotateX = useTransform(magSmoothY, [-50, 50], [15, -15]);
    const rotateY = useTransform(magSmoothX, [-50, 50], [-15, 15]);
  
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.4);
      y.set((e.clientY - centerY) * 0.4);
    };
    
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
  
    return (
      <motion.div 
        ref={cardRef}
        className="glass-card magnetic-card hover-target"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: magSmoothX, y: magSmoothY, rotateX, rotateY }}
      >
        <div className="card-inner">
          {/* Double parallax on icon */}
          <motion.div className="icon icon-2" style={{ x: magSmoothX, y: magSmoothY }}></motion.div>
          <h3>Magnetismo 3D</h3>
          <p>O cartão acompanha o seu cursor criando uma ilusão de profundidade física paralaxe.</p>
        </div>
      </motion.div>
    );
  };

  // --- Card 3: Cyberpunk Glitch ---
  const GlitchCard = () => {
    const [isGlitching, setIsGlitching] = useState(false);
  
    return (
      <motion.div 
        className={`glass-card hover-target ${isGlitching ? 'glitching' : ''}`}
        onMouseDown={() => setIsGlitching(true)}
        onMouseUp={() => setIsGlitching(false)}
        onMouseLeave={() => setIsGlitching(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="card-inner">
          <div className="icon icon-3 glitch-icon"></div>
          <h3 className="glitch-text" data-text="Colapso Neon">Colapso Neon</h3>
          <p>Clique e segure para acionar um erro crítico no sistema audiovisual.</p>
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      id="teste-agora"
      className="interactive-section" 
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
    >
      <motion.div 
        className="interactive-glow"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      
      <div className="interactive-content">
        <h2 className="section-title">TESTE AGORA</h2>
        <p className="interactive-subtitle">Tudo reage à sua presença. Passe o mouse</p>
        
        <div className="cards-grid">
          
          {/* Card 1: 360 Spin */}
          <motion.div 
            className="glass-card hover-target"
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSpinClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-inner">
              <div className="icon icon-1"></div>
              <h3>Giro Global 360°</h3>
              <p>Clique aqui e prepare-se para o site inteiro girar ao seu redor.</p>
            </div>
          </motion.div>

          <MagneticCard />
          <GlitchCard />

        </div>
      </div>
    </section>
  );
};

export default InteractivePlayground;
