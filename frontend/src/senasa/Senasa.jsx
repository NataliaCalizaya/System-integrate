import { useState } from "react";
import RecepcionSolicitud from "./forms/RecepcionSolicitud";
import Visita from "./Visita";
import Control from "./Control";
import Certificado from "./forms/Certificado";

const Senasa = () => {
  const [page, setPage] = useState("recepcion");

  const renderPage = () => {
    switch (page) {
      case "recepcion": return <RecepcionSolicitud />;
      case "visita": return <Visita />;
      case "control": return <Control />;
      case "certificado": return <Certificado />;
      default: return <RecepcionSolicitud />;
    }
  };

  return (
    <div className="h-screen flex">
      {/* SIDEBAR */}
      <nav className="bg-slate-800 text-white w-56 p-4 space-y-2">
        <h2 className="font-bold text-lg mb-4">SENASA</h2>

        <button className="w-full text-left px-3 py-2 hover:bg-slate-700 rounded"
          onClick={() => setPage("recepcion")}>Recepción Solicitud</button>

        <button className="w-full text-left px-3 py-2 hover:bg-slate-700 rounded"
          onClick={() => setPage("visita")}>Visita / Control</button>

        <button className="w-full text-left px-3 py-2 hover:bg-slate-700 rounded"
          onClick={() => setPage("control")}>Resultado de Control</button>

        <button className="w-full text-left px-3 py-2 hover:bg-slate-700 rounded"
          onClick={() => setPage("certificado")}>Certificado</button>
      </nav>

      <main className="flex-1 p-8 overflow-y-auto bg-gray-100">
        {renderPage()}
      </main>
    </div>
  );
};

export default Senasa;
