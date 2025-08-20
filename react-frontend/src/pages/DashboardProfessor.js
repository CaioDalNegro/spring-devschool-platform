import React, { useState, useEffect } from "react";
import { PlusCircle, Users, BookOpen, BarChart3 } from "lucide-react";
import Sidebar from "../components/SidebarProfessor";
import "../styles/dashboard.css";

export default function DashboardProfessor() {
  
  // Estado para controlar qual aba da sidebar está ativa
  const [active, setActive] = useState("meusCursos");

  // Estado para armazenar as turmas vindas do backend
  const [turmas, setTurmas] = useState([]);

  // Estado para controlar a exibição do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para os campos do formulário do modal
  const [novaTurmaNome, setNovaTurmaNome] = useState("");
  const [novaTurmaAlunos, setNovaTurmaAlunos] = useState("");

  // useEffect para buscar turmas do backend ao montar o componente
  useEffect(() => {
    fetch("http://localhost:8080/api/turmas") // endpoint do backend
      .then((res) => res.json())
      .then((data) => setTurmas(data)) // salva as turmas no estado
      .catch((err) => console.error("Erro ao buscar turmas:", err));
  }, []); // array vazio = executa apenas 1 vez

  // Função para abrir o modal
  const openModal = () => setIsModalOpen(true);

  // Função para fechar o modal
  const closeModal = () => setIsModalOpen(false);

  // Função chamada ao enviar o formulário de criar nova turma
  const criarTurma = (e) => {
    e.preventDefault(); // evita refresh da página

    // Cria objeto com os dados da nova turma
    const novaTurma = {
      nome: novaTurmaNome,
      alunos: parseInt(novaTurmaAlunos),
      desafios: 0, // inicialmente 0 desafios
    };
    
    // Envia para o backend
    fetch("http://localhost:8080/api/turmas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTurma),
    })
      .then((res) => res.json())
      .then((data) => {
        // Adiciona a nova turma à lista de turmas
        setTurmas([...turmas, data]);

        // Limpa campos do formulário
        setNovaTurmaNome("");
        setNovaTurmaAlunos("");

        // Fecha o modal
        closeModal();
      })
      .catch((err) => console.error("Erro ao criar turma:", err));
  };

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