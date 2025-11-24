import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getCookie } from "../utils/cookies";

const Header = () => {
    const role = getCookie("role"); // "student" | "teacher" | null
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    // Clases comunes para los enlaces de navegación
    const navLinkClass = "block py-3 hover:text-cyan-300 transition text-sm font-medium";
    const activeNavLinkClass = "block py-3 border-b-2 border-cyan-400 text-cyan-300 font-medium text-sm";

    return (
        <div className="flex flex-col w-full">
            
            {/* --- SECCIÓN SUPERIOR: Branding y Banderas --- */}
            <header className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        
                        {/* Logo y Título */}
                        <div className="flex items-center space-x-4">
                            <Link to="/" onClick={handleLinkClick}>
                                <h1 className="text-2xl font-bold tracking-wide hover:text-cyan-300 transition">
                                    SIGEA-Jama
                                </h1>
                            </Link>
                            <div className="hidden md:block text-sm text-cyan-300 border-l border-cyan-600 pl-4 leading-tight">
                                Sistema Integrado de Gestión <br /> de Exportación Agroalimentaria
                            </div>
                        </div>

                        {/* Banderas y Menú Hamburguesa (Mobile) */}
                        <div className="flex items-center space-x-4">
                            {/* Banderas */}
                            <div className="flex items-center space-x-3">
                                <img src="https://flagcdn.com/w40/ar.png" alt="Argentina" className="h-6 rounded shadow-md" />
                                <img src="https://flagcdn.com/w40/cl.png" alt="Chile" className="h-6 rounded shadow-md" />
                            </div>

                            {/* Botón Hamburguesa (Solo móvil) */}
                            <button 
                                className="md:hidden p-1 text-cyan-300 hover:text-white border border-slate-600 rounded"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- SECCIÓN INFERIOR: Barra de Navegación --- */}
            <nav className={`bg-slate-800 text-white shadow-md transition-all duration-300 ${menuOpen ? 'block' : 'hidden md:block'}`}>
                <div className="container mx-auto px-6">
                    {/* Usamos flex-col en mobile y flex-row en desktop */}
                    <ul className="flex flex-col md:flex-row md:space-x-8 text-sm">
                        
                        {/* Enlaces Públicos */}
                        <li>
                            <Link to="/" className={navLinkClass} onClick={handleLinkClick}>Inicio</Link>
                        </li>
                        <li>
                            <Link to="/news" className={navLinkClass} onClick={handleLinkClick}>Institucional</Link>
                        </li>

                        {/* --- Lógica de Roles --- */}
                        
                        {/* 1. Agente de Carga / Exportador */}
                        {(role === "student" || role === "exporter") && (
                            <li>
                                <Link to="/upload" className={`${navLinkClass} text-cyan-100 font-bold`} onClick={handleLinkClick}>
                                    + Cargar Trámite
                                </Link>
                            </li>
                        )}

                        {/* 2. Oficial Aduanero / Revisor */}
                        {(role === "teacher" || role === "official") && (
                            <>
                                <li>
                                    <Link to="/upload" className={navLinkClass} onClick={handleLinkClick}>
                                        Cargar Trámite
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/review" className={`${navLinkClass} text-cyan-300 font-bold`} onClick={handleLinkClick}>
                                        Revisar Documentación
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Enlaces Generales restantes */}
                        <li>
                            <Link to="#" className={navLinkClass} onClick={handleLinkClick}>Ayuda</Link>
                        </li>
                        
                        {/* Botón de Login/Logout podría ir aquí o en contacto */}
                        <li className="md:ml-auto"> 
                            <Link to="/login" className={navLinkClass} onClick={handleLinkClick}>Ingresar / Contacto</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;