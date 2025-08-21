// src/pages/DashboardAluno.js
import React, { useState } from "react";
import { Users, BookOpen, BarChart3, PlusCircle } from "lucide-react";
import SidebarAluno from "../components/SidebarAluno";
import "../styles/dashboard.css";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
let decoded = null;

if (token) {
  try {
    decoded = jwtDecode(token);
    console.log(decoded.sub);  // email
    console.log(decoded.role); // role
  } catch (error) {
    console.error("Token inválido:", error);
    localStorage.removeItem("token"); // limpa token quebrado
  }
} else {
  console.warn("Nenhum token encontrado, redirecionando para login...");
  // aqui você pode redirecionar para /login
}


export default function DashboardAluno() {
  const [active, setActive] = useState("meusCursos");

  const turmas = [
    { id: 1, nome: "Java - Iniciante", professor: "Prof. Carlos", progresso: 60 },
    { id: 2, nome: "Python - Intermediário", professor: "Prof. Ana", progresso: 40 },
    { id: 3, nome: "JavaScript - Avançado", professor: "Prof. Lucas", progresso: 75 },
  ];

  const handleEnviarDesafio = (turmaNome) => {
    alert(`Enviando resposta para ${turmaNome} 🚀`);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <SidebarAluno active={active} setActive={setActive} />

      {/* Conteúdo Principal */}
      <main className="main-content">
        <div className="main-header">
          <h1>Meus Cursos</h1>
          <button className="create-btn">
            <PlusCircle size={20} /> Novo Desafio
          </button>
        </div>

        <div className="turmas-grid">
          {turmas.map((turma) => (
            <div className="turma-card" key={turma.id}>
              <h2>{turma.nome}</h2>
              <div className="turma-info">
                <Users /> Professor: {turma.professor}
              </div>
              <div className="turma-info">
                <BarChart3 /> Progresso: {turma.progresso}%
              </div>
              <div className="turma-info">
                <BookOpen /> Desafios disponíveis
              </div>
              <button onClick={() => handleEnviarDesafio(turma.nome)}>
                Enviar Resposta
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
