import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Exportador = () => {
    const navigate = useNavigate();

    // Definición de las tarjetas y sus estados
    const [documents] = useState([
        { 
            id: 'senasa', 
            title: 'Solicitar Control a SENASA', 
            subtitle: 'Intervención Sanitaria', 
            icon: '🥬', 
            type: 'action', // Estilo destacado (Verde/Gradiente)
            status: 'pending',
            route: '/solicitud-senasa' 
        },
        { 
            id: 'factura', 
            title: 'Cargar Factura Comercial', 
            subtitle: 'Documento Comercial', 
            icon: '📄', 
            type: 'standard', 
            status: 'approved',
            route: '/factura' // Ruta real que ya creamos
        },
        { 
            id: 'arancel', 
            title: 'Cargar Clasificación Arancelaria', 
            subtitle: 'Datos de Mercadería', 
            icon: '🏷️', 
            type: 'standard',
            status: 'sent',
            route: '/arancel'
        },
        { 
            id: 'packing', 
            title: 'Cargar Packing List', 
            subtitle: 'Detalle de Carga', 
            icon: '📦', 
            type: 'standard',
            status: 'rejected',
            route: '/packing'
        },
        { 
            id: 'origen', 
            title: 'Cargar Certificado de Origen', 
            subtitle: 'Origen del Producto', 
            icon: '✓', 
            type: 'standard',
            status: 'pending',
            route: '/origen'
        },
        {
        id: 'trazabilidad',
        title: 'Registrar Trazabilidad del Lote',
        subtitle: 'Vehículo, Chofer, Precintos',
        icon: '🧭',
        type: 'standard',
        status: 'pending',
        route: '/trazabilidad'
        },
        {
        id: 'docs',
        title: 'Visualizar Documentación',
        subtitle: 'PDF disponibles',
        icon: '📚',
        type: 'standard',
        status: 'approved',
        route: '/documentos'
        },
        { 
            id: 'arca', 
            title: 'Enviar Solicitud de Control a ARCA', 
            subtitle: 'Revisión Aduanera en Origen', 
            icon: '📨', 
            type: 'standard',
            status: 'pending',
            route: '/solicitud-arca'
        }
    ]);

    // Acción al hacer click en la tarjeta (Ver documento)
    const handleViewFile = (docTitle) => {
        alert(`Visualizando documento: ${docTitle}`);
    };

    // Acción al hacer click en el lápiz (Editar)
    const handleEdit = (e, route) => {
        e.stopPropagation(); // Evita abrir el visualizador
        if (route) {
            console.log(`Editando en: ${route}`);
            navigate(route);
        } else {
            console.warn("Ruta no definida");
        }
    };

    // Helper para los Badges de Estado
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Aprobado
                    </span>
                );
            case 'sent':
                return (
                    <span className="bg-cyan-100 text-cyan-700 text-xs font-bold px-2 py-1 rounded-full border border-cyan-200">
                        Enviado
                    </span>
                );
            case 'rejected':
                return (
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full border border-red-200">
                        Desaprobado
                    </span>
                );
            default: // pending
                return (
                    <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded-full border border-slate-200">
                        Pendiente
                    </span>
                );
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
                {/* Contenedor Principal */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    
                    {/* Encabezado */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-800">Empresa Exportadora</h3>
                        <p className="text-cyan-600 font-medium mt-1">Origen de la operación</p>
                        <p className="text-slate-600 mt-2 max-w-3xl text-sm">
                            La empresa carga la documentación comercial y solicita los controles necesarios para habilitar la exportación.
                        </p>
                    </div>

                    <h4 className="font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">Funcionalidades</h4>
                    
                    {/* Grid de Tarjetas */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        
                        {documents.map((doc) => {
                            const isAction = doc.type === 'action';
                            
                            // Estilos dinámicos según el tipo de tarjeta
                            const cardClasses = isAction 
                                ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-transparent"
                                : "bg-white border-slate-200 hover:border-cyan-400";

                            const textClass = isAction ? "text-white" : "text-slate-800";
                            const subTextClass = isAction ? "text-white/90 bg-black/10" : "text-slate-500 bg-slate-100";
                            const iconBgClass = isAction ? "bg-white/20 text-white" : "bg-cyan-100 text-cyan-600";
                            const editBtnClass = isAction ? "bg-white/20 hover:bg-white/40 text-white" : "bg-slate-100 hover:bg-cyan-100 text-slate-500 hover:text-cyan-600";

                            return (
                                <div 
                                    key={doc.id}
                                    onClick={() => handleViewFile(doc.title)}
                                    className={`relative cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition group overflow-hidden ${cardClasses}`}
                                >
                                    {/* Botón Editar (Lápiz) */}
                                    <button 
                                        onClick={(e) => handleEdit(e, doc.route)}
                                        className={`absolute top-3 right-3 p-1.5 rounded-full transition z-10 ${editBtnClass}`}
                                        title="Editar / Cargar"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>

                                    {/* Decoración de fondo para tarjeta de acción */}
                                    {isAction && (
                                        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white opacity-10 rounded-full pointer-events-none"></div>
                                    )}

                                    {/* Contenido */}
                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${iconBgClass}`}>
                                                <span className="font-bold text-xl">{doc.icon}</span>
                                            </div>
                                            <h5 className={`font-semibold mb-1 ${textClass}`}>{doc.title}</h5>
                                            <p className={`text-xs inline-block px-2 py-1 rounded mb-4 ${subTextClass}`}>
                                                {doc.subtitle}
                                            </p>
                                        </div>

                                        {/* Badge de Estado */}
                                        <div className="mt-auto flex items-center justify-between">
                                            {renderStatusBadge(doc.status)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Nota Footer */}
                    <div className="mt-8 p-4 bg-cyan-50 border-l-4 border-cyan-500 rounded text-sm text-slate-700">
                        <p>
                            <strong className="font-semibold">Nota:</strong> Toda la documentación cargada por la empresa queda disponible para el Despachante, SENASA, ARCA y las Aduanas de Argentina y Chile.
                        </p>
                    </div>

                </div>
            </main>

        </div>
    );
};

export default Exportador;