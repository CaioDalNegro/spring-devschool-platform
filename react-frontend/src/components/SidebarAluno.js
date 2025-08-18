// src/components/SidebarAluno.js
import React from "react";
import { Home, BookOpen, BarChart3, User, LogOut } from "lucide-react";
import "../styles/dashboard.css";

export default function SidebarAluno({ active, setActive }) {
  const menuItems = [
    { id: "meusCursos", label: "Meus Cursos", icon: <Home size={20} /> },
    { id: "meusDesafios", label: "Meus Desafios", icon: <BookOpen size={20} /> },
    { id: "progresso", label: "Meu Progresso", icon: <BarChart3 size={20} /> },
    { id: "perfil", label: "Perfil", icon: <User size={20} /> },
  ];

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
      <button className="logout">
        <LogOut size={20} /> Sair
      </button>
    </aside>
  );
}
