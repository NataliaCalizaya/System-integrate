import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import { getCookie } from "../../utils/cookies";

const Header = () => {
    const role = getCookie("role"); // "profesor" | "alumno" | null
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <div className="header-container">
                <img className='icon' src="/icon.jpg" alt="Logo del colegio" />

                {/* Botón de menú para mobile */}
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <nav className={`Header-nav ${menuOpen ? 'open' : ''}`}>
                    <Link to='/' className='Header-link'>Inicio</Link>
                    <Link to='/news' className='Header-link'>Noticias</Link>
                    {/* <Link to='/videos' className='Header-link'>Videos</Link>
                    <Link to='/podcasts' className='Header-link'>Podcasts</Link> */}
                    {role === "student" && (
                        <Link to="/upload" className="Header-link">Subir</Link>
                    )}

                    {role === "teacher" && (
                        <>
                            <Link to="/upload" className="Header-link">Subir</Link>
                            <Link to="/review" className="Header-link">Revisar</Link>
                        </>
                    )}

                </nav>
            </div>
        </header>
    );
};

export default Header;