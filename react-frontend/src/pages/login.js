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

  // Função de login
  const entrar = () => {
    if (!email || !senha) {
      alert("Por favor, preencha o email e a senha.");
      return;
    }
    // Escolhe a URL do backend de acordo com o tipo de usuário
  const url =
    tipo === "ALUNO"
      ? "http://localhost:8080/api/alunos/login"
      : "http://localhost:8080/api/professores/login";

    // Chamada HTTP POST para autenticação
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    })
      .then((res) => {
        // Se o backend retornar erro (status != 200)
        if (!res.ok) throw new Error("Login inválido");
        return res.json(); // Retorna o JSON do usuário
      })
      .then((usuario) => {
        // Log para debug (pode remover em produção)
        console.log("Usuário logado:", usuario);

        // Redireciona para a tela correta de acordo com o tipo de usuário
        if (tipo === "ALUNO") {
          navigate("/home-aluno", { state: { usuario } });
        } else {
          navigate("/home-professor", { state: { usuario } });
        }
      })
      .catch(() => alert("Email ou senha incorretos")); // Alerta em caso de erro
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