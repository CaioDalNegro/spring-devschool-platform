import React, { useState, useEffect } from "react";
import { PlusCircle, Users, BookOpen, BarChart3 } from "lucide-react"; // ícones usados no dashboard
import Sidebar from "../components/SidebarProfessor"; // Sidebar como componente separado
import "../styles/dashboard.css"; // CSS do dashboard

export default function DashboardProfessor() {
  
  // Estado para controlar a aba ativa da sidebar
  const [active, setActive] = useState("meusCursos");

  // Estado para armazenar as turmas vindas do backend
  const [turmas, setTurmas] = useState([]);

  // useEffect para buscar turmas do backend quando o componente montar
  useEffect(() => {
    fetch("http://localhost:8080/api/turmas")
      .then((res) => res.json())
      .then((data) => setTurmas(data)) // salva as turmas no estado
      .catch((err) => console.error("Erro ao buscar turmas:", err));
  }, []); // [] garante que a requisição execute apenas 1 vez

  // Função chamada quando o professor clica em "Criar Nova Turma"
  const handleCriarTurma = () => alert("Funcionalidade de criar turma em desenvolvimento 🚀");

  return (
    <div className="dashboard-container">
      {/* Sidebar como componente separado */}
      <Sidebar active={active} setActive={setActive} />

      {/* Conteúdo principal da dashboard */}
      <main className="main-content">
        {/* Cabeçalho do conteúdo com título e botão */}
        <div className="main-header">
          <h1>Meus Cursos</h1>
          <button className="create-btn" onClick={handleCriarTurma}>
            <PlusCircle size={20} /> Criar Nova Turma
          </button>
        </div>

        {/* Grid de turmas */}
        <div className="turmas-grid">
          {turmas.map((turma) => (
            <div className="turma-card" key={turma.id}>
              {/* Nome da turma */}
              <h2>{turma.nome}</h2>

              {/* Informações da turma */}
              <div className="turma-info">
                <Users /> {turma.alunos} alunos
              </div>
              <div className="turma-info">
                <BookOpen /> {turma.desafios} desafios
              </div>
              <div className="turma-info">
                <BarChart3 /> Acompanhar progresso
              </div>

              {/* Botão para acessar a turma */}
              <button>Acessar Turma</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}