import React, { useState, useEffect } from "react";
import Sidebar from "../components/SidebarProfessor";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/perfil.css";

export default function Perfil() {
  const navigate = useNavigate();

  const [emailLogado, setEmailLogado] = useState(null);
  const [roleLogado, setRoleLogado] = useState(null);
  const [nome, setNome] = useState("Usuário"); // placeholder

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

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content perfil-main">
        <div className="perfil-card">
          {/* Placeholder de foto */}
          <div className="perfil-foto-placeholder">
            {nome.charAt(0).toUpperCase()}
          </div>

          <h2>{nome}</h2>
          <p><strong>Email:</strong> {emailLogado}</p>
          <p><strong>Função:</strong> {roleLogado}</p>

          <div className="perfil-buttons">
            <button className="btn-editar" onClick={() => alert("Editar Perfil")}>
              Editar Perfil
            </button>
            <button className="btn-senha" onClick={() => alert("Alterar Senha")}>
              Alterar Senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
