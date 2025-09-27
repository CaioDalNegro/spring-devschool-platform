import React from "react";
import { FaBook, FaTasks, FaChartLine, FaUser, FaSignOutAlt } from "react-icons/fa";
import "../styles/sidebar.css";

export default function SidebarAluno() {
  return (
    <div className="sidebar">
      <h2 className="logo">CodeAcademy</h2>
      <nav className="menu">
        <a href="#cursos">
          <FaBook /> <span>Meus Cursos</span>
        </a>
        <a href="#desafios">
          <FaTasks /> <span>Meus Desafios</span>
        </a>
        <a href="#progresso">
          <FaChartLine /> <span>Meu Progresso</span>
        </a>
        <a href="#perfil">
          <FaUser /> <span>Perfil</span>
        </a>
      </nav>
    </div>
  );
}