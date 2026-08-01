import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="main-header glass"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="header-container">
        <div className="logo hover-target">
          <span className="text-gradient">ZION </span>
          <span className="text-glow-white" style={{ fontSize: '0.8em', fontWeight: 500 }}>Desenvolvimento</span>
        </div>
        
        <nav className="desktop-nav">
          <ul>
            <li className="hover-target"><a href="#efeito-wow">Processo</a></li>
            <li className="hover-target"><a href="#work">Projetos</a></li>
            <li className="hover-target"><a href="#teste-agora">Tecnologia</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <a href="https://wa.me/5511945865631?text=OLA%0AQUERO%20UM%20SITE%20PARA%20MINHA%20EMPRESA%20." target="_blank" rel="noopener noreferrer" className="btn-gradient hover-target" style={{ textDecoration: 'none' }}>Iniciar Projeto</a>
          <button className="mobile-menu-btn hover-target">
            <Menu color="white" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
