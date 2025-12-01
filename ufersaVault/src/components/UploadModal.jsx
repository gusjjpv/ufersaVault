import React, { useState } from 'react';
import { FaCloudUploadAlt, FaFileAlt, FaTimes } from 'react-icons/fa';
import { DISCIPLINAS, DISCIPLINAS_POR_SEMESTRE } from '../constants';

const UploadModal = ({ isOpen, onClose, onUpload, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    disciplina: 'sistemas-distribuidos',
    professor: '',
    semestre: '2024.2',
    unidade: '1',
    tipo: 'Prova'
  });

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload(formData, file);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-fade-in">
        <button className="btn-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className="modal-title">Compartilhe seu Material</h2>
        <p className="modal-desc">Ajude outros alunos subindo provas antigas e resumos.</p>

        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título do Material</label>
            <input
              type="text"
              placeholder="Ex: Prova 1 - 2023.2"
              className="form-input"
              value={formData.titulo}
              onChange={e => setFormData({ ...formData, titulo: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Disciplina</label>
              <select
                className="form-select"
                value={formData.disciplina}
                onChange={e => setFormData({ ...formData, disciplina: e.target.value })}
                required
              >
                <option value="">Selecione uma disciplina</option>
                {DISCIPLINAS_POR_SEMESTRE.map((grupo) => (
                  <optgroup key={grupo.semestre} label={grupo.semestre}>
                    {grupo.materias.map((disc) => (
                      <option key={disc.value} value={disc.value}>
                        {disc.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Professor</label>
              <input
                type="text"
                placeholder="Nome do Professor"
                className="form-input"
                value={formData.professor}
                onChange={e => setFormData({ ...formData, professor: e.target.value })}
                required
              />
            </div>
          </div>


          <div className="form-row">
            <div className="form-group">
              <label>Semestre</label>
              <input
                type="text"
                className="form-input"
                value={formData.semestre}
                onChange={e => setFormData({ ...formData, semestre: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Unidade</label>
              <select
                className="form-select"
                value={formData.unidade}
                onChange={e => setFormData({ ...formData, unidade: e.target.value })}>

                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>Final</option>
              </select>
            </div>
          </div>
          <div className="form-row">

            <div className="form-group">
              <label>Tipo de Material</label>
              <select
                className="form-select"
                value={formData.tipo}
                onChange={e => setFormData({ ...formData, tipo: e.target.value })} required>
                <option>Prova</option>
                <option>Lista</option>
                <option>Resumo</option>
                <option>Outros</option>
              </select>
            </div>
          </div>
          <div
            className={`drop-zone ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input type="file" id="file-upload" className="file-input" onChange={handleChange} accept="application/pdf" />
            <label htmlFor="file-upload" className="drop-label">
              {file ? (
                <div className="file-info">
                  <FaFileAlt className="file-icon" />
                  <span>{file.name}</span>
                  <button type="button" className="btn-remove" onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                  }}>Trocar arquivo</button>
                </div>
              ) : (
                <>
                  <FaCloudUploadAlt className="upload-icon" />
                  <span className="drop-text">Arraste seu PDF aqui ou clique</span>
                  <span className="drop-hint">Apenas arquivos PDF</span>
                </>
              )}
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Material'}
          </button>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          width: 95%;
          max-width: 600px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }

        /* ... other styles ... */

        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .modal-content {
            padding: 2.5rem;
            width: 90%;
          }
          
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--color-text-main);
        }

        .form-input, .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(0, 175, 239, 0.1);
        }

        .drop-zone {
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-md);
          padding: 2rem;
          text-align: center;
          transition: all 0.2s;
          position: relative;
          background: #fafafa;
        }

        .drop-zone.drag-active {
          border-color: var(--color-primary);
          background: rgba(0, 175, 239, 0.05);
        }
        
        .drop-zone.has-file {
          border-style: solid;
          border-color: var(--color-primary);
          background: rgba(0, 175, 239, 0.05);
        }

        .file-input {
          display: none;
        }

        .drop-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .btn-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: transparent;
          border: none;
          font-size: 1.1rem;
          color: var(--color-text-muted);
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .btn-close:hover {
          background-color: #f1f5f9;
          color: #ef4444;
          transform: rotate(90deg);
        }

        .upload-icon {
          font-size: 3rem;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }

        .drop-text {
          font-weight: 500;
          color: var(--color-text-main);
          margin-bottom: 0.5rem;
        }

        .drop-hint {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .file-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .file-icon {
          font-size: 2.5rem;
          color: var(--color-primary);
        }

        .btn-remove {
          background: none;
          border: none;
          color: var(--color-text-muted);
          text-decoration: underline;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }

        .btn-block {
          width: 100%;
          margin-top: 1rem;
        }
        
        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default UploadModal;
