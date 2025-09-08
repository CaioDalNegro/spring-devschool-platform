import React, { useState, useEffect } from "react";
import Sidebar from "../components/SidebarProfessor";
import { PlusCircle, Users, BookOpen, BarChart3 } from "lucide-react";
import "../styles/turma.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { Divide } from "lucide-react";


export default function Perfil(){
    const navigate = useNavigate();

    const [emailLogado, setEmailLogado] = useState(null);
    const [roleLogado, setRoleLogado] = useState(null);
    
     //PARA PEGAR USUARIO LOGADO E O ID DA TURMA
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decoded = jwtDecode(token);
            setEmailLogado(decoded.sub);
            setRoleLogado(decoded.role);
            console.log("EMAIL: ", decoded.sub);  
            console.log("ROLE: " ,decoded.role); 
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


      return(
        <div>
            <h1>Email Logado: <strong>{emailLogado}</strong> </h1>
            <h1>Role: <strong>{roleLogado}</strong> </h1>
        </div>

      );
}