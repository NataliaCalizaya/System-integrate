import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Arca = () => {
    const navigate = useNavigate();

    const [features] = useState([
        { 
            id: 'crt', 
            title: 'Cargar Documentación de Transporte (CRT)', 
            subtitle: 'Carta de Porte / CRT', 
            icon: '🚛', 
            type: 'standard', 
            status: 'approved',
            route: '/crt'
        },
        { 
            id: 'hoja_ruta', 
            title: 'Generar Hoja de Ruta', 
            subtitle: 'Itinerario del Vehículo', 
            icon: '🗺️', 
            type: 'standard',
            status: 'pending',
            route: '/hoja-ruta'
        },
        { 
            id: 'mic_dta', 
            title: 'MIC/DTA', 
            subtitle: 'Documentación Aduanera de Tránsito', 
            icon: '📦', 
            type: 'action', 
            status: 'sent',
            route: '/mic-dta'
        }
    ]);

    const handleViewFeature = (title) => {
        alert(`Acción: ${title}`);
    };

    const handleEdit = (e, route) => {
        e.stopPropagation();
        if (route) navigate(route);
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'approved': return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Aprobado</span>;
            case 'sent': return <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">Enviado</span>;
            case 'rejected': return <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Desaprobado</span>;
            default: return <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">Pendiente</span>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Funcionalidades
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {features.map((f) => {
                            const isAction = f.type === 'action';
                            const cardClass = isAction 
                                ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white" 
                                : "bg-white border-slate-200 hover:border-cyan-400";

                            const textClass = isAction ? "text-white" : "text-slate-800";
                            const iconClass = isAction 
                                ? "bg-white/20 text-white" 
                                : "bg-teal-100 text-teal-600";

                            return (
                                <div
                                    key={f.id}
                                    onClick={() => handleViewFeature(f.title)}
                                    className={`relative cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition group overflow-hidden ${cardClass}`}
                                >
                                    <button
                                        onClick={(e) => handleEdit(e, f.route)}
                                        className={`absolute top-3 right-3 p-1.5 rounded-full transition z-10 
                                            ${isAction
                                                ? "bg-white/20 hover:bg-white/40 text-white"
                                                : "bg-slate-100 hover:bg-cyan-100 text-slate-500 hover:text-cyan-600"
                                            }`}
                                        title="Ir al formulario"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>

                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${iconClass}`}>
                                                <span className="text-xl font-bold">{f.icon}</span>
                                            </div>

                                            <h5 className={`font-semibold mb-1 ${textClass}`}>
                                                {f.title}
                                            </h5>

                                            <p className={`text-xs inline-block px-2 py-1 rounded mb-4 
                                                ${isAction ? "bg-black/10 text-white/90" : "bg-slate-100 text-slate-500"}`}>
                                                {f.subtitle}
                                            </p>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between">
                                            {renderStatusBadge(f.status)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Arca;
