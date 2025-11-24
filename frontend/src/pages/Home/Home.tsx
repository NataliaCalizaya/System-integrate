import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getPostsLite } from "../../api/postApi";
import type { PostListItem } from "../../api/postApi";

const PLACEHOLDER = "https://via.placeholder.com/800x450?text=Sin+imagen";

const Home = () => {
    const [recentNews, setRecentNews] = useState<PostListItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Colegio Secundario N° 25";
    }, []);

    useEffect(() => {
        (async () => {
            try {
                // ctx: "home" -> por defecto 3 ítems (también podrías usar { limit: 3 })
                const { items } = await getPostsLite({ ctx: "home" });
                setRecentNews(items);
            } catch (e) {
                console.error("Error cargando noticias recientes", e);
            }
        })();
    }, []);

    return (
        <div className="home-container">
            {/* Imagen principal con bienvenida encima */}
            <div className="hero">
                <img src="/frente.webp" alt="Frente del colegio" className="hero-img" />
                <div className="hero-overlay">
                    <img src="/icon.jpg" alt="Icono" className="hero-icon" />
                    <h1 className="hero-text">Bienvenidos al Colegio Secundario N° 25</h1>
                </div>
            </div>

            {/* Orientaciones */}
            <div className="orientations">
                <div className="orientation-card">
                    <img src="/comunicacion.png" alt="Comunicación" />
                    <p>Orientación en Comunicación</p>
                </div>
                <div className="orientation-card">
                    <img src="/institucional.jpg" alt="Institucional" />
                    <p>Información Institucional</p>
                </div>
                <div className="orientation-card">
                    <img src="/economia.jpg" alt="Economía" />
                    <p>Orientación en Economía y Administración</p>
                </div>
            </div>

            {/* Noticias recientes */}
            <div className="recent-news">
                <h2>Noticias recientes</h2>
                <div className="news-grid">
                    {recentNews.map((item) => (
                        <div
                            key={item.id}
                            className="news-card"
                            onClick={() => navigate(`/news/${item.id}`)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(`/news/${item.id}`)}
                        >
                            <img
                                src={item.cover_url ?? PLACEHOLDER}
                                alt={item.title}
                                className="news-img"
                            />
                            <div className="news-text">
                                <strong className="news-title">{item.title}</strong>
                                <p className="news-description">{item.description}</p>
                                <p className="news-author">Por {item.author_name ?? "Anónimo"}</p>
                            </div>
                        </div>
                    ))}
                    {recentNews.length === 0 && <p>No hay noticias disponibles.</p>}
                </div>
            </div>
        </div>
    );
};

export default Home;
