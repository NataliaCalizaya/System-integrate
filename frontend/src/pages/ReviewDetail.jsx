import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { approveSubmission, deleteSubmission } from "../../api/reviewApi"; 

const ReviewDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- MOCK DATA DETAIL ---
    useEffect(() => {
        setTimeout(() => {
            setItem({
                id: id,
                title: "Permiso de Embarque #4587-B",
                agency: "AFIP", // Cambiar a SENASA para probar colores verdes
                company: "Frutas del Valle S.A.",
                cuit: "30-11223344-5",
                broker: "Estudio Aduanero Pérez",
                status: "pending",
                description: "Declaración de exportación de limones frescos a granel. Partida arancelaria 0805.50.",
                docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Placeholder PDF
            });
            setLoading(false);
        }, 500);
    }, [id]);

    const handleApprove = () => {
        // await approveSubmission(id);
        alert("✅ Trámite APROBADO oficialmente. Se ha notificado al despachante.");
        navigate("/review");
    };

    const handleReject = () => {
        // await deleteSubmission(id);
        const motivo = prompt("Ingrese el motivo de la observación/rechazo:");
        if (motivo) {
            alert(`⚠️ Trámite OBSERVADO. Motivo: ${motivo}`);
            navigate("/review");
        }
    };

    if (loading) return <div className="p-10 text-center text-slate-500">Cargando expediente...</div>;
    if (!item) return <div className="p-10 text-center text-red-500">Expediente no encontrado.</div>;

    const isSenasa = item.agency === 'SENASA';
    const themeColor = isSenasa ? 'green' : 'blue'; // AFIP=Blue, SENASA=Green

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 py-8">
                
                {/* Navegación Breadcrumb */}
                <Link to="/review" className="inline-flex items-center text-slate-500 hover:text-cyan-600 mb-6 transition">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Volver a la Bandeja de Entrada
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* COLUMNA IZQUIERDA: VISUALIZADOR DE DOCUMENTO */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-1 overflow-hidden">
                            <div className="bg-slate-800 text-white px-4 py-2 text-sm flex justify-between items-center rounded-t">
                                <span>Vista Previa del Documento</span>
                                <span className="opacity-70">PDF - 1.2 MB</span>
                            </div>
                            {/* Placeholder visualizador PDF */}
                            <div className="w-full h-[600px] bg-slate-200 flex flex-col items-center justify-center text-slate-500">
                                
                                <svg className="w-16 h-16 mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                <p>Visualización del Documento Digital</p>
                                <a href="#" className="mt-2 text-cyan-600 underline text-sm hover:text-cyan-800">Descargar Original</a>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: DATOS Y ACCIONES */}
                    <div className="space-y-6">
                        
                        {/* Tarjeta de Información */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4" style={{ borderColor: isSenasa ? '#22c55e' : '#2563eb' }}>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-xs font-bold text-white px-2 py-1 rounded ${isSenasa ? 'bg-green-600' : 'bg-blue-600'}`}>
                                    Revisión {item.agency}
                                </span>
                                <span className="text-xs text-slate-400">ID: {item.id}</span>
                            </div>
                            
                            <h2 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h2>
                            <p className="text-sm text-slate-500 mb-6">{item.description}</p>

                            <div className="space-y-3 border-t border-slate-100 pt-4">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-semibold">Empresa Exportadora</p>
                                    <p className="text-slate-800 font-medium">{item.company}</p>
                                    <p className="text-xs text-slate-500">CUIT: {item.cuit}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-semibold">Despachante / Agente</p>
                                    <p className="text-slate-800 font-medium">{item.broker}</p>
                                </div>
                            </div>
                        </div>

                        {/* Panel de Acciones */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-slate-800 font-bold mb-4">Resolución Oficial</h3>
                            
                            <div className="space-y-3">
                                <button 
                                    onClick={handleApprove}
                                    className={`w-full text-white font-bold py-3 px-4 rounded-lg shadow-md transition transform hover:scale-[1.02] 
                                    ${isSenasa 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                                    }`}
                                >
                                    ✓ APROBAR TRÁMITE
                                </button>
                                
                                <button 
                                    onClick={handleReject}
                                    className="w-full bg-white text-rose-600 border border-rose-200 font-bold py-3 px-4 rounded-lg hover:bg-rose-50 transition"
                                >
                                    ✕ Observar / Rechazar
                                </button>
                            </div>
                            
                            <p className="text-xs text-slate-400 text-center mt-4">
                                Al aprobar, se generará el certificado digital automáticamente.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;