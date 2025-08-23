// src/components/SidebarAluno.js
import React from "react";
import { Home, BookOpen, BarChart3, User, LogOut } from "lucide-react";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";


export default function SidebarAluno({ active, setActive }) {
    const navigate = useNavigate();


  const menuItems = [
    { id: "meusCursos", label: "Meus Cursos", icon: <Home size={20} /> },
    { id: "meusDesafios", label: "Meus Desafios", icon: <BookOpen size={20} /> },
    { id: "progresso", label: "Meu Progresso", icon: <BarChart3 size={20} /> },
    { id: "perfil", label: "Perfil", icon: <User size={20} /> },
  ];

  const deslogar = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/");
     }

  return (
    <aside className="sidebar">
      <h2>CodeAcademy AI</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
              className={active === item.id ? "active" : ""}
              onClick={() => setActive(item.id)}
            >
              {item.icon} {item.label}
            </button>
            </li>
          ))}
        </ul>
      </nav>
      <button className="logout" onClick={deslogar}>
        <LogOut size={20} /> Sair
      </button>
    </aside>
  );
}
