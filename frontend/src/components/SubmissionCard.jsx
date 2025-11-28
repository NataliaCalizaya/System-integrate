import React from 'react';
import { Link } from "react-router-dom";

const PLACEHOLDER = "https://via.placeholder.com/800x450?text=Documento+Sin+Vista+Previa";

const formatDate = (iso) => {
    if (!iso) return "";
    try {
        return new Date(iso).toLocaleDateString("es-AR");
    } catch {
        return "";
    }
};

export const SubmissionCard = ({ item, onApprove, onDelete }) => {
    const dateLabel = formatDate(item.date || item.published_at || item.created_at);
    
    // Determinamos colores según la agencia (AFIP o SENASA)
    const isSenasa = item.agency === 'SENASA';
    const themeColor = isSenasa ? 'green' : 'blue';
    const borderColor = isSenasa ? 'border-green-500' : 'border-blue-600';
    const badgeColor = isSenasa ? 'bg-green-500' : 'bg-blue-600';

    return (
        <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col h-full">
            
            {/* Barra superior de color */}
            <div className={`h-2 w-full ${isSenasa ? 'bg-green-500' : 'bg-blue-600'}`}></div>

            <Link to={`/review/${item.id}`} className="flex-grow">
                {/* Imagen (Opcional, si el trámite tiene foto) */}
                <div className="relative h-40 overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                        src={item.cover_url ?? PLACEHOLDER}
                        alt={item.title || item.type}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded text-white shadow-sm ${badgeColor}`}>
                        {item.agency || "AFIP"}
                    </span>
                </div>

                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                            {item.type || "Trámite General"}
                        </span>
                        <span className="text-xs text-slate-400">{dateLabel}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-cyan-600 transition">
                        {item.title || `Trámite #${item.id}`}
                    </h3>

                    {item.company && (
                        <p className="text-sm text-slate-500 mb-1">
                            Empresa: <span className="font-semibold text-slate-700">{item.company}</span>
                        </p>
                    )}
                    
                    {item.broker && (
                        <p className="text-xs text-slate-400 bg-slate-50 p-2 rounded mt-2">
                            Agente: {item.broker}
                        </p>
                    )}
                </div>
            </Link>

            {/* Acciones Rápidas (Botones) */}
            <div className="bg-slate-50 px-5 py-4 border-t border-slate-100 flex gap-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Evita navegar al detalle
                        onApprove(item.id);
                    }}
                    className={`flex-1 text-white font-bold py-2 rounded text-sm shadow-sm hover:opacity-90 transition ${badgeColor}`}
                    aria-label={`Aprobar ${item.title}`}
                >
                    ✓ Aprobar
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                    }}
                    className="flex-1 bg-white border border-slate-300 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 font-bold py-2 rounded text-sm transition"
                    aria-label={`Rechazar ${item.title}`}
                >
                    ✕ Rechazar
                </button>
            </div>
        </div>
    );
};

export default SubmissionCard;