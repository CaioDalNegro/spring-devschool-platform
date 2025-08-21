import React, { useState, useEffect } from "react";
import { PlusCircle, Users, BookOpen, BarChart3 } from "lucide-react";
import Sidebar from "../components/SidebarProfessor";
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


export default function DashboardProfessor() {
  
  // Estado para controlar qual aba da sidebar está ativa
  const [active, setActive] = useState("meusCursos");

  // Estado para armazenar as turmas vindas do backend
  const [turmas, setTurmas] = useState([]);

  const [cursos, setCursos] = useState([]);

  const [isModalOpenCurso, setIsModalOpenCurso] = useState(false);

  // Estado para controlar a exibição do modal
  const [isModalOpen, setIsModalOpen] = useState(false);



  // Estados para os campos do formulário do modal
  const [novaTurmaNome, setNovaTurmaNome] = useState("");
  const [novaTurmaAlunos, setNovaTurmaAlunos] = useState("");


 // Função para abrir o modal curso
  const openModalCurso = () => setIsModalOpenCurso(true);

  // Função para fechar o modal curso
  const closeModalCurso = () => setIsModalOpenCurso(false);

  // Função para abrir o modal
  const openModal = () => setIsModalOpen(true);

  // Função para fechar o modal
  const closeModal = () => setIsModalOpen(false);

    // Buscar turmas
    useEffect(() => {
      const token = localStorage.getItem("token");

      fetch("http://localhost:8080/api/turmas", {
        headers: {
          "Authorization": `Bearer ${token}`,   // 👈 JWT vai aqui
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => setTurmas(data))
        .catch((err) => console.error("Erro ao buscar turmas:", err));
    }, []);

    useEffect(() => {
      const token = localStorage.getItem("token");

      fetch("http://localhost:8080/api/cursos/meus", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => setCursos(data))
        .catch(err => console.error("Erro ao buscar cursos:", err));
    }, []);

    console.log("cursos:" + cursos);

    // Criar turma
    const criarTurma = (e) => {
      e.preventDefault();

      const novaTurma = {
        nome: novaTurmaNome,
        alunos: parseInt(novaTurmaAlunos),
        desafios: 0,
      };

      const token = localStorage.getItem("token");

      fetch("http://localhost:8080/api/turmas", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,   // 👈 JWT também aqui
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novaTurma),
      })
        .then((res) => res.json())
        .then((data) => {
          setTurmas([...turmas, data]);
          setNovaTurmaNome("");
          setNovaTurmaAlunos("");
          closeModal();
        })
        .catch((err) => console.error("Erro ao criar turma:", err));
    };

//   const novoCurso = {
//     e.preventDefault();
//
//     const novoCurso = {
//
//     }
//   }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      {/* Conteúdo principal */}
      <main className="main-content">
        {/* Cabeçalho com título e botão */}
        <div className="main-header">
          <h1>Meus Cursos</h1>
          <button className="create-btn" onClick={openModal}>
            <PlusCircle size={20} /> Criar Nova Turma
          </button>
          <button className="create-btn" onClick={openModal}>
             <PlusCircle size={20} /> Criar Novo Curso
          </button>
        </div>

        {/* Grid de turmas */}
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

      {/* Modal */}
      {
      isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Criar Nova Turma</h2>
            <form onSubmit={criarTurma}>
              <label>
                Nome da Turma:
                <input
                  type="text"
                  placeholder="Ex: Turma de React"
                  value={novaTurmaNome}
                  onChange={(e) => setNovaTurmaNome(e.target.value)}
                  required
                />
              </label>
              <label>
                Número max. de Alunos:
                <input
                  type="number"
                  min="1"
                  value={novaTurmaAlunos}
                  onChange={(e) => setNovaTurmaAlunos(e.target.value)}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="submit">Criar</button>
                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}