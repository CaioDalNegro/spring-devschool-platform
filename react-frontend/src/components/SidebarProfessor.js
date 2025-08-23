import React from "react";
import { BookOpen, ClipboardList, GraduationCap, User, LogOut } from "lucide-react";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ active, setActive }) {
const navigate = useNavigate();
  const menuItems = [
    { id: "MinhasTurmas", label: "Minhas Turmas", icon: <BookOpen size={20} /> },       // Livro → representa as turmas/cursos
    { id: "MeusDesafios", label: "Meus Desafios", icon: <ClipboardList size={20} /> },   // Lista → representa tarefas/desafios
    { id: "MeusCursos", label: "Meus Cursos", icon: <GraduationCap size={20} /> },        // Chapéu de formatura → cursos
    { id: "perfil", label: "Perfil", icon: <User size={20} /> },                           // Usuário → perfil
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
