import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadModal from './components/UploadModal';
import MaterialList from './components/MaterialList';
import DisciplineList from './components/DisciplineList';

// --- AWS CONFIGURATION ---
const API_BASE_URL = "https://048pefphaf.execute-api.us-east-1.amazonaws.com/v2";
const COGNITO_DOMAIN = "https://us-east-1eqmpypsdp.auth.us-east-1.amazoncognito.com";
const CLIENT_ID = "6mjn8qu815ltmkii12b27uutov";
const REDIRECT_URI = window.location.origin; // Dynamic redirect URI

const LOGIN_URL = `${COGNITO_DOMAIN}/login?client_id=${CLIENT_ID}&response_type=token&scope=email+openid&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

function App() {
  // Auth State
  const [token, setToken] = useState(null);

  // Data State
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI State
  const [view, setView] = useState('disciplines'); // 'disciplines' or 'materials'
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // 1. Check for Token on Load
  useEffect(() => {
    // Tenta pegar da URL (Login recente)
    const hash = window.location.hash;

    if (hash) {
      console.log("Hash encontrada na URL:", hash); // Debug
      const params = new URLSearchParams(hash.substring(1));

      // MUDANÇA IMPORTANTE: Pegando id_token em vez de access_token
      const idToken = params.get('id_token');

      if (idToken) {
        console.log("Token extraído com sucesso!"); // Debug

        // 1. Salva no Estado
        setToken(idToken);
        // 2. Salva no Navegador (Persistência)
        localStorage.setItem('user_token', idToken);

        // Limpa a URL para ficar bonita
        window.location.hash = '';
      } else {
        console.log("Hash existe, mas não tem id_token. Verifique o console da AWS.");
      }
    } else {
      // Se não tem hash, tenta recuperar do localStorage (F5 na página)
      const storedToken = localStorage.getItem('user_token');
      if (storedToken) {
        console.log("Token recuperado do cache local.");
        setToken(storedToken);
      }
    }
  }, []);

  // 2. Fetch Materials
  const fetchMaterials = async (discipline) => {
    if (!discipline) return; // Prevent 400 Bad Request

    setLoading(true);
    try {
      const headers = token ? { Authorization: token } : {};
      const response = await axios.get(`${API_BASE_URL}/materiais?disciplina=${discipline}`, { headers });
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Navigation
  const handleSelectDiscipline = (disciplineName) => {
    setSelectedDiscipline(disciplineName);
    setView('materials');
    fetchMaterials(disciplineName);
  };

  const handleBackToDisciplines = () => {
    setSelectedDiscipline(null);
    setView('disciplines');
    setMaterials([]); // Clear list
  };

  const handleSearchSubmit = (term) => {
    if (term) {
      setSelectedDiscipline(term); // Update title to show what we are searching for
      fetchMaterials(term);
    }
  };

  // 4. Handle Upload
  const handleUpload = async (formData, file) => {
    if (!file || !token) {
      alert("Você precisa estar logado para fazer upload.");
      return;
    }

    try {
      // Step A: Get Signed URL
      const metadata = {
        ...formData,
        filename: file.name
      };

      const apiResponse = await axios.post(`${API_BASE_URL}/materiais`, metadata, {
        headers: { Authorization: token }
      });

      const { upload_url } = apiResponse.data;

      // Step B: Upload to S3
      await axios.put(upload_url, file, {
        headers: { 'Content-Type': file.type }
      });

      alert("Upload concluído com sucesso!");
      setIsUploadOpen(false);

      // Refresh list if we are viewing that discipline
      if (selectedDiscipline === formData.disciplina) {
        fetchMaterials(selectedDiscipline);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Falha no upload. Verifique se você está logado.");
    }
  };

  // 5. Handle Vote
  const handleVote = async (materialId) => {
    if (!token) return alert("Faça login para votar.");

    try {
      const config = {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      };

      await axios.post(`${API_BASE_URL}/votar`, { material_id: materialId }, config);

      // Sucesso
      alert("Voto computado! 👍");
      fetchMaterials(selectedDiscipline); // Atualiza a contagem na tela

    } catch (error) {
      console.error("Error voting:", error);

      // Tratamento de Erros Específicos
      if (error.response) {
        if (error.response.status === 409) {
          alert("⚠️ Você já votou neste material!");
        } else if (error.response.status === 401) {
          alert("Sessão expirada. Faça login novamente.");
        } else {
          alert("Erro ao votar. Tente novamente.");
        }
      }
    }
  };

  // 6. Handle Search (from Hero)
  const handleSearch = () => {
    setView('materials');
    setSelectedDiscipline(null);
    // Don't fetch immediately to avoid 400 error. User must type in search bar.
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={!!token}
        onLogin={() => window.location.href = LOGIN_URL}
        onLogout={() => {
          setToken(null);
          localStorage.removeItem('user_token');
          window.location.href = '/';
        }}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      <main>
        <Hero
          onSearch={handleSearch}
          onUpload={() => setIsUploadOpen(true)}
        />

        {view === 'disciplines' ? (
          <DisciplineList onSelectDiscipline={handleSelectDiscipline} />
        ) : (
          <MaterialList
            discipline={selectedDiscipline}
            materials={materials}
            loading={loading}
            onBack={handleBackToDisciplines}
            onVote={handleVote}
            onSearch={handleSearchSubmit}
          />
        )}
      </main>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
        loading={loading}
      />

      <footer className="footer">
        <div className="container">
          <p>© 2024 ufersaVault - Feito por alunos para alunos.</p>
        </div>
      </footer>

      <style>{`
        .footer {
          background: var(--color-text-main);
          color: white;
          padding: 2rem 0;
          text-align: center;
          margin-top: auto;
        }
        
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

export default App;
