import React from 'react';


const Despachante = () => {

    const handleOptionClick = (option) => {
        console.log(`Navegando a: ${option}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
                {/* Contenedor Principal */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    
                    {/* Encabezado de la Sección */}
                    <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-slate-800">Despachante de Aduana</h3>
                            <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-cyan-200">
                                Intermediario especializado
                            </span>
                        </div>
                        <p className="text-slate-600 max-w-4xl">
                            El despachante utiliza la información de la empresa para gestionar los permisos y servicios aduaneros necesarios para la exportación.
                        </p>
                    </div>

                    <h4 className="font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">Funcionalidades</h4>
                    
                    {/* Grid de Funcionalidades */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        
                        {/* Card 1: Permiso de Embarque (Blanca) */}
                        <div 
                            onClick={() => handleOptionClick('permiso_embarque')}
                            className="cursor-pointer border border-slate-200 rounded-lg p-4 hover:border-cyan-400 hover:shadow-md transition group bg-white"
                        >
                            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-cyan-600 font-bold text-xl">📋</span>
                            </div>
                            <h5 className="font-semibold text-slate-800 mb-1">Cargar Permiso de Embarque</h5>
                            <p className="text-xs text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded">Formulario Aduanero</p>
                        </div>

                        {/* Card 2: Pago de Aranceles (Blanca) */}
                        <div 
                            onClick={() => handleOptionClick('pago_aranceles')}
                            className="cursor-pointer border border-slate-200 rounded-lg p-4 hover:border-cyan-400 hover:shadow-md transition group bg-white"
                        >
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-teal-600 font-bold text-xl">💲</span>
                            </div>
                            <h5 className="font-semibold text-slate-800 mb-1">Registrar Pago de Aranceles</h5>
                            <p className="text-xs text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded">Comprobante</p>
                        </div>

                        {/* --- Card 3: Servicio de Aduana (ESTILO BOTÓN VERDE DESTACADO) --- */}
                        <div 
                            onClick={() => handleOptionClick('servicio_aduana')}
                            className="cursor-pointer rounded-lg p-4 shadow-md transition transform hover:scale-[1.02] hover:shadow-lg group bg-gradient-to-r from-cyan-500 to-teal-500 text-white relative overflow-hidden border border-transparent"
                        >
                            {/* Círculo decorativo sutil en el fondo */}
                            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white opacity-10 rounded-full pointer-events-none"></div>

                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                                <span className="text-white font-bold text-xl">👮</span>
                            </div>
                            <h5 className="font-bold text-white mb-1 text-lg">Solicitar Servicio de Aduana</h5>
                            <p className="text-xs text-white/90 bg-black/10 inline-block px-2 py-1 rounded backdrop-blur-md">
                                Intervención Aduanera
                            </p>
                        </div>

                        {/* Card 4: Asociar Documentación (Blanca) */}
                        <div 
                            onClick={() => handleOptionClick('asociar_docs')}
                            className="cursor-pointer border border-slate-200 rounded-lg p-4 hover:border-cyan-400 hover:shadow-md transition group bg-white"
                        >
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-teal-600 font-bold text-xl">🔗</span>
                            </div>
                            <h5 className="font-semibold text-slate-800 mb-1">Asociar Documentación Comercial</h5>
                            <p className="text-xs text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded">Factura / Packing / Origen</p>
                        </div>

                    </div>

                    {/* Nota Footer */}
                    <div className="mt-8 p-4 bg-teal-50 border-l-4 border-teal-500 rounded text-sm text-slate-700">
                        <p>
                            El despachante vincula la documentación de la empresa con los trámites oficiales ante Aduana Argentina y otros organismos de control.
                        </p>
                    </div>

                </div>
            </main>

        </div>
    );
};

export default Despachante;