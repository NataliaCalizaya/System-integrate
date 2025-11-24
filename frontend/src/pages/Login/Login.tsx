import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../api/authApi";

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; samesite=lax`;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // NUEVO: loginUser recibe objeto { username, password } y devuelve { user, token? }
      const { user /*, token*/ } = await loginUser({ username, password });
      const { id, name, role } = user; // role: "student" | "teacher" | "admin"

      // Guardar en cookies para el Header/guardas
      setCookie("id", String(id));
      setCookie("name", name);
      setCookie("role", role);

      // Si en el futuro usás token Bearer:
      // localStorage.setItem("token", token ?? "");

      setSuccessMsg(`Bienvenido, ${name}`);
      setTimeout(() => navigate(from, { replace: true }), 400);
    } catch (err: any) {
      setErrorMsg(err.message || "Error de autenticación");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit">Ingresar</button>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      </form>
    </div>
  );
};

export default Login;