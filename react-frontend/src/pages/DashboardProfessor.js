import React, { useState, useEffect } from "react";
import { PlusCircle, Users, BookOpen, BarChart3 } from "lucide-react";
import Sidebar from "../components/SidebarProfessor";
import "../styles/dashboard.css";
import { jwtDecode } from "jwt-decode";
import {v4 as uuidv4} from 'uuid';

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

   //serve para abrir um card especifico
   //os cards ficam esperando esse id ser igual ao deles
   //e quando for eles vao abrir
   const [openCardPorId, setOpenCardPorId] = useState(null);

    const [turmasPorCurso, setTurmasPorCurso] = useState({});


  // Estado para armazenar as turmas vindas do backend
  const [turmas, setTurmas] = useState([]);

  const [cursos, setCursos] = useState([]);

  const [isModalOpenCurso, setIsModalOpenCurso] = useState(false);

  // Estado para controlar a exibição do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

 // Estados para os campos do formulário do modal curso
  const [novoCursoNome, setNovoCursoNome] = useState("");

// Estados para os campos do formulário do modal curso
  const [novoCursoDesc, setNovoCursoDesc] = useState("");



  // Estados para os campos do formulário do modal
    const [novaTurmaNome, setNovaTurmaNome] = useState("");
    const [novaTurmaAlunos, setNovaTurmaAlunos] = useState("");
    const [novaTurmaDesafios, setNovaTurmaDesafios] = useState(0);
    const [cursoSelecionado, setCursoSelecionado] = useState(null); // curso que está criando a turma


   const PegarIdDoCardQVaiSerAberto = (id) => {
        if(openCardPorId === id){
            setOpenCardPorId(null);
        } else {
            setOpenCardPorId(id);
        }
   }

   const toggleCardCurso = async (cursoId) => {
     console.log("id cliclado: ", cursoId, "turmas", turmasPorCurso[cursoId]);

     if(openCardPorId === cursoId){
       setOpenCardPorId(null);
       return;
     }

     setOpenCardPorId(cursoId);

     if(!turmasPorCurso[cursoId]){
       const token = localStorage.getItem("token");

       try {
         const res = await fetch(`http://localhost:8080/api/turmas/curso/${cursoId}`, {
           headers: {
             "Authorization": `Bearer ${token}`,
             "Content-Type": "application/json"
           }
         });
         const data = await res.json();

         console.log("dados recebidos:", data); // verifique aqui se é array

         setTurmasPorCurso(prev => ({
           ...prev,
           [cursoId]: Array.isArray(data) ? data : []  // garante que seja array
         }));
       } catch(err) {
         console.error("Erro ao buscar turmas do curso:", err);
       }
     }
   };





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
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => setTurmas(data))
        .catch((err) => console.error("Erro ao buscar turmas:", err));
    }, []);

    //buscar cursos
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

    console.log("cursos:", cursos);




    // Criar turma
    const criarTurma = (e) => {
      e.preventDefault();

      if (!cursoSelecionado) return;

      const novaTurma = {
        nome: novaTurmaNome,
        alunos: parseInt(novaTurmaAlunos),
        desafios: parseInt(novaTurmaDesafios),
      };

      const token = localStorage.getItem("token");

      fetch(`http://localhost:8080/api/turmas?cursoId=${cursoSelecionado.id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
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
        .catch(err => console.error("Erro ao criar turma:", err));
    };


    // Criar curso
    const criarCurso = (e) => {
      e.preventDefault();

      const novoCurso = {
        nome: novoCursoNome,
        descricao: novoCursoDesc
      };


      const token = localStorage.getItem("token");

      fetch("http://localhost:8080/api/cursos", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoCurso),
      })
        .then((res) => res.json())
        .then((data) => {
          setCursos([...cursos, data]);
          setNovoCursoNome("");
          setNovoCursoDesc("");
          closeModal();
        })
        .catch((err) => console.error("Erro ao criar curso:", err));
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

          <button className="create-btn" onClick={openModalCurso}>
             <PlusCircle size={20} /> Criar Novo Curso
          </button>
        </div>




      {/* Grid de cursos */}
      {
        cursos != null ? (
            <div className="turmas-grid" >
                {cursos.map(curso => (
                  <div className="turma-card" key={curso.id}>
                    <h2>{curso.nome}</h2>
                    <p>{curso.descricao}</p>

                    {openCardPorId === curso.id && (
                      <div className="turmas-do-curso">
                        {!turmasPorCurso[curso.id] ? (
                          <p>Carregando...</p>
                        ) : turmasPorCurso[curso.id].length > 0 ? (
                          <div className="lista-turmas">
                            {turmasPorCurso[curso.id].map(turma => (
                              <div className="turma-item" key={turma.id}>
                                <span className="nome-turma">{turma.nome}</span>
                                <span className="qtd-alunos">{turma.alunos} qtdd alunos </span>
                                <span className="qtd-desafios">{turma.desafios} qtdd desafios</span>
                              </div>
                            ))}
                          </div>
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

                ))}

            </div>
        ) : (
            <div className="turmas-grid">
              <div className="turma-card">
                <p> voce nao tem cursos </p>
              </div>

        </div>
        )
      }

      </main>


      {/* Modal */}
      {isModalOpen && cursoSelecionado && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Criar Nova Turma em {cursoSelecionado.nome}</h2>
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
              <label>
                Quantidade de Desafios:
                <input
                  type="number"
                  min="0"
                  value={novaTurmaDesafios}
                  onChange={(e) => setNovaTurmaDesafios(e.target.value)}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="submit">Criar</button>
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    setCursoSelecionado(null); // limpa o curso selecionado
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}




    { /*modal de curso*/}
    {
        isModalOpenCurso && (
            <div>
                <div className="modal">
                    <h2>Criar Novo Curso </h2>
                    <form onSubmit={criarCurso}>
                      <label>
                        Nome do curso:
                        <input
                          type="text"
                          placeholder="Ex: Java para iniciantes"
                          value={novoCursoNome}
                          onChange={(e) => setNovoCursoNome(e.target.value)}
                          required
                        />
                      </label>
                    <label>
                        Descricao do curso:
                        <input
                          type="text"
                          placeholder="Ex: curso do basico ao avançado em java"
                          value={novoCursoDesc}
                          onChange={(e) => setNovoCursoDesc(e.target.value)}
                          required
                        />
                      </label>
                      <div className="modal-buttons">
                        <button type="submit">Criar</button>
                        <button type="button" onClick={closeModalCurso}>
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>

            </div>

        )
    }
    </div>
  );
}