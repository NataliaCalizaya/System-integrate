import { useEffect, useState } from "react";
// Eliminamos la importación del CSS
import { getPendingSubmissions, approveSubmission, deleteSubmission } from "../../api/reviewApi";
// El tipo Submission ha sido eliminado
import { SubmissionCard } from "../../components/SubmissionCard";

const Review = () => {
    // Eliminamos las anotaciones de tipo <Submission[]> y <string | null>
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = async () => {
        try {
            setLoading(true);
            setError(null);
            // La función getPendingSubmissions devuelve la lista de trámites/envíos pendientes
            const data = await getPendingSubmissions(30); 
            setItems(data);
        } catch (e) { // Eliminamos la anotación `: any`
            console.error(e);
            setError(e?.message ?? "Error al cargar la lista de trámites pendientes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        load(); 
    }, []);

    // Eliminamos la anotación de tipo `: number`
    const handleApprove = async (id) => {
        await approveSubmission(id);
        load(); // Recarga la lista después de aprobar
    };

    // Eliminamos la anotación de tipo `: number`
    const handleDelete = async (id) => {
        await deleteSubmission(id);
        load(); // Recarga la lista después de eliminar
    };

    return (
        <div className="review-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                🛂 Revisión de Trámites Pendientes
            </h1>

            {loading && <p className="text-blue-600 font-medium p-4">Cargando trámites...</p>}
            {error && <p className="text-red-600 font-medium p-4 bg-red-50 border border-red-300 rounded-lg">{error}</p>}

            <div className="review-grid grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {items.map(it => (
                    // Asumimos que SubmissionCard (que ya fue modificado en tu proyecto) 
                    // está preparado para recibir props sin tipado y usar Tailwind si es necesario.
                    <SubmissionCard
                        key={it.id}
                        item={it}
                        onApprove={handleApprove}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {!loading && items.length === 0 && (
                <div className="text-center p-8 bg-gray-100 rounded-lg mt-6">
                    <p className="text-lg text-gray-600">🎉 No hay trámites pendientes de revisión en este momento.</p>
                    <p className="text-sm text-gray-400 mt-1">Vuelve más tarde.</p>
                </div>
            )}
        </div>
    );
};

export default Review;