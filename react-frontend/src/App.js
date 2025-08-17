import React, { useEffect, useState } from "react";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  const adicionarUsuario = () => {
    fetch("http://localhost:8080/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    })
      .then((res) => res.json())
      .then((novoUsuario) => setUsuarios([...usuarios, novoUsuario]));
  };

  return (
    <div>
      <h1>qualquer coisa</h1>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={adicionarUsuario}>Adicionar</button>

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>{u.nome} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;