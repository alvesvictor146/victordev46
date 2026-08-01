import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MorphingShowcase.css';
import prototypeVideo from '../../Website_prototype_analysis_studio_1080p_202607251240.mp4';
import codeVideo from '../../Man_developing_website_with_coll…_202607251236.mp4';
import finalVideo from '../../Site_publication_and_management_202607251249.mp4';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    title: "Wireframe",
    subtitle: "Planejamento do projeto",
    description: "Antes de escrever qualquer código, desenhamos a estrutura do seu site para definir a melhor organização das informações e a experiência do cliente."
  },
  {
    title: "Layout",
    subtitle: "Design personalizado",
    description: "Transformamos o planejamento em um visual moderno, alinhado à identidade da sua empresa, transmitindo profissionalismo e credibilidade."
  },
  {
    title: "Protótipo",
    subtitle: "Prévia para aprovação",
    description: "Você visualiza como o site ficará antes da publicação. Nessa etapa fazemos os últimos ajustes para garantir que tudo esteja do jeito que você imaginou."
  },
  {
    title: "Código",
    subtitle: "Desenvolvimento",
    description: "Construímos seu site utilizando tecnologias modernas, garantindo rapidez, segurança, excelente desempenho e compatibilidade com celulares e computadores."
  },
  {
    title: "Site Final",
    subtitle: "Publicação e Gestão",
    description: "Publicamos o site na internet, configuramos domínio, segurança e hospedagem. A partir daí, cuidamos da manutenção para que tudo continue funcionando perfeitamente."
  }
];

const MorphingShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && textRef.current && visualRef.current) {
      const ctx = gsap.context(() => {
        const texts = gsap.utils.toArray('.stage-text') as HTMLElement[];
        const visuals = gsap.utils.toArray('.stage-visual') as HTMLElement[];
        const stagesList = containerRef.current?.querySelector('.stages-list') as HTMLElement;
        const visualCol = containerRef.current?.querySelector('.morphing-visual-col') as HTMLElement;

        // Calculate perfect centering for each item relative to the visual container
        const visualRect = visualCol.getBoundingClientRect();
        const visualCenter = visualRect.top + (visualRect.height / 2);
        
        const targetYs = texts.map(text => {
          const textRect = text.getBoundingClientRect();
          const textCenter = textRect.top + (textRect.height / 2);
          return visualCenter - textCenter;
        });

        // Ensure the very first item starts centered
        gsap.set(stagesList, { y: targetYs[0] });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
            id: "morphing",
          }
        });

        texts.forEach((text, i) => {
          if (i > 0) {
            tl.to(texts[i - 1], { opacity: 0.2, scale: 0.95, duration: 1 }, i * 2);
            // Move the list so the new active item aligns exactly with the visual center
            tl.to(stagesList, { 
              y: targetYs[i], 
              duration: 1,
              ease: "power2.inOut"
            }, i * 2);
          }
          tl.to(text, { opacity: 1, scale: 1, duration: 1 }, i * 2);
          
          if (i > 0) {
            tl.to(visuals[i - 1], { opacity: 0, scale: 0.9, duration: 1 }, i * 2);
          }
          tl.to(visuals[i], { opacity: 1, scale: 1, duration: 1 }, i * 2);
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="efeito-wow" className="morphing-section" ref={containerRef}>
      <div className="morphing-container">
        
        <div className="morphing-text-col" ref={textRef}>
          <h2 className="section-title">Processo de <span className="text-gradient-neon">Criação</span></h2>
          <div className="stages-list">
            {stages.map((stage, idx) => (
              <div key={idx} className="stage-text">
                <div className="stage-header">
                  <span className="stage-number">0{idx + 1}</span>
                  <span className="stage-title">{stage.title}</span>
                </div>
                <div className="stage-details">
                  <h4>{stage.subtitle}</h4>
                  <p>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="morphing-visual-col" ref={visualRef}>
          {/* We use basic CSS shapes and glassmorphism to represent the stages */}
          <div className="stage-visual wireframe">
            <video src={`${import.meta.env.BASE_URL}showcase_video.mp4`} autoPlay loop muted playsInline className="showcase-video"></video>
          </div>
          <div className="stage-visual layout">
            <video src={`${import.meta.env.BASE_URL}showcase_layout_video.mp4`} autoPlay loop muted playsInline className="showcase-video"></video>
          </div>
          <div className="stage-visual prototype">
            <video src={prototypeVideo} autoPlay loop muted playsInline className="showcase-video"></video>
          </div>
          <div className="stage-visual code">
            <video src={codeVideo} autoPlay loop muted playsInline className="showcase-video"></video>
          </div>
          <div className="stage-visual final">
            <video src={finalVideo} autoPlay loop muted playsInline className="showcase-video"></video>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MorphingShowcase;
