import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importar useNavigate

const Despachante = () => {
    const navigate = useNavigate(); // 2. Inicializar el hook

    // 3. Agregamos la propiedad 'route' a cada objeto
    const [documents] = useState([
        { 
            id: 'permiso_embarque', 
            title: 'Cargar Permiso de Embarque', 
            subtitle: 'Formulario Aduanero', 
            icon: '📋', 
            type: 'standard', 
            status: 'approved',
            route: '/permiso-embarque' // Ruta inventada (debes crearla)
        },
        { 
            id: 'pago_aranceles', 
            title: 'Registrar Pago de Aranceles', 
            subtitle: 'Comprobante', 
            icon: '💲', 
            type: 'standard',
            status: 'sent',
            route: '/pago-aranceles' // Ruta inventada
        },
        { 
            id: 'servicio_aduana', 
            title: 'Solicitar Servicio de Aduana', 
            subtitle: 'Intervención Aduanera', 
            icon: '👮', 
            type: 'action', 
            status: 'pending',
            route: '/servicio-aduana' // Ruta inventada
        },
        { 
            id: 'asociar_docs', 
            title: 'Asociar Documentación Comercial', 
            subtitle: 'Factura / Packing / Origen', 
            icon: '🔗', 
            type: 'standard',
            status: 'rejected',
            route: '/facturae' 
        }
    ]);

    const handleViewFile = (docTitle) => {
        alert(`Visualizando archivo: ${docTitle}`);
    };

    // 4. Modificamos el handleEdit para recibir la ruta
    const handleEdit = (e, route) => {
        e.stopPropagation(); // Evita que se abra el visualizador de archivo
        
        if (route) {
            console.log(`Navegando a formulario: ${route}`);
            navigate(route); // Navegación real
        } else {
            console.warn("Ruta no definida para este documento");
        }
    };

    const renderStatusBadge = (status) => {
        // ... (Tu código del badge sigue igual) ...
        // Para ahorrar espacio en la respuesta, asumo que este helper sigue aquí
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
                    {/* ... (Encabezado y textos siguen igual) ... */}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {documents.map((doc) => {
                            const isAction = doc.type === 'action';
                            // ... (Tus estilos de clases siguen igual) ...
                            const cardBaseClass = isAction ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white" : "bg-white border-slate-200 hover:border-cyan-400";
                            const textClass = isAction ? "text-white" : "text-slate-800";
                            const iconBgClass = isAction ? "bg-white/20 text-white" : "bg-teal-100 text-teal-600";

                            return (
                                <div 
                                    key={doc.id}
                                    onClick={() => handleViewFile(doc.title)}
                                    className={`relative cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition group overflow-hidden ${cardBaseClass}`}
                                >
                                    {/* 5. AQUÍ ESTÁ EL BOTÓN ACTUALIZADO */}
                                    <button 
                                        // Pasamos 'doc.route' en lugar de 'doc.title'
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

                                    {/* Contenido de la tarjeta */}
                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${doc.icon === '📋' || doc.icon === '💲' ? 'bg-cyan-100 text-cyan-600' : iconBgClass}`}>
                                                <span className="font-bold text-xl">{doc.icon}</span>
                                            </div>
                                            <h5 className={`font-semibold mb-1 ${textClass}`}>{doc.title}</h5>
                                            <p className={`text-xs inline-block px-2 py-1 rounded mb-4 ${isAction ? "bg-black/10 text-white/90" : "bg-slate-100 text-slate-500"}`}>{doc.subtitle}</p>
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

export default Despachante;