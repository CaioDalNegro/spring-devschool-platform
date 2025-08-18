import React, { useState } from "react";
import { PlusCircle, Users, BookOpen, BarChart3 } from "lucide-react";
import Sidebar from "../components/SidebarProfessor";
import "../styles/dashboard.css";

export default function DashboardProfessor() {
  const [active, setActive] = useState("meusCursos");

  const turmas = [
    { id: 1, nome: "Java - Iniciante", alunos: 25, desafios: 10 },
    { id: 2, nome: "Python - Intermediário", alunos: 18, desafios: 8 },
    { id: 3, nome: "JavaScript - Avançado", alunos: 20, desafios: 12 },
  ];

  const handleCriarTurma = () => alert("Funcionalidade de criar turma em desenvolvimento 🚀");

  return (
    <div className="dashboard-container">
      {/* Sidebar como componente */}
      <Sidebar active={active} setActive={setActive} />

      {/* Conteúdo Principal */}
      <main className="main-content">
        <div className="main-header">
          <h1>Meus Cursos</h1>
          <button className="create-btn">
            <PlusCircle size={20} /> Criar Nova Turma
          </button>
        </div>

        <div className="turmas-grid">
          {turmas.map((turma) => (
            <div className="turma-card" key={turma.id}>
              <h2>{turma.nome}</h2>
              <div className="turma-info">
                <Users /> {turma.alunos} alunos
              </div>
              <div className="turma-info">
                <BookOpen /> {turma.desafios} desafios
              </div>
              <div className="turma-info">
                <BarChart3 /> Acompanhar progresso
              </div>
              <button>Acessar Turma</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
