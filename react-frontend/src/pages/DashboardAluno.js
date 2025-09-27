import React, { useState, useEffect } from "react";
import { Users, BookOpen, BarChart3 } from "lucide-react";
import SidebarAluno from "../components/SidebarAluno";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function DashboardAluno() {
  const [active, setActive] = useState("meusCursos");
  const [cursos, setCursos] = useState([]); // cursos do aluno
  const [turmasPorCurso, setTurmasPorCurso] = useState({}); // turmas agrupadas por curso
  const [openCardPorId, setOpenCardPorId] = useState(null); // curso aberto no card
  const [isModalOpen, setIsModalOpen] = useState(false); // modal de turmas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Você precisa estar logado para ver seus cursos.");
      setLoading(false);
      return;
    }

    // busca cursos do aluno
    fetch("http://localhost:8080/api/cursos/aluno/meus", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        email: "caio@gmail.com",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const cursosRecebidos = data.cursos || [];
        setCursos(cursosRecebidos);

        // extrai turmas por curso
        const turmasPorCursoTemp = {};
        cursosRecebidos.forEach((curso) => {
          turmasPorCursoTemp[curso.id] = curso.turmas || [];
        });
        setTurmasPorCurso(turmasPorCursoTemp);
        setLoading(false);
      })
      .catch(() => {
        setError("Não foi possível carregar os cursos.");
        setLoading(false);
      });
  }, [token]);

  const toggleCardCurso = (cursoId) => {
    setOpenCardPorId(openCardPorId === cursoId ? null : cursoId);
  };

  const abrirModalTurmas = (cursoId) => {
    setOpenCardPorId(cursoId); // abre o card do curso
    setIsModalOpen(true);
  };

  const fecharModalTurmas = () => {
    setIsModalOpen(false);
    setOpenCardPorId(null);
  };

  const irParaTurma = (turmaId) => {
    navigate(`/turma/${turmaId}`);
  };

  return (
    <div className="dashboard-container">
      <SidebarAluno active={active} setActive={setActive} />

      <main className="main-content">
        <div className="main-header">
          <h1>Meus Cursos</h1>
        </div>

        {loading ? (
          <p>Carregando cursos...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : cursos.length === 0 ? (
          <p>Você ainda não está matriculado em nenhum curso.</p>
        ) : (
          <div className="turmas-grid">
            {cursos.map((curso) => (
              <div className="turma-card" key={curso.id}>
                <h2>{curso.nome}</h2>
                <p>{curso.descricao}</p>

                 <button onClick={() => abrirModalTurmas(curso.id)}>
                    Ver turmas
                  </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal de turmas */}
        {isModalOpen && openCardPorId && (
          <div className="modal-overlay" onClick={fecharModalTurmas}>
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()} // previne fechamento ao clicar no modal
            >
              <h2>Turmas do Curso</h2>
              {turmasPorCurso[openCardPorId] &&
              turmasPorCurso[openCardPorId].length > 0 ? (
                turmasPorCurso[openCardPorId].map((turma) => (
                  <div className="turma-item" key={turma.id}>
                    <span>{turma.nome}</span>
                    <span>{turma.alunos} alunos</span>
                    <span>{turma.desafios} desafios</span>
                    <button onClick={() => irParaTurma(turma.id)}>
                      Ver turma
                    </button>
                  </div>
                ))
              ) : (
                <p>Não há turmas cadastradas neste curso.</p>
              )}

              <div className="modal-buttons">
                <button type="button" onClick={fecharModalTurmas}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
