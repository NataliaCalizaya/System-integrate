import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmpresaTransportista = () => {
    const navigate = useNavigate();

    const [documents] = useState([
        { 
            id: 'mic_dta', 
            title: 'Cargar MIC/DTA', 
            subtitle: 'Manifiesto Internacional de Carga', 
            icon: '📦', 
            type: 'standard', 
            status: 'pending',
            route: '/mic-dta'
        },
        { 
            id: 'crt', 
            title: 'Registrar Carta de Porte (CRT)', 
            subtitle: 'Transporte Internacional', 
            icon: '📄', 
            type: 'standard', 
            status: 'pending',
            route: '/crt'
        },
        { 
            id: 'hoja_ruta', 
            title: 'Generar Hoja de Ruta', 
            subtitle: 'Trayecto Autorizado', 
            icon: '🛣️', 
            type: 'action',
            status: 'sent',
            route: '/hoja-ruta'
        },
        { 
            id: 'asociar_vehiculo', 
            title: 'Asociar Vehículo y Chofer', 
            subtitle: 'Trazabilidad del Viaje', 
            icon: '🚚', 
            type: 'standard',
            status: 'approved',
            route: '/vehiculo-chofer'
        },
        { 
            id: 'documentos_viaje', 
            title: 'Adjuntar Documentación del Viaje', 
            subtitle: 'Seguro / Precintos', 
            icon: '📎', 
            type: 'standard',
            status: 'pending',
            route: '/documentos-viaje'
        },
        { 
            id: 'reporte_incidente', 
            title: 'Reportar Incidente en Ruta', 
            subtitle: 'Ruptura de Precinto / Control', 
            icon: '🚨', 
            type: 'action', 
            status: 'pending',
            route: '/incidente-ruta'
        }
    ]);

    const handleViewFile = (title) => {
        alert(`Visualizando archivo: ${title}`);
    };

    const handleEdit = (e, route) => {
        e.stopPropagation();
        if (route) navigate(route);
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'approved': return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Aprobado</span>;
            case 'sent': return <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">Enviado</span>;
            case 'rejected': return <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Rechazado</span>;
            default: return <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">Pendiente</span>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">

                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        Empresa Transportista
                    </h2>
                    <p className="text-slate-600">
                        Gestión documental para transporte internacional de cargas.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {documents.map((doc) => {
                            const isAction = doc.type === 'action';

                            const cardBaseClass = isAction 
                                ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white" 
                                : "bg-white border-slate-200 hover:border-cyan-400";

                            const textClass = isAction ? "text-white" : "text-slate-800";
                            const iconBgClass = isAction 
                                ? "bg-white/20 text-white" 
                                : "bg-teal-100 text-teal-600";

                            return (
                                <div
                                    key={doc.id}
                                    onClick={() => handleViewFile(doc.title)}
                                    className={`relative cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition group overflow-hidden ${cardBaseClass}`}
                                >
                                    <button 
                                        onClick={(e) => handleEdit(e, doc.route)}
                                        className={`absolute top-3 right-3 p-1.5 rounded-full transition z-10 
                                            ${isAction 
                                                ? "bg-white/20 hover:bg-white/40 text-white" 
                                                : "bg-slate-100 hover:bg-cyan-100 text-slate-500 hover:text-cyan-600"
                                            }`}
                                        title="Editar Formulario"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>

                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${iconBgClass}`}>
                                                <span className="font-bold text-xl">{doc.icon}</span>
                                            </div>

                                            <h5 className={`font-semibold mb-1 ${textClass}`}>{doc.title}</h5>
                                            <p className={`text-xs inline-block px-2 py-1 rounded mb-4 ${isAction ? "bg-black/10 text-white/90" : "bg-slate-100 text-slate-500"}`}>
                                                {doc.subtitle}
                                            </p>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between">
                                            {renderStatusBadge(doc.status)}
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

export default EmpresaTransportista;
