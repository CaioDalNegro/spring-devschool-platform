import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import "../styles/login.css"; // Import do CSS específico da tela Login



function Login() {
  // Estados do componente
  const [email, setEmail] = useState(""); // Armazena o email digitado
  const [senha, setSenha] = useState(""); // Armazena a senha digitada
  const [tipo, setTipo] = useState("ALUNO"); // Define o tipo de usuário (Aluno ou Professor)

  // Hook do React Router para navegação entre telas
  const navigate = useNavigate();

  // Função de loginconst
  const entrar = () => {
      if (!email || !senha) {
        alert("Por favor, preencha o email e a senha.");
        return;
      }

      const url =
        tipo === "ALUNO"
          ? "http://localhost:8080/api/alunos/login"
          : "http://localhost:8080/api/professores/login";

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Login inválido");
          return res.json();
        })
        .then((data) => {
          // 🔑 agora o backend deve devolver { token, role }
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);

          // Navegar de acordo com o role que veio do token
          if (data.role === "ALUNO") {
            navigate("/home-aluno");
          } else {
            navigate("/home-professor");
          }
        })
        .catch(() => alert("Email ou senha incorretos"));
    };


  // Função para navegar para a tela de cadastro
  const irParaCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Cabeçalho */}
        <h1 className="login-title">CodeAcademy AI</h1>
        <p className="login-subtitle">Acesse sua conta</p>

        {/* Input de Email */}
        <input
          className="login-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Input de Senha */}
        <input
          className="login-input"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {/* Select de tipo de usuário */}
        <select
          className="login-select"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="PROFESSOR">Professor</option>
          <option value="ALUNO">Aluno</option>
        </select>

        {/* Botão de Login */}
        <button className="login-btn" onClick={entrar}>
          Entrar
        </button>

        {/* Link para cadastro */}
        <p className="login-footer">
          Não tem conta?{" "}
          <span onClick={irParaCadastro} className="link">
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;