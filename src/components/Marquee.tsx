import React from 'react';
import './Marquee.css';

const words = [
  "Transparência", "Compromisso", "Qualidade", "Excelência", "Segurança",
  "Confiabilidade", "Precisão", "Responsabilidade", "Software", "Desenvolvimento",
  "Engenharia", "Automação", "Inteligência", "Inovação", "Performance",
  "Escalabilidade", "Integração", "Resultados", "Crescimento", "Estratégia",
  "Posicionamento", "Autoridade", "Visibilidade", "Marketing"
];

interface MarqueeProps {
  text?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  const content = text 
    ? Array(6).fill(text) 
    : words;

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {/* Render twice for infinite seamless loop */}
        <div className="marquee-track">
          {content.map((word, i) => (
            <span key={`first-${i}`} className="marquee-word">{word}</span>
          ))}
        </div>
        <div className="marquee-track" aria-hidden="true">
          {content.map((word, i) => (
            <span key={`second-${i}`} className="marquee-word">{word}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
