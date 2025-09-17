import React, { useState, useEffect } from "react";
import { Users, BookOpen, BarChart3, PlusCircle } from "lucide-react";
import SidebarAluno from "../components/SidebarAluno";
import "../styles/dashboard.css";

export default function DashboardAluno() {
  const [active, setActive] = useState("meusCursos");
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

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
        "Content-Type": "application/json",
        "email": "caio@gmail.com"
      },
    })

      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ao carregar cursos: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);

        // Extrai todas as turmas de todos os cursos
        const cursos = data.cursos || [];
        const turmasExtraidas = cursos.flatMap((curso) =>
          curso.turmas.map((turma) => ({
            ...turma,
            cursoNome: curso.nome,   
            cursoDescricao: curso.descricao,
          }))
        );

        setTurmas(turmasExtraidas);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        setError("Não foi possível carregar os cursos.");
        setLoading(false);
      });
  }, [token]);

  const handleEnviarDesafio = (turmaNome) => {
    alert(`Enviando resposta para a turma ${turmaNome} 🚀`);
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
          <div className="sem-turmas">
            Você ainda não está matriculado em nenhum curso.
          </div>
        ) : (
          <div className="turmas-grid">
            {turmas.map((turma) => (
              <div className="turma-card" key={turma.id}>
                <h2>{turma.cursoNome} - {turma.nome}</h2>

                <div className="turma-info">
                  <Users /> Alunos: {turma.alunos}
                </div>

                <div className="turma-info">
                  <BookOpen /> Desafios: {turma.desafios}
                </div>

                <div className="turma-info">
                  <BarChart3 /> Curso: {turma.cursoDescricao}
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