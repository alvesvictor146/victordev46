import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './CtaFinal.css';

const CtaFinal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section className="cta-final-section" ref={containerRef}>
      <motion.div 
        className="cta-background"
        style={{ scale, opacity }}
      >
        <div className="cta-particles"></div>
        <div className="cta-glow"></div>
      </motion.div>

      <div className="cta-content">
        <motion.div 
          className="cta-actor"
          style={{ y, opacity }}
        >
          <img src="/new_actor.jpeg" alt="Tech Specialist" />
        </motion.div>

        <motion.h2 
          className="cta-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Imagine sua empresa com um site <span className="text-gradient-neon">neste nível.</span>
        </motion.h2>

        <motion.a 
          href="https://wa.me/5511945865631?text=OLA%0AQUERO%20UM%20SITE%20PARA%20MINHA%20EMPRESA%20."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-large hover-target"
          style={{ textDecoration: 'none' }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Quero um Site Assim
        </motion.a>
      </div>
    </section>
  );
};

export default CtaFinal;
