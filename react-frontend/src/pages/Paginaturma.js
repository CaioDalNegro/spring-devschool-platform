import React, { useState, useEffect } from "react";
import Sidebar from "../components/SidebarProfessor";
import { PlusCircle, Users, BookOpen, BarChart3 } from "lucide-react";
import "../styles/turma.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";

export default function PaginaTurma() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("meusCursos");

  const [emailLogado, setEmailLogado] = useState(null);
  const [roleLogado, setRoleLogado] = useState(null);
  const [opcaoTurma, setOpcaoTurma] = useState("MURAL");
  const [turma, setTurma] = useState({});

  // MURAL
  const [janelaCriarPublicacaoAula, setJanelaCriarPublicacaoAula] = useState(false);
  const [aulas, setAulas] = useState([]);
  const [tituloAula, setTituloAula] = useState("");
  const [descricaoAula, setDescricaoAula] = useState("");
  const [fileAula, setFileAula] = useState(null);

  // ATIVIDADES
  const [janelaCriarPublicacaoAtividades, setJanelaCriarPublicacaoAtividades] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [nomeAtividade, setNomeAtividade] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [descricaoAtividade, setDescricaoAtividade] = useState("");
  const [file, setFile] = useState(null);

  // PESSOAS
  const [janelaAddAluno, setJanelaAddAluno] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [emailDoAluno, setEmailDoAluno] = useState("");

  // ==============================
  // LOGIN + TURMA DETALHES
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmailLogado(decoded.sub);
        setRoleLogado(decoded.role);
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/turmas/turmaDetalhes/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) return res.text().then((text) => { throw new Error(text) });
        return res.json();
      })
      .then((data) => setTurma(data))
      .catch((err) => console.error("Erro ao carregar turma: ", err));
  }, [id]);

  // ==============================
  // FUNÇÕES DE AULAS
  const abrirOuFecharJanelaDeAddAula = () => setJanelaCriarPublicacaoAula(!janelaCriarPublicacaoAula);

  const criarAula = (e) => {
    e.preventDefault();
    if (!fileAula) return alert("Escolha um PDF antes de enviar!");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", fileAula);
    formData.append("aula", new Blob([JSON.stringify({
      idTurma: id,
      titulo: tituloAula,
      descricao: descricaoAula
    })], { type: "application/json" }));

    fetch(`http://localhost:8080/api/aulas`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        setAulas([...aulas, data]);
        setTituloAula("");
        setDescricaoAula("");
        setFileAula(null);
        abrirOuFecharJanelaDeAddAula();
      })
      .catch((err) => console.error("Erro ao criar aula", err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/aulas/minhasAulas", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        idTurma: id,
      },
    })
      .then((res) => res.json())
      .then((data) => setAulas(data))
      .catch((err) => console.error("Erro ao buscar aulas:", err));
  }, [id]);

  // ==============================
  // FUNÇÕES DE ATIVIDADES
  const abrirOuFecharPublicacaoAtividade = () => setJanelaCriarPublicacaoAtividades(!janelaCriarPublicacaoAtividades);

  const criarAtividade = (e) => {
    e.preventDefault();
    if (!file) return alert("Escolha um PDF antes de enviar!");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("atividade", new Blob([JSON.stringify({
      idTurma: id,
      titulo: nomeAtividade,
      descricao: descricaoAtividade,
      dataEntrega: dataEntrega
    })], { type: "application/json" }));

    fetch(`http://localhost:8080/api/atividades`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        setAtividades([...atividades, data]);
        setNomeAtividade("");
        setDescricaoAtividade("");
        setDataEntrega("");
        setFile(null);
        abrirOuFecharPublicacaoAtividade();
      })
      .catch((err) => console.error("Erro ao criar atividade", err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/atividades/minhasAtividades", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        idTurma: id,
      },
    })
      .then((res) => res.json())
      .then((data) => setAtividades(data))
      .catch((err) => console.error("Erro ao buscar atividades:", err));
  }, [id]);

  // ==============================
  // FUNÇÕES DE ALUNOS
  const abrirOuFecharJanelaDeAddAluno = () => setJanelaAddAluno(!janelaAddAluno);

  const addAluno = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const novaturmaAluno = { idTurma: id };

    fetch(`http://localhost:8080/api/turmaAlunos?emailAluno=${emailDoAluno}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaturmaAluno),
    })
      .then((res) => res.json())
      .then((data) => {
        setAlunos([...alunos, data]);
        setEmailDoAluno("");
        abrirOuFecharJanelaDeAddAluno();
      })
      .catch((err) => console.error("Erro ao adicionar aluno", err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/turmaAlunos/${id}/alunos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setAlunos(data))
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, [id]);

  // ==============================
  return (
    <div className="dashboard-container">
      <Sidebar active={active} setActive={setActive} />

      <main className="main-content">
        {/* Header */}
        <div className="turma-header">
          <div>
            <h1 className="turma-nome">{turma.nome}</h1>
            <p><strong>Alunos:</strong> {turma.alunos}</p>
            <p><strong>Desafios:</strong> {turma.desafios}</p>
          </div>
          <div className="usuario-logado">
            <p>👤 {emailLogado}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-buttons">
          <button className={opcaoTurma === "MURAL" ? "tab active" : "tab"} onClick={() => setOpcaoTurma("MURAL")}>
            <BookOpen size={18} /> Mural
          </button>
          <button className={opcaoTurma === "ATIVIDADES" ? "tab active" : "tab"} onClick={() => setOpcaoTurma("ATIVIDADES")}>
            <BarChart3 size={18} /> Atividades
          </button>
          <button className={opcaoTurma === "PESSOAS" ? "tab active" : "tab"} onClick={() => setOpcaoTurma("PESSOAS")}>
            <Users size={18} /> Pessoas
          </button>
        </div>

        {/* Conteúdo */}
        <div className="tab-content">
          {/* MURAL */}
          {opcaoTurma === "MURAL" && (
            <section>
              <div className="section-header">
                <h2>Mural</h2>
                <button className="btn" onClick={abrirOuFecharJanelaDeAddAula}>
                  <PlusCircle size={18} /> Criar Aula
                </button>
              </div>
              <div className="card-list">
                {aulas.length > 0 ? aulas.map((aula) => (
                  <div className="card" key={aula.id}>
                    <h3>{aula.titulo}</h3>
                    <p>{aula.descricao}</p>
                    <small>Publicado em: {aula.dataPublicacao}</small>
                    {aula.caminho && (
                      <a href={`http://localhost:8080/uploads/${aula.caminho}`} target="_blank" rel="noopener noreferrer">
                        📄 Abrir PDF
                      </a>
                    )}
                  </div>
                )) : <p>Nenhuma aula cadastrada.</p>}
              </div>
            </section>
          )}

          {/* ATIVIDADES */}
          {opcaoTurma === "ATIVIDADES" && (
            <section>
              <div className="section-header">
                <h2>Atividades</h2>
                <button className="btn" onClick={abrirOuFecharPublicacaoAtividade}>
                  <PlusCircle size={18} /> Criar Atividade
                </button>
              </div>
              <div className="card-list">
                {atividades.length > 0 ? atividades.map((atividade) => (
                  <div className="card" key={atividade.id}>
                    <h3>{atividade.titulo}</h3>
                    <p>{atividade.descricao}</p>
                    <p><strong>Entrega:</strong> {atividade.dataEntrega}</p>
                    <small>Publicado em: {atividade.dataPublicacao}</small>
                    {atividade.caminho && (
                      <a href={`http://localhost:8080/uploads/${atividade.caminho}`} target="_blank" rel="noopener noreferrer">
                        📄 Abrir PDF
                      </a>
                    )}
                    <button className="btn small">Enviar tarefa</button>
                  </div>
                )) : <p>Nenhuma atividade cadastrada.</p>}
              </div>
            </section>
          )}

          {/* PESSOAS */}
          {opcaoTurma === "PESSOAS" && (
            <section>
              <div className="section-header">
                <h2>Alunos</h2>
                <button className="btn" onClick={abrirOuFecharJanelaDeAddAluno}>
                  <PlusCircle size={18} /> Adicionar Aluno
                </button>
              </div>
              <div className="card-list">
                {alunos.length > 0 ? alunos.map((aluno) => (
                  <div className="card" key={aluno.id}>
                    <h3>{aluno.nome}</h3>
                    <p>{aluno.email}</p>
                  </div>
                )) : <p>Nenhum aluno cadastrado.</p>}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Modais */}
      {janelaCriarPublicacaoAula && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Criar nova Aula</h2>
            <form onSubmit={criarAula}>
              <label>
                Nome da aula:
                <input type="text" value={tituloAula} onChange={(e) => setTituloAula(e.target.value)} required />
              </label>
              <label>
                Descrição:
                <input type="text" value={descricaoAula} onChange={(e) => setDescricaoAula(e.target.value)} required />
              </label>
              <label>
                PDF:
                <input type="file" accept="application/pdf" onChange={(e) => setFileAula(e.target.files[0])} />
              </label>
              <div className="modal-buttons">
                <button type="submit">Criar</button>
                <button type="button" onClick={abrirOuFecharJanelaDeAddAula}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {janelaCriarPublicacaoAtividades && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Criar Nova Atividade</h2>
            <form onSubmit={criarAtividade}>
              <label>
                Nome:
                <input type="text" value={nomeAtividade} onChange={(e) => setNomeAtividade(e.target.value)} required />
              </label>
              <label>
                Descrição:
                <input type="text" value={descricaoAtividade} onChange={(e) => setDescricaoAtividade(e.target.value)} required />
              </label>
              <label>
                Data de Entrega:
                <input type="date" value={dataEntrega} onChange={(e) => setDataEntrega(e.target.value)} required />
              </label>
              <label>
                PDF:
                <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
              </label>
              <div className="modal-buttons">
                <button type="submit">Criar</button>
                <button type="button" onClick={abrirOuFecharPublicacaoAtividade}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {janelaAddAluno && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Adicionar Novo Aluno</h2>
            <form onSubmit={addAluno}>
              <label>
                Email:
                <input type="text" value={emailDoAluno} onChange={(e) => setEmailDoAluno(e.target.value)} required />
              </label>
              <div className="modal-buttons">
                <button type="submit">Adicionar</button>
                <button type="button" onClick={abrirOuFecharJanelaDeAddAluno}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}