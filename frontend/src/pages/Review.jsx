import { useEffect, useState } from "react";
// Importamos el componente que acabamos de adaptar
import SubmissionCard from "../../components/SubmissionCard";

const Review = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- MOCK DATA ---
    useEffect(() => {
        setTimeout(() => {
            setItems([
                {
                    id: 1,
                    title: "Permiso de Embarque #9988",
                    type: "Permiso de Embarque",
                    company: "Frutas del Valle S.A.",
                    broker: "Estudio Aduanero Pérez",
                    date: "2025-11-25",
                    agency: "AFIP", 
                    cover_url: "https://images.unsplash.com/photo-1566576912906-600aceebca9b?auto=format&fit=crop&q=80&w=600",
                    status: "pending"
                },
                {
                    id: 2,
                    title: "Certificado Fitosanitario Lote A",
                    type: "Certificado Fitosanitario",
                    company: "Citrus del Norte",
                    broker: "Agencia Marítima Global",
                    date: "2025-11-24",
                    agency: "SENASA",
                    cover_url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=600",
                    status: "pending"
                },
                {
                    id: 3,
                    title: "Factura E - Exp. Limones",
                    type: "Factura Comercial",
                    company: "Vinos de Altura S.R.L.",
                    broker: "Estudio Aduanero Pérez",
                    date: "2025-11-24",
                    agency: "AFIP",
                    // Sin cover_url para probar el placeholder
                    status: "pending"
                }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    // Funciones manejadoras (Handlers)
    const handleApprove = (id) => {
        // Aquí llamarías a la API real
        alert(`Trámite #${id} APROBADO desde la lista rápida.`);
        // Simulamos quitarlo de la lista
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const handleDelete = (id) => {
        if(window.confirm("¿Estás seguro de rechazar este trámite?")) {
            alert(`Trámite #${id} RECHAZADO.`);
            setItems(prev => prev.filter(item => item.id !== id));
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 py-8">
                
                {/* Encabezado del Panel */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border-l-4 border-cyan-500">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Panel de Control Unificado
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Bandeja de entrada para revisión de documentación (AFIP / SENASA / ARCA).
                    </p>
                </div>

                {loading && (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-600 mx-auto"></div>
                        <p className="text-slate-500 mt-3">Cargando trámites pendientes...</p>
                    </div>
                )}

                {/* Grid de Trámites usando el COMPONENTE */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {!loading && items.map((item) => (
                        <SubmissionCard
                            key={item.id}
                            item={item}
                            onApprove={handleApprove}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {!loading && items.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                        <p className="text-xl text-slate-400">✅ No hay trámites pendientes de revisión.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Review;