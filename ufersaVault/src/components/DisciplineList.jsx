import React from 'react';
import { FaFolder } from 'react-icons/fa';
import { DISCIPLINAS_POR_SEMESTRE } from '../constants';

const DisciplineList = ({ onSelectDiscipline }) => {
    return (
        <section id="materials" className="disciplines-section">
            <div className="container">
                <h2 className="section-title">Disciplinas</h2>
                <p className="section-subtitle">Selecione uma disciplina para ver os materiais</p>

                <div className="semesters-container">
                    {DISCIPLINAS_POR_SEMESTRE.map((grupo) => (
                        <div key={grupo.semestre} className="semester-group">
                            <h3 className="semester-title">{grupo.semestre}</h3>
                            <div className="disciplines-grid">
                                {grupo.materias.map((disc) => (
                                    <div
                                        key={disc.value}
                                        className="discipline-card"
                                        onClick={() => onSelectDiscipline(disc.value)}
                                    >
                                        <div className="folder-icon">
                                            <FaFolder />
                                        </div>
                                        <div className="discipline-info">
                                            <h3 className="discipline-name">{disc.label}</h3>
                                            <span className="material-count">Ver materiais</span>
                                        </div>
                                    </div>
                                ))}
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

        .semesters-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .semester-title {
          font-size: 1.5rem;
          color: var(--color-text-main);
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--color-border);
        }

        .disciplines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
          font-size: 1rem;
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
