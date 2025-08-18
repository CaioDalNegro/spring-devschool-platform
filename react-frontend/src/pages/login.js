import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("ALUNO");
  const navigate = useNavigate();

  const entrar = () => {
    const url =
      tipo === "ALUNO"
        ? "http://localhost:8080/api/alunos/login"
        : "http://localhost:8080/api/professores/login";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    })
      .then((res) => res.json())
      .then((isLogged) => {
        if (isLogged) {
          alert("Login realizado com sucesso!");
          // redireciona para página do usuário
          navigate(tipo === "ALUNO" ? "/home-aluno" : "/home-professor");
        } else {
          alert("Email ou senha incorretos");
        }
      })
      .catch((err) => console.error(err));
  };

  const irParaCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={entrar}>Entrar</button>
      <button onClick={irParaCadastro}>Cadastrar-se</button>
    </div>
  );
}

export default Login;
