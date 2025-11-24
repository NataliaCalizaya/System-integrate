import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Exportador = () => {

    // Función placeholder para cuando el usuario haga clic en una opción
    const handleOptionClick = (option) => {
        console.log(`Navegando a: ${option}`);
        // Aquí iría tu lógica: navigate('/upload-invoice'), etc.
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
          

            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
                {/* Contenedor Principal (Tarjeta Blanca) */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    
                    {/* Encabezado de la Sección */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800">Empresa Exportadora</h3>
                            <p className="text-cyan-600 font-medium mt-1">Origen de la operación</p>
                        </div>
                        <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-2 rounded-md hover:from-cyan-600 hover:to-teal-600 transition shadow-md font-medium whitespace-nowrap">
                            Solicitar Control a SENASA
                        </button>
                    </div>
                    
                    <p className="text-slate-600 mb-8 max-w-3xl">
                        La empresa carga la documentación comercial y solicita los controles necesarios para habilitar la exportación de cítricos.
                    </p>

                    <h4 className="font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">Funcionalidades</h4>
                    
                    {/* Grid de Funcionalidades */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        
                        {/* Card 1: Factura Comercial */}
                        <div 
                            onClick={() => handleOptionClick('factura')}
                            className="cursor-pointer border border-slate-200 rounded-lg p-4 hover:border-cyan-400 hover:shadow-md transition group bg-white"
                        >
                            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-cyan-600 font-bold text-xl">📄</span>
                            </div>
                            <h5 className="font-semibold text-slate-800 mb-1">Cargar Factura Comercial</h5>
                            <p className="text-xs text-slate-500">Documento Comercial</p>
                        </div>

                        {/* Card 2: Clasificación Arancelaria */}
                        <div 
                            onClick={() => handleOptionClick('arancel')}
                            className="cursor-pointer border border-slate-200 rounded-lg p-4 hover:border-cyan-400 hover:shadow-md transition group bg-white"
                        >
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-teal-600 font-bold text-xl">🏷️</span>
                            </div>
                            <h5 className="font-semibold text-slate-800 mb-1">Cargar Clasificación Arancelaria</h5>
                            <p className="text-xs text-slate-500">Datos de Mercadería</p>
                        </div>

                        {/* Card 3: Packing List */}
                        <div 
                            onClick={() => handleOptionClick('packing')}
                            className="cursor-pointer border border-slate-200 rounded-lg p-4 hover:border-cyan-400 hover:shadow-md transition group bg-white"
                        >
                            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-cyan-600 font-bold text-xl">📦</span>
                            </div>
                            <h5 className="font-semibold text-slate-800 mb-1">Cargar Packing List</h5>
                            <p className="text-xs text-slate-500">Detalle de Carga</p>
                        </div>

                        {/* Card 4: Certificado de Origen */}
                        <div 
                            onClick={() => handleOptionClick('origen')}
                            className="cursor-pointer border border-slate-200 rounded-lg p-4 hover:border-cyan-400 hover:shadow-md transition group bg-white"
                        >
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-teal-600 font-bold text-xl">✓</span>
                            </div>
                            <h5 className="font-semibold text-slate-800 mb-1">Cargar Certificado de Origen</h5>
                            <p className="text-xs text-slate-500">Origen del Producto</p>
                        </div>

                        {/* Card 5: Solicitud ARCA */}
                        <div 
                            onClick={() => handleOptionClick('arca')}
                            className="cursor-pointer border border-slate-200 rounded-lg p-4 hover:border-cyan-400 hover:shadow-md transition group bg-white"
                        >
                            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-cyan-600 font-bold text-xl">📨</span>
                            </div>
                            <h5 className="font-semibold text-slate-800 mb-1">Enviar Solicitud de Control a ARCA</h5>
                            <p className="text-xs text-slate-500">Revisión Aduanera en Origen</p>
                        </div>
                    </div>

                    {/* Nota Informativa */}
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