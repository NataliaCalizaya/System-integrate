import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./News.css";
import { getPostsLite } from "../../api/postApi";
import type { PostListItem } from "../../api/postApi";

const PLACEHOLDER = "https://via.placeholder.com/800x450?text=Sin+imagen";

const News = () => {
  const [news, setNews] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // lite: por defecto 30 ítems para la vista de noticias
        const { items } = await getPostsLite({ ctx: "news" });
        setNews(items);
      } catch (e: any) {
        setError(e?.message ?? "Error al cargar noticias");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleClick = (id: number) => navigate(`/news/${id}`);

  if (loading) return <p>Cargando noticias…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="news-container">
      <h1>Noticias</h1>
      <div className="news-grid">
        {news.map((item) => (
          <div
            key={item.id}
            className="news-card"
            onClick={() => handleClick(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick(item.id)}
          >
            <img
              src={item.cover_url ?? PLACEHOLDER}
              alt={item.title || "Noticia"}
              className="news-img"
            />
            <div className="news-text">
              <strong className="news-title">{item.title}</strong>
              <p className="news-description">{item.description}</p>
              <p className="news-author">Por {item.author_name ?? "Anónimo"}</p>
            </div>
          </div>
        ))}
        {news.length === 0 && <p>No hay noticias disponibles.</p>}
      </div>
    </div>
  );
};

export default News;
