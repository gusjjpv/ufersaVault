import React, { useState } from 'react';
import { FaFilePdf, FaDownload, FaThumbsUp, FaSearch } from 'react-icons/fa';

const MaterialList = ({ discipline, materials, loading, onBack, onVote, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      onSearch(searchTerm);
    }
  };

  return (
    <section id="materials" className="materials-section animate-fade-in">
      <div className="container">
        <div className="section-header">
          <div className="header-left">
            <button onClick={onBack} className="btn-back">
              ← Voltar
            </button>
            <h2 className="section-title">
              {discipline ? `Materiais de ${discipline}` : 'Buscar Materiais'}
            </h2>
          </div>
          <div className="filters">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Buscar por disciplina (ex: calculo-1)..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchSubmit}
              />
              <button className="btn-search-icon" onClick={handleSearchSubmit}>
                <FaSearch />
              </button>
            </div>
            <select className="filter-select">
              <option value="">Todos os tipos</option>
              <option value="prova">Provas</option>
              <option value="lista">Listas</option>
              <option value="resumo">Resumos</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <p>Carregando materiais...</p>
          </div>
        ) : materials.length === 0 ? (
          <div className="empty-state">
            {discipline ? (
              <p>Nenhum material encontrado para <strong>{discipline}</strong>.</p>
            ) : (
              <p>Digite o nome de uma disciplina acima para buscar materiais.</p>
            )}
          </div>
        ) : (
          <div className="materials-grid">
            {materials.map((item) => (
              <div key={item.material_id} className="material-card">
                <div className="card-icon">
                  <FaFilePdf />
                </div>
                <div className="card-content">
                  <span className="card-tag">{item.unidade || 'Geral'}</span>
                  <h3 className="card-title">{item.titulo}</h3>
                  <p className="card-meta">{item.disciplina} • {item.semestre} • Prof. {item.professor}</p>
                  <div className="card-footer">
                    <div className="actions">
                      <button className="btn-icon" title="Curtir" onClick={() => onVote(item.material_id)}>
                        <FaThumbsUp /> <span>{parseInt(item.votes || 0)}</span>
                      </button>
                      <a
                        href={`https://wikiprovas-gus-files.s3.amazonaws.com/${item.s3_key}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-icon download"
                        title="Baixar"
                      >
                        <FaDownload />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .materials-section {
          padding: 4rem 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-back {
          background: none;
          border: none;
          color: var(--color-primary);
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
        }

        .btn-back:hover {
          text-decoration: underline;
        }

        .section-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
          align-items: center;
        }

        .filters {
          display: flex;
          gap: 1rem;
          width: 100%;
          max-width: 600px;
        }

        .search-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem;
          padding-right: 2.5rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-family: inherit;
        }

        .btn-search-icon {
          position: absolute;
          right: 0.5rem;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 0.25rem;
        }

        .btn-search-icon:hover {
          color: var(--color-primary);
        }

        .filter-select {
          padding: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: white;
          font-family: inherit;
        }

        .materials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .material-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s ease;
          border: 1px solid var(--color-border);
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .material-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }

        .card-icon {
          font-size: 2rem;
          color: #ef4444; /* PDF Red */
          background: #fef2f2;
          padding: 0.75rem;
          border-radius: var(--radius-md);
        }

        .card-content {
          flex: 1;
        }

        .card-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--color-primary);
          background: rgba(0, 175, 239, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--color-text-main);
        }

        .card-meta {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }

        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 0.85rem;
          color: var(--color-text-muted);
          border-top: 1px solid var(--color-border);
          padding-top: 0.75rem;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-icon {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem;
          border-radius: 4px;
          transition: color 0.2s;
        }

        .btn-icon:hover {
          color: var(--color-primary);
          background: rgba(0, 175, 239, 0.05);
        }
        
        .btn-icon.download:hover {
          color: var(--color-secondary);
        }

        .loading-state, .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--color-text-muted);
        }

        @media (min-width: 768px) {
          .section-header {
            flex-direction: row;
            justify-content: space-between;
          }
          
          .filters {
            width: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default MaterialList;
