import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("ALUNO");
  const navigate = useNavigate();

  const adicionarUsuario = () => {
    const url =
      tipo === "ALUNO"
        ? "http://localhost:8080/api/alunos"
        : "http://localhost:8080/api/professores";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    })
      .then((res) => res.json())
      .then((novoUsuario) => {
        alert("Cadastro realizado com sucesso!");
        navigate("/"); // volta para login
      })
      .catch((err) => console.error(err));
  };

  const voltar = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <label>Tipo de usuário:</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="PROFESSOR">PROFESSOR</option>
        <option value="ALUNO">ALUNO</option>
      </select>
      <br />
      <button onClick={adicionarUsuario}>Cadastrar</button>
      <button onClick={voltar}>Voltar</button>
    </div>
  );
}

export default Cadastro;
