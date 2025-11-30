import React from 'react';
import { FaUserCircle, FaCloudUploadAlt } from 'react-icons/fa';

const Header = ({ isLoggedIn, onLogin, onLogout, onOpenUpload }) => {
  return (
    <header className="header glass-panel">
      <div className="container header-content">
        <div className="logo-section">
          <img src="/PNG-brasão-Ufersa.png" alt="UFERSA Logo" className="logo-img" />
          <span className="logo-text">ufersaVault</span>
        </div>

        <nav className="nav-links">
          <a href="#home" className="nav-link">Início</a>
          <a href="#materials" className="nav-link">Materiais</a>
          <a href="#upload" className="nav-link">Upload</a>
        </nav>

        <div className="user-section">
          <button className="btn btn-secondary btn-sm" onClick={onOpenUpload} style={{ marginRight: '1rem' }}>
            <FaCloudUploadAlt className="icon" /> Upload
          </button>

          {isLoggedIn ? (
            <button className="btn btn-primary btn-sm" onClick={onLogout}>
              <FaUserCircle className="icon" /> Sair
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={onLogin}>
              <FaUserCircle className="icon" /> Entrar
            </button>
          )}
        </div>
      </div>

      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 1rem 0;
          background: rgba(255, 255, 255, 0.9);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-img {
          height: 40px;
          width: auto;
        }

        .logo-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--color-primary);
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: none;
          gap: 2rem;
        }

        .nav-link {
          text-decoration: none;
          color: var(--color-text-main);
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: var(--color-primary);
        }

        .icon {
          margin-right: 0.5rem;
          font-size: 1.1rem;
        }

        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
