import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import DashboardProfessor from "./pages/DashboardProfessor";
import DashboardAluno from "./pages/DashboardAluno";
import PaginaTurma from "./pages/Paginaturma"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home-aluno" element={<DashboardAluno />} />
        <Route path="/home-professor" element={<DashboardProfessor />} />
        
        <Route path="/paginaturma/:id" element={<PaginaTurma />} />

      </Routes>
    </Router>
  );

}

export default App;

