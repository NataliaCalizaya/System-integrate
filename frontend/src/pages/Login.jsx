import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/authApi";

const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; samesite=lax`;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSubmitting(true);

    // --- INICIO: LÓGICA HARDCODED (DEMO) ---
    
    // CASO 1: EXPORTADOR
    if (username.toLowerCase() === "exportador" && password === "12345") {
        setTimeout(() => {
            // Guardamos cookies simuladas
            setCookie("id", "101");
            setCookie("name", "Frutas del Valle S.A.");
            setCookie("role", "exporter"); // Rol clave para el Header

            setSuccessMsg("Ingresando al panel de Exportador...");
            
            // Redirección forzada
            navigate("/exportador", { replace: true });
        }, 1000); // Simulamos 1 seg de carga
        return; // Detenemos la ejecución para no llamar a la API real
    }

    // CASO 2: DESPACHANTE
    if (username.toLowerCase() === "despachante" && password === "12345") {
        setTimeout(() => {
            // Guardamos cookies simuladas
            setCookie("id", "202");
            setCookie("name", "Estudio Aduanero Pérez");
            setCookie("role", "customs_broker"); // Rol clave para el Header

            setSuccessMsg("Ingresando al panel de Despachante...");
            
            // Redirección forzada
            navigate("/despachante", { replace: true });
        }, 1000);
        return;
    }
    // --- FIN: LÓGICA HARDCODED ---


    // LÓGICA REAL (API)
    try {
      const { user } = await loginUser({ username, password });
      const { id, name, role } = user;

      setCookie("id", String(id));
      setCookie("name", name);
      setCookie("role", role);

      setSuccessMsg(`Bienvenido, ${name}`);
      setTimeout(() => navigate(from, { replace: true }), 400);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Error de autenticación: Verifique sus datos.");
      setSubmitting(false); // Aseguramos que el botón se reactive si falla
    }
  };

  return (
    // Fondo oscuro con imagen de fondo
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 relative">
        {/* Imagen de fondo */}
        <div 
            className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070')" }}
        ></div>

      {/* Tarjeta de Login */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-[420px] relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#17b8b9] rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-white">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-[26px] font-bold text-slate-800 mb-1 leading-tight">Ingresar al Sistema</h2>
          <p className="text-slate-500 text-[15px]">Ingrese sus credenciales</p>
        </div>

        {/* Mensajes */}
        {errorMsg && (
            <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded text-center">
                {errorMsg}
            </div>
        )}
        {successMsg && (
            <div className="mb-5 p-3 bg-teal-50 border border-teal-100 text-teal-600 text-sm rounded text-center">
                {successMsg}
            </div>
        )}

        {/* Formulario */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-[15px] font-semibold text-slate-700 mb-2">
                Usuario / CUIT
            </label>
            <input 
              id="username"
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#17b8b9] focus:ring-1 focus:ring-[#17b8b9] transition-colors" 
              placeholder="Ingrese su usuario"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-[15px] font-semibold text-slate-700 mb-2">
                Contraseña
            </label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#17b8b9] focus:ring-1 focus:ring-[#17b8b9] transition-colors" 
              placeholder="Ingrese su contraseña"
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className={`w-full bg-[#17b8b9] hover:bg-[#149fa0] text-white font-bold py-[14px] rounded-lg transition-colors shadow-sm text-lg ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {submitting ? "Verificando..." : "Iniciar Sesión"}
          </button>

          <div className="flex items-center justify-between text-[15px] pt-1 px-1">
            <button type="button" className="text-[#17b8b9] hover:text-[#149fa0] transition-colors">
                ¿Olvidó su contraseña?
            </button>
            <button type="button" className="text-[#17b8b9] hover:text-[#149fa0] transition-colors font-medium">
                Registrarse
            </button>
          </div>
        </form>

        {/* Footer Card */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-[15px] text-slate-500">
          <span>¿Necesita ayuda? </span>
          <a href="#" className="text-[#17b8b9] hover:text-[#149fa0] font-semibold ml-1">
            Contactar soporte
          </a>
        </div>

      </div>
    </div>
  );
};

export default Login;