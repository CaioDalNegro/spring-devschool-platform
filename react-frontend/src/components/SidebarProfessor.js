import React from "react";
import { BookOpen, ClipboardList, GraduationCap, User, LogOut } from "lucide-react";
import "../styles/sidebar.css";

export default function Sidebar({ active, setActive }) {
  const menuItems = [
    { id: "MinhasTurmas", label: "Minhas Turmas", icon: <BookOpen size={20} /> },       // Livro → representa as turmas/cursos
    { id: "MeusDesafios", label: "Meus Desafios", icon: <ClipboardList size={20} /> },   // Lista → representa tarefas/desafios
    { id: "MeusCursos", label: "Meus Cursos", icon: <GraduationCap size={20} /> },        // Chapéu de formatura → cursos
    { id: "perfil", label: "Perfil", icon: <User size={20} /> },                           // Usuário → perfil
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
