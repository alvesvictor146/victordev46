import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Magnetic 3D logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Subtle rotation for large text
  const rotateX = useTransform(smoothY, [-100, 100], [10, -10]);
  const rotateY = useTransform(smoothX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // 0.2 factor for a more subtle pull on the large text
    mouseX.set((e.clientX - centerX) * 0.2);
    mouseY.set((e.clientY - centerY) * 0.2);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (textRef.current) {
      // Split text or just simple GSAP reveal
      gsap.fromTo(
        textRef.current.children,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power4.out",
          delay: 0.5
        }
      );
    }
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      <motion.div className="hero-background" style={{ y, opacity }}>
        <video 
          className="hero-bg-video"
          autoPlay 
          loop 
          muted 
          playsInline
          title="ZION Desenvolvimento - Criação de sites profissionais em São Paulo"
          aria-label="Vídeo de apresentação da ZION Desenvolvimento, empresa de criação de sites profissionais"
        >
          <source src={`${import.meta.env.BASE_URL}hero_video.mp4`} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </motion.div>

      <div className="hero-content">
        <motion.h1 
          ref={textRef} 
          className="hero-title magnetic-text"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            x: smoothX, 
            y: smoothY, 
            rotateX, 
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          <span className="line" style={{ display: 'inline-block' }}>Nós desenvolvemos</span>
          <span className="line" style={{ display: 'inline-block' }}>
            <span className="text-gradient-neon" style={{ display: 'inline-block', transform: 'translateZ(30px)' }}>experiências digitais</span>
          </span>
          <span className="line" style={{ display: 'inline-block' }}>que vendem.</span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Sites de alta conversão para empresas que desejam crescer.
        </motion.p>

        <motion.div 
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <a href="https://wa.me/5511945865631?text=OLA%0AQUERO%20UM%20SITE%20PARA%20MINHA%20EMPRESA%20." target="_blank" rel="noopener noreferrer" className="btn-gradient hover-target" style={{ textDecoration: 'none' }}>Solicitar Projeto</a>
          <a href="#work" className="btn-gradient hover-target" style={{ marginLeft: '1rem', textDecoration: 'none' }}>Ver Projetos</a>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
