import React, { useState, useEffect } from "react";
import { Users, BookOpen, BarChart3, PlusCircle } from "lucide-react";
import SidebarAluno from "../components/SidebarAluno";
import "../styles/dashboard.css";

export default function DashboardAluno() {
  const [active, setActive] = useState("meusCursos");
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true); // controle de carregamento
  const [error, setError] = useState(null); // controle de erro

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.warn("Nenhum token encontrado, redirecionando para login...");
      setError("Você precisa estar logado para ver seus cursos.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/cursos/aluno/meus", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ao carregar cursos: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Cursos recebidos:", data); // 👀 debug no console
        setTurmas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        setError("Não foi possível carregar os cursos.");
        setLoading(false);
      });
  }, [token]);

  const handleEnviarDesafio = (turmaNome) => {
    alert(`Enviando resposta para ${turmaNome} 🚀`);
  };

  return (
    <div className="dashboard-container">
      <SidebarAluno active={active} setActive={setActive} />

      <main className="main-content">
        <div className="main-header">
          <h1>Meus Cursos</h1>
          <button className="create-btn">
            <PlusCircle size={20} /> Novo Desafio
          </button>
        </div>

        {/* Exibe carregando, erro ou lista */}
        {loading ? (
          <p>Carregando cursos...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : turmas.length === 0 ? (
          <p>Você ainda não está matriculado em nenhum curso.</p>
        ) : (
          <div className="turmas-grid">
            {turmas.map((turma) => (
              <div className="turma-card" key={turma.id}>
                <h2>{turma.nome}</h2>

                <div className="turma-info">
                  <Users /> Professor: {turma.professor?.nome || "—"}
                </div>

                <div className="turma-info">
                  <BarChart3 /> Progresso: {turma.progresso || 0}%
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
        )}
      </main>
    </div>
  );
}