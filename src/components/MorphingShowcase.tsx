import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MorphingShowcase.css';
import prototypeVideo from '../../Website_prototype_analysis_studio_1080p_202607251240.mp4';
import codeVideo from '../../Man_developing_website_with_coll…_202607251236.mp4';
import finalVideo from '../../Site_publication_and_management_202607251249.mp4';

gsap.registerPlugin(ScrollTrigger);

const MorphingShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const stages = [
    {
      title: "Wireframe",
      subtitle: "Planejamento do projeto",
      description: "Antes de escrever qualquer código, desenhamos a estrutura do seu site para definir a melhor organização das informações e a experiência do cliente.",
      videoSrc: `${import.meta.env.BASE_URL}showcase_video.mp4`,
      videoTitle: "Etapa de wireframe e planejamento do site"
    },
    {
      title: "Layout",
      subtitle: "Design personalizado",
      description: "Transformamos o planejamento em um visual moderno, alinhado à identidade da sua empresa, transmitindo profissionalismo e credibilidade.",
      videoSrc: `${import.meta.env.BASE_URL}showcase_layout_video.mp4`,
      videoTitle: "Etapa de design e layout personalizado"
    },
    {
      title: "Protótipo",
      subtitle: "Prévia para aprovação",
      description: "Você visualiza como o site ficará antes da publicação. Nessa etapa fazemos os últimos ajustes para garantir que tudo esteja do jeito que você imaginou.",
      videoSrc: prototypeVideo,
      videoTitle: "Etapa de protótipo para aprovação do cliente"
    },
    {
      title: "Código",
      subtitle: "Desenvolvimento",
      description: "Construímos seu site utilizando tecnologias modernas, garantindo rapidez, segurança, excelente desempenho e compatibilidade com celulares e computadores.",
      videoSrc: codeVideo,
      videoTitle: "Etapa de desenvolvimento e código do site"
    },
    {
      title: "Site Final",
      subtitle: "Publicação e Gestão",
      description: "Publicamos o site na internet, configuramos domínio, segurança e hospedagem. A partir daí, cuidamos da manutenção para que tudo continue funcionando perfeitamente.",
      videoSrc: finalVideo,
      videoTitle: "Site final publicado e em funcionamento"
    }
  ];

  useEffect(() => {
    if (containerRef.current && textRef.current && visualRef.current) {
      const texts = gsap.utils.toArray('.stage-text') as HTMLElement[];
      const visuals = gsap.utils.toArray('.stage-visual') as HTMLElement[];
      const stagesList = containerRef.current.querySelector('.stages-list') as HTMLElement;
      const visualCol = containerRef.current.querySelector('.morphing-visual-col') as HTMLElement;

      // Função para tocar o vídeo ativo e pausar os outros
      const manageVideoPlayback = (activeIndex: number) => {
        visuals.forEach((visual, idx) => {
          const video = visual.querySelector('video') as HTMLVideoElement;
          if (video) {
            if (idx === activeIndex) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          }
        });
      };

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // 💻 DESKTOP: Pinagem da tela inteira, translação mecânica e transições fluidas
        mm.add("(min-width: 901px)", () => {
          // Limpar estilos inline residuais do mobile
          gsap.set(stagesList, { clearProps: "all" });
          texts.forEach(t => gsap.set(t, { clearProps: "all" }));
          visuals.forEach(v => gsap.set(v, { clearProps: "all" }));

          manageVideoPlayback(0);

          const visualRect = visualCol.getBoundingClientRect();
          const visualCenter = visualRect.top + (visualRect.height / 2);

          const targetYs = texts.map(text => {
            const textRect = text.getBoundingClientRect();
            const textCenter = textRect.top + (textRect.height / 2);
            return visualCenter - textCenter;
          });

          // Centraliza o primeiro item no início
          gsap.set(stagesList, { y: targetYs[0] });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 1,
              id: "morphing-desktop",
            }
          });

          texts.forEach((text, i) => {
            if (i > 0) {
              tl.to(texts[i - 1], {
                opacity: 0.2,
                scale: 0.95,
                duration: 1,
                onStart: () => manageVideoPlayback(i - 1),
                onReverseComplete: () => manageVideoPlayback(i - 1)
              }, i * 2);

              tl.to(stagesList, {
                y: targetYs[i],
                duration: 1,
                ease: "power2.inOut"
              }, i * 2);
            }

            tl.to(text, {
              opacity: 1,
              scale: 1,
              duration: 1,
              onStart: () => manageVideoPlayback(i),
              onReverseComplete: () => manageVideoPlayback(i)
            }, i * 2);

            if (i > 0) {
              tl.to(visuals[i - 1], { opacity: 0, scale: 0.9, duration: 1 }, i * 2);
            }
            tl.to(visuals[i], { opacity: 1, scale: 1, duration: 1 }, i * 2);
          });
        });

        // 📱 MOBILE: Vídeo sticky no topo — texto flui abaixo e SOBE atrás do vídeo
        mm.add("(max-width: 900px)", () => {
          gsap.set(stagesList, { y: 0 });
          gsap.set(visuals, { opacity: 0, scale: 0.9 });
          gsap.set(visuals[0], { opacity: 1, scale: 1 });

          // Textos começam levemente visíveis (dimmed) — o primeiro em destaque total
          gsap.set(texts, { opacity: 0.2, scale: 1 });
          gsap.set(texts[0], { opacity: 1 });
          manageVideoPlayback(0);

          const activateStage = (i: number) => {
            texts.forEach((t, idx) => {
              gsap.to(t, { opacity: idx === i ? 1 : 0.2, scale: 1, duration: 0.3 });
            });
            visuals.forEach((v, idx) => {
              gsap.to(v, {
                opacity: idx === i ? 1 : 0,
                scale: idx === i ? 1 : 0.9,
                duration: 0.3,
                overwrite: "auto"
              });
            });
            manageVideoPlayback(i);
          };

          texts.forEach((text, i) => {
            ScrollTrigger.create({
              trigger: text,
              // Texto entra pela parte inferior da viewport → acende o stage
              start: "top 92%",
              // Texto sobe até a base do vídeo sticky → se esconde atrás dele
              // Calculado dinamicamente: header (70px) + altura real do vídeo + buffer
              end: () => `top ${70 + visualCol.offsetHeight + 8}px`,
              onEnter: () => activateStage(i),
              onEnterBack: () => {
                // Texto volta de trás do vídeo → reativa o stage
                activateStage(i);
              },
              onLeave: () => {
                // Texto subiu e se escondeu atrás do vídeo sticky
                gsap.to(text, { opacity: 0, duration: 0.2 });
              },
              onLeaveBack: () => {
                // Texto saiu pela parte inferior — fica levemente visível
                gsap.to(text, { opacity: 0.2, duration: 0.25 });
              }
            });
          });
        });

      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="efeito-wow" className="morphing-section" ref={containerRef}>
      <div className="morphing-container">

        {/* Título — 1º no DOM: topo em mobile e grid-area "title" no desktop */}
        <h2 className="section-title">Processo de <span className="text-gradient-neon">Criação</span></h2>

        {/* Vídeo — 2º no DOM: sticky abaixo do título em mobile, grid-area "visual" no desktop */}
        <div className="morphing-visual-col" ref={visualRef}>
          <div className="stage-visual wireframe">
            <video src={`${import.meta.env.BASE_URL}showcase_video.mp4`} autoPlay loop muted playsInline className="showcase-video" title="Etapa de wireframe e planejamento do site"></video>
          </div>
          <div className="stage-visual layout">
            <video src={`${import.meta.env.BASE_URL}showcase_layout_video.mp4`} autoPlay loop muted playsInline className="showcase-video" title="Etapa de design e layout personalizado"></video>
          </div>
          <div className="stage-visual prototype">
            <video src={prototypeVideo} autoPlay loop muted playsInline className="showcase-video" title="Etapa de protótipo para aprovação do cliente"></video>
          </div>
          <div className="stage-visual code">
            <video src={codeVideo} autoPlay loop muted playsInline className="showcase-video" title="Etapa de desenvolvimento e código do site"></video>
          </div>
          <div className="stage-visual final">
            <video src={finalVideo} autoPlay loop muted playsInline className="showcase-video" title="Site final publicado e em funcionamento"></video>
          </div>
        </div>

        {/* Textos — 3º no DOM: fluem abaixo do vídeo em mobile, grid-area "text" no desktop */}
        <div className="morphing-text-col" ref={textRef}>
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

      </div>
    </section>
  );
};

export default MorphingShowcase;
