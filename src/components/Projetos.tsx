import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './Projetos.css';

const videos = [
  { src: "WhatsApp Video 2026-08-01 at 09.24.55.mp4", title: "Projeto de site profissional - Exemplo 1" },
  { src: "WhatsApp Video 2026-08-01 at 09.25.04.mp4", title: "Projeto de landing page de alta conversão - Exemplo 2" },
  { src: "WhatsApp Video 2026-08-01 at 09.25.07.mp4", title: "Projeto de site empresarial - Exemplo 3" },
  { src: "WhatsApp Video 2026-08-01 at 09.25.11.mp4", title: "Projeto de site para pequena empresa - Exemplo 4" },
  { src: "WhatsApp Video 2026-08-01 at 09.25.16.mp4", title: "Projeto de site personalizado - Exemplo 5" }
];

const Projetos: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].clientWidth + 32; // width + gap
      carouselRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].clientWidth + 32; // width + gap
      carouselRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="projetos-section">
      <div className="projetos-header">
        <h2 className="section-title">Nossos <span className="text-gradient-neon">Projetos</span></h2>
        <p className="section-subtitle">Confira nossa galeria de experiências digitais de alto impacto</p>
      </div>

      <div className="carousel-container">
        <button className="carousel-btn prev-btn hover-target" onClick={scrollLeft} aria-label="Ver projeto anterior">&#8249;</button>
        <div className="carousel-track" ref={carouselRef}>
          {videos.map((video, index) => (
            <motion.div 
              key={index} 
              className="carousel-item"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <video 
                src={`${import.meta.env.BASE_URL}${video.src}`}
                autoPlay 
                loop 
                muted 
                playsInline
                className="carousel-video hover-target"
                title={video.title}
              />
            </motion.div>
          ))}
        </div>
        <button className="carousel-btn next-btn hover-target" onClick={scrollRight} aria-label="Ver próximo projeto">&#8250;</button>
      </div>
    </section>
  );
};

export default Projetos;
