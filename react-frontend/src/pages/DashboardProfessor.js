import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import Sidebar from "../components/SidebarProfessor";
import "../styles/dashboard.css";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
let decoded = null;

if (token) {
  try {
    decoded = jwtDecode(token);
    console.log(decoded.sub, decoded.role);
  } catch (error) {
    console.error("Token inválido:", error);
    localStorage.removeItem("token");
  }
} else {
  console.warn("Nenhum token encontrado, redirecionando para login...");
}

export default function DashboardProfessor() {
  const navigate = useNavigate();

  const [active, setActive] = useState("MeusCursos");
  const [openCardPorId, setOpenCardPorId] = useState(null);
  const [turmasPorCurso, setTurmasPorCurso] = useState({});
  const [turmas, setTurmas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [isModalOpenCurso, setIsModalOpenCurso] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [novoCursoNome, setNovoCursoNome] = useState("");
  const [novoCursoDesc, setNovoCursoDesc] = useState("");

  const [novaTurmaNome, setNovaTurmaNome] = useState("");
  const [novaTurmaAlunos, setNovaTurmaAlunos] = useState("");
  const [novaTurmaDesafios, setNovaTurmaDesafios] = useState(0);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  const toggleCardCurso = async (cursoId) => {
    if (openCardPorId === cursoId) {
      setOpenCardPorId(null);
      return;
    }
    setOpenCardPorId(cursoId);

    if (!turmasPorCurso[cursoId]) {
      try {
        const res = await fetch(`http://localhost:8080/api/turmas/curso/${cursoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setTurmasPorCurso(prev => ({
          ...prev,
          [cursoId]: Array.isArray(data) ? data : [],
        }));
      } catch (err) {
        console.error("Erro ao buscar turmas do curso:", err);
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/turmas", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => setTurmas(data))
      .catch(err => console.error(err));

    fetch("http://localhost:8080/api/cursos/meus", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => setCursos(data))
      .catch(err => console.error(err));
  }, []);

  const openModalCurso = () => setIsModalOpenCurso(true);
  const closeModalCurso = () => setIsModalOpenCurso(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const criarCurso = (e) => {
    e.preventDefault();
    const novoCurso = { nome: novoCursoNome, descricao: novoCursoDesc };

    fetch("http://localhost:8080/api/cursos", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(novoCurso),
    })
      .then(res => res.json())
      .then(data => {
        setCursos([...cursos, data]);
        setNovoCursoNome("");
        setNovoCursoDesc("");
        closeModalCurso();
      })
      .catch(err => console.error(err));
  };

  const criarTurma = (e) => {
    e.preventDefault();
    if (!cursoSelecionado) return;

    const novaTurma = {
      nome: novaTurmaNome,
      alunos: parseInt(novaTurmaAlunos),
      desafios: parseInt(novaTurmaDesafios),
    };

    fetch(`http://localhost:8080/api/turmas?cursoId=${cursoSelecionado.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(novaTurma),
    })
      .then(res => res.json())
      .then(data => {
        setTurmas([...turmas, data]);
        setNovaTurmaNome("");
        setNovaTurmaAlunos("");
        setNovaTurmaDesafios(0);
        setCursoSelecionado(null);
        closeModal();
      })
      .catch(err => console.error(err));
  };

  const irParaTurmaClicada = (id) => navigate(`/paginaturma/${id}`, { state: { id } });

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      {/* Conteúdo principal */}
      <main className="main-content">
        <div className="main-header">
          <h1>Meus Cursos</h1>
          <button className="create-btn" onClick={openModalCurso}>
            <PlusCircle size={20} /> Criar Novo Curso
          </button>
        </div>

        {/* Grid de cursos */}
        <div className="turmas-grid">
          {cursos.length > 0 ? (
            cursos.map(curso => (
              <div className="turma-card" key={curso.id}>
                <h2>{curso.nome}</h2>
                <p>{curso.descricao}</p>

                {openCardPorId === curso.id && (
                  <div className="turmas-do-curso">
                    {!turmasPorCurso[curso.id] ? (
                      <p>Carregando...</p>
                    ) : turmasPorCurso[curso.id].length > 0 ? (
                      turmasPorCurso[curso.id].map(turma => (
                        <div className="turma-item" key={turma.id}>
                          <span>{turma.nome}</span>
                          <span>{turma.alunos} alunos</span>
                          <span>{turma.desafios} desafios</span>
                          <button onClick={() => irParaTurmaClicada(turma.id)}>Ver turma</button>
                        </div>
                      ))
                    ) : (
                      <p>Não há turmas, crie uma!</p>
                    )}
                    <button
                      className="create-btn"
                      onClick={() => {
                        setCursoSelecionado(curso);
                        openModal();
                      }}
                    >
                      <PlusCircle size={20} /> Criar Nova Turma
                    </button>
                  </div>
                )}

                <button onClick={() => toggleCardCurso(curso.id)}>Acessar curso</button>
              </div>
            ))
          ) : (
            <p>Você não tem cursos</p>
          )}
        </div>
      </main>

      {/* Modais */}
      {isModalOpenCurso && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Criar Novo Curso</h2>
            <form onSubmit={criarCurso}>
              <label>
                Nome do curso:
                <input type="text" value={novoCursoNome} onChange={e => setNovoCursoNome(e.target.value)} required />
              </label>
              <label>
                Descrição:
                <input type="text" value={novoCursoDesc} onChange={e => setNovoCursoDesc(e.target.value)} required />
              </label>
              <div className="modal-buttons">
                <button type="submit">Criar</button>
                <button type="button" onClick={closeModalCurso}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && cursoSelecionado && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Criar Nova Turma em {cursoSelecionado.nome}</h2>
            <form onSubmit={criarTurma}>
              <label>
                Nome da Turma:
                <input type="text" value={novaTurmaNome} onChange={e => setNovaTurmaNome(e.target.value)} required />
              </label>
              <label>
                Nº de Alunos:
                <input type="number" min="1" value={novaTurmaAlunos} onChange={e => setNovaTurmaAlunos(e.target.value)} required />
              </label>
              <label>
                Nº de Desafios:
                <input type="number" min="0" value={novaTurmaDesafios} onChange={e => setNovaTurmaDesafios(e.target.value)} required />
              </label>
              <div className="modal-buttons">
                <button type="submit">Criar</button>
                <button type="button" onClick={() => { closeModal(); setCursoSelecionado(null); }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}