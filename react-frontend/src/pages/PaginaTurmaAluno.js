import React, { useState, useEffect } from "react";
import SidebarAluno from "../components/SidebarAluno"; // mesma sidebar do DashboardAluno
import { BookOpen, BarChart3, Users, PlusCircle } from "lucide-react";
import "../styles/turma.css";
import { useParams } from "react-router-dom";

export default function PaginaTurmaAluno() {
  const { id } = useParams();
  const [active, setActive] = useState("meusCursos");
  const [opcaoTurma, setOpcaoTurma] = useState("MURAL");

  const [turma, setTurma] = useState({});
  const [aulas, setAulas] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [alunos, setAlunos] = useState([]);

  const [fileEnvio, setFileEnvio] = useState(null); 
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);

  const token = localStorage.getItem("token");

  // Carregar dados da turma
  useEffect(() => {
    if (!token) return;

    // detalhes da turma
    fetch(`http://localhost:8080/api/turmas/turmaDetalhes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setTurma(data))
      .catch(err => console.error(err));

    // aulas
    fetch(`http://localhost:8080/api/aulas/minhasAulas`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        idTurma: id
      },
    })
      .then(res => res.json())
      .then(data => setAulas(data))
      .catch(err => console.error(err));

    // atividades
    fetch(`http://localhost:8080/api/atividades/minhasAtividades`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        idTurma: id
      },
    })
      .then(res => res.json())
      .then(data => setAtividades(data))
      .catch(err => console.error(err));

    // alunos
    fetch(`http://localhost:8080/api/turmaAlunos/${id}/alunos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(data => setAlunos(data))
      .catch(err => console.error(err));

  }, [id, token]);

  // Enviar atividade
  const enviarAtividade = () => {
    if (!fileEnvio || !atividadeSelecionada) return alert("Selecione uma atividade e um arquivo!");

    const formData = new FormData();
    formData.append("file", fileEnvio);
    formData.append("atividadeId", atividadeSelecionada);

    fetch("http://localhost:8080/api/envios", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        alert("Atividade enviada!");
        setFileEnvio(null);
        setAtividadeSelecionada(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="dashboard-container">
      {/* mesma sidebar do DashboardAluno */}
      <SidebarAluno active={active} setActive={setActive} />

      <main className="main-content">
        <div className="turma-header">
          <h1>{turma.nome}</h1>
          <p>Alunos: {turma.alunos}</p>
          <p>Desafios: {turma.desafios}</p>
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
            <Users size={18} /> Alunos
          </button>
        </div>

        <div className="tab-content">
          {/* MURAL */}
          {opcaoTurma === "MURAL" && (
            <div>
              {aulas.length > 0 ? aulas.map(aula => (
                <div className="card" key={aula.id}>
                  <h3>{aula.titulo}</h3>
                  <p>{aula.descricao}</p>
                  {aula.caminho && <a href={`http://localhost:8080/uploads/${aula.caminho}`} target="_blank" rel="noopener noreferrer">📄 Abrir PDF</a>}
                </div>
              )) : <p>Nenhuma aula cadastrada.</p>}
            </div>
          )}

          {/* ATIVIDADES */}
          {opcaoTurma === "ATIVIDADES" && (
            <div>
              {atividades.length > 0 ? atividades.map(atividade => (
                <div className="card" key={atividade.id}>
                  <h3>{atividade.titulo}</h3>
                  <p>{atividade.descricao}</p>
                  <p>Entrega: {atividade.dataEntrega}</p>
                  {atividade.caminho && <a href={`http://localhost:8080/uploads/${atividade.caminho}`} target="_blank" rel="noopener noreferrer">📄 Abrir PDF</a>}
                  <input type="file" accept="application/pdf" onChange={e => setFileEnvio(e.target.files[0])} />
                  <button className="btn small" onClick={() => { setAtividadeSelecionada(atividade.id); enviarAtividade(); }}>
                    Enviar atividade
                  </button>
                </div>
              )) : <p>Nenhuma atividade cadastrada.</p>}
            </div>
          )}

          {/* PESSOAS */}
          {opcaoTurma === "PESSOAS" && (
            <div>
              {alunos.length > 0 ? alunos.map(aluno => (
                <div className="card" key={aluno.id}>
                  <h3>{aluno.nome}</h3>
                  <p>{aluno.email}</p>
                </div>
              )) : <p>Nenhum aluno cadastrado.</p>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
