import "./Footer.css";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <img src="/icon.jpg" alt="Escuela" className="footer-logo" />
                    <div>
                        <h3>Colegio Secundario N° 25</h3>
                        {/*             <p>Compromiso, aprendizaje y comunidad.</p> */}
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Contacto</h4>
                    <ul>
                        <li>Dirección: Avenida Francisco Pastor N° 82, Humahuaca</li>
                        {/* <li>Tel: <a href="tel:+5400000000">+54 00 0000-0000</a></li>
            <li>Email: <a href="mailto:info@secundario25.edu.ar">info@secundario25.edu.ar</a></li>
            <li>Horario: Lun–Vie 08:00–18:00</li> */}
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Enlaces</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/news">Noticias</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Seguinos</h4>
                    <ul>
                        <li><a href="#" aria-label="Facebook (próximamente)">Facebook</a></li>
                        <li><a href="#" aria-label="Instagram (próximamente)">Instagram</a></li>
                        <li><a href="#" aria-label="YouTube (próximamente)">YouTube</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <small>
                    © {currentYear} Colegio Secundario N° 25 — Todos los derechos reservados.
                </small>
            </div>
        </footer>
    );
};

export default Footer;
