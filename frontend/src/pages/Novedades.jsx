import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// No necesitamos "./News.css" si usamos Tailwind
import { getPostsLite } from "../api/postApi";

const PLACEHOLDER = "https://via.placeholder.com/800x450?text=Sin+imagen";

const Novedades = () => {
  // Eliminamos anotaciones de tipo <PostListItem[]> y <string | null>
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Usamos la función async dentro de useEffect
    const fetchNovedades = async () => {
      try {
        // lite: por defecto 30 ítems para la vista de novedades
        const { items } = await getPostsLite({ ctx: "news" });
        setNews(items);
      } catch (e) { // Eliminamos la anotación `: any`
        console.error(e);
        setError(e?.message ?? "Error al cargar las novedades");
      } finally {
        setLoading(false);
      }
    };
    fetchNovedades();
  }, []);

  // Ya no navegamos a una página de detalle, pero podemos simular la acción del botón
  const handleVerMasClick = (id) => {
    // Aquí puedes implementar:
    // 1. Una ventana modal que muestre el detalle del ítem.
    // 2. Un enlace a un sitio externo (si las novedades llevan a documentación oficial).
    console.log(`Ver más detalles para la novedad ID: ${id}`);
    // Si usas React Router, podrías navegar a una ruta genérica de detalle si existe.
    // navigate(`/detalle/${id}`); 
  };

  if (loading) return <div className="text-center py-10 text-gray-600">Cargando novedades...</div>;
  if (error) return <div className="text-center py-10 text-red-600 font-medium">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">NOVEDADES</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition duration-300 hover:shadow-xl"
          >
            {/* Imagen/Cover */}
            <div className="h-40 overflow-hidden">
                <img
                    src={item.cover_url ?? PLACEHOLDER}
                    alt={item.title || "Novedad"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            
            {/* Contenido de la Tarjeta */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <strong className="text-gray-800 text-lg font-semibold block mb-2">{item.title}</strong>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                </div>
                
                {/* Botón "Ver más" */}
                <button
                    onClick={() => handleVerMasClick(item.id)}
                    className="mt-4 w-full border border-blue-500 text-blue-600 hover:bg-blue-50 transition duration-150 py-2 rounded-lg font-medium"
                >
                    Ver más
                </button>
            </div>
          </div>
        ))}
        {news.length === 0 && <p className="col-span-4 text-center text-gray-500">No hay novedades disponibles en este momento.</p>}
      </div>
    </div>
  );
};

export default Novedades;