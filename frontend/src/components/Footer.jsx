import React from 'react';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-10">

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Columna 1 — Marca + flags */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-wide">SIGEA-Jama</h2>
            <p className="text-slate-300 text-sm">
              Sistema Integrado de Gestión de Exportación Agroalimentaria
            </p>
            <div className="flex gap-3 mt-4">
              <img
                src="https://flagcdn.com/w40/ar.png"
                alt="Argentina"
                className="h-5 rounded shadow-md"
              />
              <img
                src="https://flagcdn.com/w40/cl.png"
                alt="Chile"
                className="h-5 rounded shadow-md"
              />
            </div>
          </div>

          {/* Columna 2 — Enlaces */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="font-semibold text-lg text-cyan-400">Enlaces rápidos</h4>
            <ul className="mt-4 space-y-2 text-slate-300 text-sm">
              <li><a href="#" className="hover:text-cyan-300 transition">Institucional</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition">Denuncias</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition">Transparencia</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3 — Redes sociales */}
          <div className="md:text-right text-center flex flex-col items-center md:items-end">
            <h4 className="font-semibold text-lg text-cyan-400">Síguenos</h4>
            <div className="flex mt-4 gap-4">
              
              {/* Botón */}
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-..." />
                </svg>
              </a>

              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642..." />
                </svg>
              </a>

              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204..." />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <p>SIGEA-Jama © {currentYear} — Todos los derechos reservados</p>
          <p className="mt-2 md:mt-0">
            Desarrollado por{" "}
            <span className="text-cyan-400 font-semibold">
              Ingeniería sin Fronteras {currentYear}
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
