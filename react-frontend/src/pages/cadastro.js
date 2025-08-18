import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cadastro.css"; // Import do CSS estilizado

function Cadastro() {
  // -----------------------------
  // State hooks para campos do formulário
  const [nome, setNome] = useState("");       // Nome do usuário
  const [email, setEmail] = useState("");     // Email do usuário
  const [senha, setSenha] = useState("");     // Senha do usuário
  const [tipo, setTipo] = useState("ALUNO");  // Tipo de usuário: ALUNO ou PROFESSOR

  const navigate = useNavigate(); // Hook para navegação entre páginas

  // -----------------------------
  // Função para adicionar usuário no backend
  const adicionarUsuario = () => {
    // Define a URL do endpoint dependendo do tipo de usuário
    const url =
      tipo === "ALUNO"
        ? "http://localhost:8080/api/alunos"
        : "http://localhost:8080/api/professores";

    // Requisição POST para criar usuário
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }), // corpo da requisição
    })
      .then((res) => res.json())
      .then(() => {
        alert("Cadastro realizado com sucesso!"); // Feedback para o usuário
        navigate("/"); // Redireciona para a tela de login
      })
      .catch((err) => console.error("Erro ao cadastrar usuário:", err));
  };

  // -----------------------------
  // Função para voltar à tela de login
  const voltar = () => {
    navigate("/");
  };

  // -----------------------------
  // Estrutura da tela de cadastro
  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1 className="cadastro-title">CodeAcademy AI</h1>
        <p className="cadastro-subtitle">Crie sua conta</p>

        {/* Input do Nome */}
        <input
          className="cadastro-input"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        {/* Input do Email */}
        <input
          className="cadastro-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Input da Senha */}
        <input
          className="cadastro-input"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {/* Select para escolher tipo de usuário */}
        <select
          className="cadastro-select"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="PROFESSOR">Professor</option>
          <option value="ALUNO">Aluno</option>
        </select>

        {/* Botão de cadastrar */}
        <button className="cadastro-btn" onClick={adicionarUsuario}>
          Cadastrar
        </button>

        {/* Botão de voltar */}
        <button className="cadastro-btn-back" onClick={voltar}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Cadastro;