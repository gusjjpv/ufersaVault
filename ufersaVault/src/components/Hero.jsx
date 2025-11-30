import React from 'react';
import { FaSearch, FaCloudUploadAlt } from 'react-icons/fa';

const Hero = ({ onSearch, onUpload }) => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text animate-fade-in">
          <h1 className="hero-title">
            O repositório central da <span className="highlight">UFERSA</span>
          </h1>
          <p className="hero-subtitle">
            Acesse provas antigas, listas de exercícios e resumos compartilhados por alunos.
            Estude melhor, juntos.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onSearch}>
              <FaSearch className="icon" /> Buscar Materiais
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onUpload}>
              <FaCloudUploadAlt className="icon" /> Fazer Upload
            </button>
          </div>
        </div>

        <div className="hero-visual">
          {/* Abstract shape or illustration could go here */}
          <div className="blob"></div>
        </div>
      </div>

      <style>{`
        .hero {
          padding: 6rem 0 4rem;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          text-align: center;
        }

        .hero-title {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: var(--color-text-main);
        }

        .highlight {
          color: var(--color-primary);
          position: relative;
        }
        
        .highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: var(--color-secondary);
          opacity: 0.3;
          z-index: -1;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          color: var(--color-text-muted);
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .blob {
          position: absolute;
          top: -10%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(198, 146, 20, 0.1) 0%, rgba(0, 105, 62, 0.05) 100%);
          border-radius: 50%;
          filter: blur(60px);
          z-index: -1;
        }

        @media (min-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr; /* Centered layout looks better for this content */
            text-align: center;
          }
          
          .hero-title {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
