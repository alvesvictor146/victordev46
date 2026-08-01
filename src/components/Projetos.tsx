import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './Projetos.css';

const videos = [
  "WhatsApp Video 2026-08-01 at 09.24.55.mp4",
  "WhatsApp Video 2026-08-01 at 09.25.04.mp4",
  "WhatsApp Video 2026-08-01 at 09.25.07.mp4",
  "WhatsApp Video 2026-08-01 at 09.25.11.mp4",
  "WhatsApp Video 2026-08-01 at 09.25.16.mp4"
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
        <button className="carousel-btn prev-btn hover-target" onClick={scrollLeft}>&#8249;</button>
        <div className="carousel-track" ref={carouselRef}>
          {videos.map((video, index) => (
            <motion.div 
              key={index} 
              className="carousel-item"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <video 
                src={`${import.meta.env.BASE_URL}${video}`}
                type="video/mp4"
                autoPlay 
                loop 
                muted 
                playsInline
                className="carousel-video hover-target"
              />
            </motion.div>
          ))}
        </div>
        <button className="carousel-btn next-btn hover-target" onClick={scrollRight}>&#8250;</button>
      </div>
    </section>
  );
};

export default Projetos;
