import React from "react";
import { BookOpen, ClipboardList, GraduationCap, User, LogOut } from "lucide-react";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ active, setActive }) {
const navigate = useNavigate();
  const menuItems = [
  { id: "MeusDesafios", label: "Meus Desafios", icon: <ClipboardList size={20} />, path: "/home-professor" },
  { id: "MeusCursos", label: "Meus Cursos", icon: <GraduationCap size={20} />, path: "/home-professor" },
  { id: "perfil", label: "Perfil", icon: <User size={20} />, path: "/perfil" },
];

   const deslogar = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
   }

   const irParaDesafios = () => {
      navigate("/home-professor"); // MUDAR AQUI FAZER ESSA PARTE DE DESAFIOS
   }
    
   const irParaCursos = () => {
      navigate("/home-professor");
   }
   
   const irParaPerfil = () => {
      navigate("/home-professor");
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
                onClick={() => {
                  setActive(item.id)
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
