import React, { useState } from 'react';
import { FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';

const UploadSection = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);

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

    return (
        <section id="upload" className="upload-section">
            <div className="container">
                <div className="upload-card glass-panel">
                    <h2 className="section-title">Compartilhe seu Material</h2>
                    <p className="section-desc">Ajude outros alunos subindo provas antigas e resumos.</p>

                    <form className="upload-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Título do Material</label>
                            <input type="text" placeholder="Ex: Prova 1 - Cálculo I - 2023.2" className="form-input" />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Disciplina</label>
                                <input type="text" placeholder="Ex: Cálculo I" className="form-input" />
                            </div>
                            <div className="form-group">
                                <label>Tipo</label>
                                <select className="form-select">
                                    <option>Prova</option>
                                    <option>Lista de Exercícios</option>
                                    <option>Resumo</option>
                                    <option>Outro</option>
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
                            <input type="file" id="file-upload" className="file-input" onChange={handleChange} />
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
                                        <span className="drop-text">Arraste seu arquivo aqui ou clique para selecionar</span>
                                        <span className="drop-hint">PDF, JPG ou PNG até 10MB</span>
                                    </>
                                )}
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Enviar Material</button>
                    </form>
                </div>
            </div>

            <style>{`
        .upload-section {
          padding: 4rem 0;
          background-color: #f8fafc;
        }

        .upload-card {
          max-width: 600px;
          margin: 0 auto;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          background: white;
        }

        .section-title {
          text-align: center;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .section-desc {
          text-align: center;
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }

        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        label {
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--color-text-main);
        }

        .form-input, .form-select {
          padding: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(0, 105, 62, 0.1);
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
          background: rgba(0, 105, 62, 0.05);
        }
        
        .drop-zone.has-file {
          border-style: solid;
          border-color: var(--color-primary);
          background: rgba(0, 105, 62, 0.05);
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
      `}</style>
        </section>
    );
};

export default UploadSection;
