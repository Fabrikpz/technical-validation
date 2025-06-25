import { useState } from "react";
import api from "../services/api";

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", { username, password });
      localStorage.setItem("token", res.data.access_token);
      onLoginSuccess();
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label className="form-label">Usuario</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary w-100" type="submit">
        Iniciar sesión
      </button>
    </form>
  );
}
