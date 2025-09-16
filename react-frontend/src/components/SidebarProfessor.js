import React from "react";
import { BookOpen, ClipboardList, GraduationCap, User, LogOut } from "lucide-react";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ active, setActive }) {
  const navigate = useNavigate();

  // Defina aqui as rotas corretas para cada página
  const menuItems = [
    {
      id: "MeusDesafios",
      label: "Meus Desafios",
      icon: <ClipboardList size={20} />,
      path: "/dashboard-professor", // Coloque a rota correta da tela de desafios
    },
    {
      id: "MeusCursos",
      label: "Meus Cursos",
      icon: <GraduationCap size={20} />,
      path: "/home-professor", // Rota para a página de cursos
    },
    {
      id: "Perfil",
      label: "Perfil",
      icon: <User size={20} />,
      path: "/perfil", // Rota para a página de perfil
    },
  ];

  const deslogar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); // volta para login
  };

  return (
    <aside className="sidebar">
      <h2>CodeAcademy AI</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={active === item.id ? "active" : ""}
                onClick={() => {
                  setActive(item.id);
                  navigate(item.path);
                }}
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