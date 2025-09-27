import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes
import Sidebar from "./components/SidebarProfessor"; // Sidebar usada em professor/aluno
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import DashboardProfessor from "./pages/DashboardProfessor";
import DashboardAluno from "./pages/DashboardAluno";
import Perfil from "./pages/perfil";

// Páginas de Turma
import Paginaturma from "./pages/Paginaturma"; // Página para professor (nome exatamente igual ao arquivo)
import PaginaTurmaAluno from "./pages/PaginaTurmaAluno"; // Página para aluno

function App() {
  const [active, setActive] = useState("MeusDesafios"); // Estado para controlar botão ativo na sidebar

  return (
    <Router>
      <div>
        {/* Exibe a sidebar somente se não estiver nas telas de login/cadastro */}
        {window.location.pathname !== "/" && window.location.pathname !== "/cadastro" && (
          <Sidebar active={active} setActive={setActive} />
        )}

        <main>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            {/* Dashboards */}
            <Route path="/home-aluno" element={<DashboardAluno />} />
            <Route path="/home-professor" element={<DashboardProfessor />} />
            <Route path="/perfil" element={<Perfil />} />

            {/* Turmas */}
            <Route path="/paginaturma/:id" element={<Paginaturma />} /> {/* Professor */}
            <Route path="/turma/:id" element={<PaginaTurmaAluno />} /> {/* Aluno */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
