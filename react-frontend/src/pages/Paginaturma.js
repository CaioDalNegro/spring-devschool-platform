import React, { useState, useEffect } from "react";
import Sidebar from "../components/SidebarProfessor";
import { PlusCircle, Users, BookOpen, BarChart3 } from "lucide-react";
import "../styles/turma.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { Divide } from "lucide-react";

export default function PaginaTurma() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("meusCursos");
  
  const [emailLogado, setEmailLogado] = useState(null);
  const [roleLogado, setRoleLogado] = useState(null);

  //MURAL
  const [opcaoTurma, setOpcaoTurma] = useState("MURAL");
  

  //ATIVIDADES
  const [janelaCriarPublicacaoAtividades, setJanelaCriarPublicacaoAtividades] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [nomeAtividade, setNomeAtividade] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [descricaoAtividade, setDescricaoAtividade] = useState("");
  
  const abrirOuFecharPublicacaoAtividade = () => {
    setJanelaCriarPublicacaoAtividades(!janelaCriarPublicacaoAtividades);
  }


  //PESSOAS ou alunos
  const [janelaAddAluno, setJanelaAddAluno] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [emailDoAluno, setEmailDoAluno] = useState("");
 
  const abrirOuFecharJanelaDeAddAluno = () => {
    setJanelaAddAluno(!janelaAddAluno);
  }

  //PARA PEGAR USUARIO LOGADO E O ID DA TURMA
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmailLogado(decoded.sub);
        setRoleLogado(decoded.role);
        console.log("EMAIL: ", decoded.sub);  
        console.log("ROLE: " ,decoded.role); 
        console.log("TURMA ID: " ,id); 
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
        navigate("/"); 
      }
    } else {
      console.warn("Nenhum token encontrado, redirecionando para login...");
      navigate("/");
    }
  }, [navigate]); 

  // MURAL
  const mudarParaMural = () => {
    setOpcaoTurma("MURAL");

  }


  // ATIIVIDADES
  const mudarParaAtividades = () => {
    setOpcaoTurma("ATIVIDADES");   
  }

  // CRIANDO ATIVIDADES NOVAS
  const criarAtividade = (e) => {
    e.preventDefault();
    
    const novaAtividade = {
      //id: "",
      idTurma: id,
      titulo: nomeAtividade,
      descricao: descricaoAtividade,
      dataEntrega: dataEntrega,
      //dataPublicacao: ""
    }

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/atividades`, {
      method: "POST",
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaAtividade)
    })
    .then(res => res.json())
    .then(data => {
        setAtividades([...atividades, data]);
        setNomeAtividade("");
        setDescricaoAtividade("");
        setDataEntrega(null);
        abrirOuFecharPublicacaoAtividade();
    })
    .catch(err => console.error("Erro ao criar turmas ",err));
  };

  //BUSCAR TODAS AS ATIVIDADES
  useEffect(() => {
  const token = localStorage.getItem("token");
  
        fetch("http://localhost:8080/api/atividades/minhasAtividades", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "idTurma": id
          }
        })
          .then((res) => res.json())
          .then((data) => setAtividades(data))
          .catch((err) => console.error("Erro ao buscar atividades:", err));
      }, []);
    
        
    
        console.log("atividades:", atividades);




  // PESSOAS
  const mudarParaPessoas = () => {
    setOpcaoTurma("PESSOAS");
    
  }

  // ADD ALUNOS NA TURMA
  const addAluno = (e) => {
    e.preventDefault();
        
      const novaturmaAluno = {
        idTurma: id
        
      }


        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/api/turmaAlunos?emailAluno=${emailDoAluno}`, {
          method: "POST",
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novaturmaAluno)
        })
        .then(res => res.json())
        .then(data => {
            setAlunos([...alunos, data]);
            setEmailDoAluno("")
            abrirOuFecharJanelaDeAddAluno();
        })
        .catch(err => console.error("Erro ao add aluno ",err));
  };
  
  //BUSCAR TODAS OS ALUNOS da turma
  //BUSCAR TODOS OS ALUNOS da turma
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    fetch(`http://localhost:8080/api/turmaAlunos/${id}/alunos`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => setAlunos(data))
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, [id]);  
        
    
        console.log("alunos:", alunos);
  

  return (
    <div className="dashboard-container">
     
      <Sidebar active={active} setActive={setActive} />
      
      <main>
        <div className="deixarTudoDeLado"> 
          <button className="create-btn" onClick={mudarParaMural}>Mural</button>
          <button className="create-btn" onClick={mudarParaAtividades}>Atividades</button>
          <button className="create-btn" onClick={mudarParaPessoas}>Pessoas</button>
        </div>
        <div>
          { // MURAL
            opcaoTurma === "MURAL" ? (
              <div>
                <h1>Mural</h1>
              </div> 
            ) : 
            ( // ATIVIDADES
              opcaoTurma === "ATIVIDADES" ? (
                <div>
                  <div>
                    <h1>Atividade</h1>
                    <button className="create-btn" onClick={abrirOuFecharPublicacaoAtividade}>
                      <PlusCircle size={20} /> Criar Nova Atividade
                    </button>
                  </div>
                  {/* TODAS AS ATIVIDADES EM ORDEM DE LANÇAMENTO */}
                  <div className="atividades-lista">
                    {atividades.length > 0 ? (
                      atividades.map((atividade) => (
                        <div key={atividade.id} className="atividade-card">
                          <h3>{atividade.titulo}</h3>
                          <p>{atividade.descricao}</p>
                          <p><strong>Data de entrega:</strong> {atividade.dataEntrega}</p>
                          <p><em>Publicado em: {atividade.dataPublicacao}</em></p>
                        </div>
                      ))
                    ) : (
                      <p>Nenhuma atividade cadastrada.</p>
                    )}
                  </div>

                </div> 
              ) : 
              ( // PESSOAS
                <div>
                  <h1>Pessoa</h1>
                  <button className="create-btn" onClick={abrirOuFecharJanelaDeAddAluno}>
                    <PlusCircle size={20} /> Add Novo Aluno
                  </button>
                  {/* TODAS AS PESSOAS EM ORDEM DE LANÇAMENTO */}
                  <div className="atividades-lista">
                    {alunos.length > 0 ? (
                      alunos.map((aluno) => (
                        <div key={aluno.id} className="atividade-card">
                          <h3>Nome: {aluno.nome}</h3>
                          <h3>Email: {aluno.email}</h3>
                        </div>
                      ))
                    ) : (
                      <p>Nenhum aluno cadastrado.</p>
                    )}

                  </div>
                </div> 
              )
            )
          }

      </div>

      {//MURAL

      }    

      {// ATIVIDADES
        janelaCriarPublicacaoAtividades && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Criar Nova Atividade </h2>
            <form onSubmit={criarAtividade}>
              <label>
                Nome da atividade:
                <input
                  type="text"
                  placeholder="Ex: tarefa 1"
                  value={nomeAtividade}
                  onChange={(e) => setNomeAtividade(e.target.value)}
                  required
                />
              </label>
              <label>
                Descrição da atividade:
                <input
                  type="text"
                  placeholder="Ex: tarefa 1"
                  value={descricaoAtividade}
                  onChange={(e) => setDescricaoAtividade(e.target.value)}
                  required
                />
              </label>
              <label>
                Data de Entrega:
                <input 
                  type="date"
                  value={dataEntrega}
                  onChange={(e) => setDataEntrega(e.target.value)}
                  required

                />
                </label>
              <div className="modal-buttons">
                <button type="submit">Criar</button>
                <button
                  type="button"
                  onClick={() => {
                    abrirOuFecharPublicacaoAtividade(); 
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {// PEssoas ou alunos
        janelaAddAluno && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Adicionar Novo Aluno </h2>
            <form onSubmit={addAluno}>
              <label>
                email do Aluno: 
                <input
                  type="text"
                  placeholder="1111 1111"
                  value={emailDoAluno}
                  onChange={(e) => setEmailDoAluno(e.target.value)}
                  required
                />
              </label>
              
              <div className="modal-buttons">
                <button type="submit">Adicionar</button>
                <button
                  type="button"
                  onClick={() => {
                    abrirOuFecharJanelaDeAddAluno(); 
                  }}
                >
                Cancelar
              </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </main>
    </div>
  );
}
