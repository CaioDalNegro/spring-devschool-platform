import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SidebarProfessor"; // ajuste o caminho se necessário
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import DashboardProfessor from "./pages/DashboardProfessor";
import DashboardAluno from "./pages/DashboardAluno";
import PaginaTurma from "./pages/Paginaturma"; 
import Perfil from "./pages/perfil"; 

function App() {
  const [active, setActive] = useState("MeusDesafios"); // estado para controlar botão ativo

  return (
    <Router>
      <div>
        {/* Exibe a sidebar somente se não estiver nas telas de login/cadastro */}
        {window.location.pathname !== "/" && window.location.pathname !== "/cadastro" && (
          <Sidebar active={active} setActive={setActive} />
        )}

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home-aluno" element={<DashboardAluno />} />
            <Route path="/home-professor" element={<DashboardProfessor />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/paginaturma/:id" element={<PaginaTurma />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;