import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FacturaE = () => {
    const navigate = useNavigate();

    // Estado básico para simular totales
    const [items, setItems] = useState([
        { id: 1, codigo: '0001', descripcion: 'Limones Frescos - Calidad Exportación', cantidad: 1000, unidad: 'kg', precio: 1.50 }
    ]);

    // Calcular total automático
    const total = items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
   

            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
                
                {/* Botón Volver */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="mb-4 flex items-center text-slate-500 hover:text-cyan-600 transition text-sm font-medium"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Volver al Dashboard
                </button>

                {/* Contenedor Principal */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    
                    {/* Encabezado del Formulario */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white">Cargar Factura Comercial</h3>
                            <p className="text-cyan-400 text-sm">Documento Electrónico de Exportación</p>
                        </div>
                        <div className="hidden md:block">
                            <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/20">
                                Formulario E-Factura
                            </span>
                        </div>
                    </div>

                    <form className="p-6 space-y-8">

                        {/* SECCIÓN 1: DATOS GENERALES (Emisor) */}
                        <div>
                            <h4 className="text-slate-800 font-bold border-b border-slate-200 pb-2 mb-4 flex items-center">
                                <span className="bg-cyan-100 text-cyan-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                                Datos del Comprobante
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Fecha de Emisión</label>
                                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Punto de Venta</label>
                                    <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none">
                                        <option>00002 - Exportación</option>
                                        <option>00001 - Local</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Concepto</label>
                                    <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none">
                                        <option>Productos</option>
                                        <option>Servicios</option>
                                        <option>Productos y Servicios</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 2: DATOS DEL RECEPTOR (Cliente) */}
                        <div>
                            <h4 className="text-slate-800 font-bold border-b border-slate-200 pb-2 mb-4 flex items-center">
                                <span className="bg-cyan-100 text-cyan-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                                Datos del Receptor
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Razón Social / Cliente</label>
                                    <input type="text" placeholder="Ej: Google LLC" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">ID Impositivo / Tax ID</label>
                                    <input type="text" placeholder="55000002126" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Domicilio</label>
                                    <input type="text" placeholder="1600 Amphitheatre Pkwy, Mountain View, CA" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">País Destino</label>
                                    <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none">
                                        <option>Estados Unidos</option>
                                        <option>Chile</option>
                                        <option>Brasil</option>
                                        <option>China</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Condición IVA</label>
                                    <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none">
                                        <option>IVA Exento Operación de Exportación</option>
                                        <option>Responsable Inscripto</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Incoterms</label>
                                    <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none">
                                        <option>FOB - Free on Board</option>
                                        <option>CIF - Cost, Insurance and Freight</option>
                                        <option>EXW - Ex Works</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 3: DETALLE (Tabla) */}
                        <div>
                            <h4 className="text-slate-800 font-bold border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="bg-cyan-100 text-cyan-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                                    Detalle de la Operación
                                </div>
                                <button type="button" className="text-sm text-cyan-600 hover:text-cyan-700 font-semibold">+ Agregar Ítem</button>
                            </h4>
                            
                            <div className="overflow-x-auto rounded-lg border border-slate-200">
                                <table className="w-full text-sm text-left text-slate-600">
                                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-3">Código</th>
                                            <th className="px-4 py-3 w-1/3">Descripción</th>
                                            <th className="px-4 py-3">Cantidad</th>
                                            <th className="px-4 py-3">U. Medida</th>
                                            <th className="px-4 py-3 text-right">Precio Unit.</th>
                                            <th className="px-4 py-3 text-right">Subtotal</th>
                                            <th className="px-4 py-3 text-center">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.id} className="bg-white hover:bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">{item.codigo}</td>
                                                <td className="px-4 py-3">{item.descripcion}</td>
                                                <td className="px-4 py-3">{item.cantidad.toFixed(2)}</td>
                                                <td className="px-4 py-3">{item.unidad}</td>
                                                <td className="px-4 py-3 text-right text-emerald-600 font-medium">USD {item.precio.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right font-bold text-slate-800">USD {(item.cantidad * item.precio).toFixed(2)}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <button type="button" className="text-red-500 hover:text-red-700">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-slate-50">
                                        <tr>
                                            <td colSpan="5" className="px-4 py-3 text-right font-bold text-slate-700">TOTAL OPERACIÓN:</td>
                                            <td className="px-4 py-3 text-right font-bold text-xl text-cyan-600">USD {total.toFixed(2)}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* ACCIONES DEL FORMULARIO */}
                        <div className="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 pt-6 border-t border-slate-200">
                            <button 
                                type="button" 
                                className="w-full md:w-auto px-6 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 font-medium transition"
                                onClick={() => navigate(-1)}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="w-full md:w-auto px-8 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-md hover:from-cyan-600 hover:to-teal-600 font-bold shadow-md transition transform hover:scale-105"
                            >
                                Guardar Factura
                            </button>
                        </div>

                    </form>
                </div>
            </main>

        
        </div>
    );
};

export default FacturaE;