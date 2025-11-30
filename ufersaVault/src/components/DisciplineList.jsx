import React from 'react';
import { FaFolder } from 'react-icons/fa';

// Mock Data for Disciplines
const DISCIPLINES = [
    { id: 1, name: 'Cálculo I', count: 12 },
    { id: 2, name: 'Física III', count: 8 },
    { id: 3, name: 'Algoritmos e Programação', count: 15 },
    { id: 4, name: 'Química Geral', count: 5 },
    { id: 5, name: 'Sistemas Distribuídos', count: 3 },
    { id: 6, name: 'Banco de Dados', count: 9 },
];

const DisciplineList = ({ onSelectDiscipline }) => {
    return (
        <section id="materials" className="disciplines-section">
            <div className="container">
                <h2 className="section-title">Disciplinas</h2>
                <p className="section-subtitle">Selecione uma disciplina para ver os materiais</p>

                <div className="disciplines-grid">
                    {DISCIPLINES.map((disc) => (
                        <div
                            key={disc.id}
                            className="discipline-card"
                            onClick={() => onSelectDiscipline(disc.name)}
                        >
                            <div className="folder-icon">
                                <FaFolder />
                            </div>
                            <div className="discipline-info">
                                <h3 className="discipline-name">{disc.name}</h3>
                                <span className="material-count">{disc.count} materiais</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .disciplines-section {
          padding: 4rem 0;
        }

        .section-title {
          text-align: center;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          text-align: center;
          color: var(--color-text-muted);
          margin-bottom: 3rem;
        }

        .disciplines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .discipline-card {
          background: white;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .discipline-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }

        .folder-icon {
          font-size: 2.5rem;
          color: var(--color-secondary);
        }

        .discipline-info {
          display: flex;
          flex-direction: column;
        }

        .discipline-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-main);
        }

        .material-count {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
      `}</style>
        </section>
    );
};

export default DisciplineList;
