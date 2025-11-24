import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { approveSubmission, deleteSubmission } from "../../api/reviewApi";
// Las importaciones de tipos y getPostById han sido eliminadas.
// La función getPostById debe ser reemplazada por tu propia función JS/API en un entorno real.

const PLACEHOLDER = "https://via.placeholder.com/800x450?text=Sin+imagen";

// Función utilitaria sin anotaciones de tipo
const formatDate = (iso) => {
    if (!iso) return "";
    try {
        // La lógica de new Date().toLocaleDateString() funciona igual en JS
        return new Date(iso).toLocaleDateString();
    } catch {
        return "";
    }
};

// --- SIMULACIÓN DE DATOS (REEMPLAZAR EN ENTORNO REAL) ---
// Define la estructura que esperarías sin usar interfaces
const MOCK_ITEM = {
    id: 123,
    title: "Documentación de Exportación para Tránsito Binacional",
    subtitle: "Revisión preliminar de carga N° 4587.",
    description: "La documentación presentada cumple con el 80% de los requisitos básicos para el despacho aduanero. Se requiere adjuntar el Certificado Fitosanitario.",
    body: "Detalle del cuerpo del documento y observaciones:\n\n1. Factura Comercial: Correcta.\n2. Conocimiento de Embarque: Correcto.\n3. Certificado de Origen: Pendiente de validación.\n4. Seguros: Correcto.",
    author_name: "Agente de Carga XYZ",
    cover_url: PLACEHOLDER,
    caption: "Contenedores en el punto de inspección.",
    published_at: "2025-11-20T10:00:00Z",
    created_at: "2025-11-22T14:30:00Z",
    media: [
        { id: 1, type: "image", url: PLACEHOLDER, thumb_url: PLACEHOLDER },
        { id: 2, type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ]
};

// SIMULACIÓN DE getPostById (REEMPLAZAR)
const getPostById = async (id) => {
    // Simula una pequeña demora de red
    await new Promise(resolve => setTimeout(resolve, 500));
    if (id === MOCK_ITEM.id) {
        return MOCK_ITEM;
    }
    throw new Error("Envío no encontrado en la base de datos.");
};
// ----------------------------------------------------------------

const ReviewDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Eliminamos las anotaciones de tipo de useState
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        // Eliminamos la anotación de tipo de la función asíncrona (e.g., e: any)
        (async () => {
            if (!id) return;
            try {
                setLoading(true);
                setErr(null);
                // Usamos la función getPostById (ya sea la simulada o tu versión JS/API)
                const data = await getPostById(Number(id)); 
                setItem(data);
            } catch (e) {
                setErr(e?.message ?? "Error al cargar el envío");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleApprove = async () => {
        if (!id) return;
        // La función de API debe manejar la aprobación (envío de la solicitud a /reviewApi)
        await approveSubmission(Number(id));
        navigate("/review");
    };

    const handleDelete = async () => {
        if (!id) return;
        // La función de API debe manejar la eliminación
        await deleteSubmission(Number(id));
        navigate("/review");
    };

    if (loading) return <p className="text-gray-600 p-4">Cargando detalles de envío...</p>;
    if (err) return <p className="text-red-600 p-4 font-medium">{err}</p>;
    if (!item) return <p className="text-gray-600 p-4">Envío no encontrado.</p>;

    const dateLabel = formatDate(item.published_at || item.created_at);

    return (
        <div className="review-detail max-w-5xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
            
            {/* Topbar y Acciones */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <Link to="/review" className="text-blue-600 hover:text-blue-800 transition font-medium">
                    ← Volver a Revisión
                </Link>
                <div className="space-x-4">
                    <button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-bold transition shadow-md">
                        Aceptar y Publicar
                    </button>
                    <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-bold transition shadow-md">
                        Eliminar Envío
                    </button>
                </div>
            </div>

            {/* Contenido del Envío */}
            <article className="news-article space-y-6">
                <h1 className="text-4xl font-extrabold text-gray-900">{item.title}</h1>
                {item.subtitle && <h3 className="text-xl font-semibold text-gray-700">{item.subtitle}</h3>}

                <div className="text-sm text-gray-500">
                    <span>Por {item.author_name ?? "Agente Desconocido"}</span>
                    {dateLabel && <span> • Fecha: {dateLabel}</span>}
                </div>

                <img
                    src={item.cover_url ?? PLACEHOLDER}
                    alt={item.title}
                    className="w-full max-h-96 object-cover rounded-lg shadow-inner"
                />

                {item.caption && <p className="text-sm text-gray-600 italic mt-2">{item.caption}</p>}

                {/* Cuerpo del Mensaje/Documento */}
                <div className="news-body whitespace-pre-line leading-relaxed text-gray-800 pt-4 border-t">
                    <p className="font-semibold text-lg mb-2">Detalles del Trámite:</p>
                    {/* Usamos el contenido del body directamente, asumiendo saltos de línea */}
                    <p>{item.body}</p> 
                </div>

                {/* Galería (si hay media extra) */}
                {Array.isArray(item.media) && item.media.length > 0 && (
                    <section className="news-gallery pt-6 border-t mt-6">
                        <h4 className="text-2xl font-bold mb-4 text-gray-800">Archivos Adjuntos (Galería)</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {/* Eliminamos la anotación de tipo (m: MediaItem) */}
                            {item.media.map((m) => (
                                <div key={m.id} className="bg-gray-100 p-2 rounded-lg shadow-sm overflow-hidden">
                                    {m.type === "image" && (
                                        <img 
                                            src={m.thumb_url ?? m.url} 
                                            alt={`media-${m.id}`} 
                                            className="w-full h-auto rounded-md object-cover"
                                        />
                                    )}
                                    {m.type === "video" && (
                                        <video 
                                            src={m.url} 
                                            muted 
                                            controls 
                                            className="w-full h-auto rounded-md" 
                                        />
                                    )}
                                    {m.type === "youtube" && (
                                        <iframe
                                            title={`yt-${m.id}`}
                                            src={m.url}
                                            className="w-full aspect-video rounded-md"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    )}
                                    {/* Si hay otro tipo de archivo no mostrado, puedes añadir un placeholder */}
                                    {!["image", "video", "youtube"].includes(m.type) && (
                                        <p className="text-sm text-gray-500">Archivo adjunto ({m.type})</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
};

export default ReviewDetail;