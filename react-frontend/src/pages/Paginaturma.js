import React, { useState, useEffect } from "react";
import Sidebar from "../components/SidebarProfessor";
import "../styles/dashboard.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { Divide } from "lucide-react";

export default function PaginaTurma() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("meusCursos");

  const [emailLogado, setEmailLogado] = useState(null);
  const [roleLogado, setRoleLogado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmailLogado(decoded.sub);
        setRoleLogado(decoded.role);
        console.log(decoded.sub);  
        console.log(decoded.role); 
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
        navigate("/"); 
      }
    } else {
      console.warn("Nenhum token encontrado, redirecionando para login...");
      navigate("/");
    }
  }, [navigate]); 

  return (
    <div>
     
      <Sidebar active={active} setActive={setActive} />
      <div> 
          
      </div>
    </div>
  );
}
