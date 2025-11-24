import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./News.css";
import { getPostById } from "../../api/postApi";
import type { PostDetail, MediaItem } from "../../api/postApi";

// Tipos locales para la galería (mixta)
type GalleryItem =
  | { kind: "image"; src: string; thumb?: string }
  | { kind: "video"; src: string; thumb?: string }
  | { kind: "youtube"; id: string; thumb: string };

// Extrae ID de YouTube de una URL (si viene como url del provider youtube)
const extractYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "") || null;
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/\/embed\/([^/?#]+)/);
      if (m) return m[1];
    }
  } catch { }
  return null;
};

const NewsDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const data = await getPostById(Number(id)); // ← usa postApi
        setPost(data);

        const media = Array.isArray(data.media) ? data.media : [];
        const items: GalleryItem[] = media
          .filter((m) => m.status !== "rejected")
          .map((m: MediaItem) => {
            if (m.type === "image" && m.url) {
              return { kind: "image", src: m.url, thumb: m.thumb_url ?? undefined };
            }
            if (m.type === "video" && m.url) {
              return { kind: "video", src: m.url, thumb: m.thumb_url ?? undefined };
            }
            if (m.type === "youtube" && m.url) {
              const id = extractYouTubeId(m.url);
              if (id) {
                const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                return { kind: "youtube", id, thumb };
              }
            }
            return null;
          })
          .filter(Boolean) as GalleryItem[];

        setGallery(items);
      } catch (e: any) {
        setError(e?.message ?? "Error al cargar la noticia");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const openLightbox = (idx: number) => {
    setCurrent(idx);
    setIsOpen(true);
  };
  const closeLightbox = useCallback(() => setIsOpen(false), []);
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % (gallery.length || 1)),
    [gallery.length]
  );
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + (gallery.length || 1)) % (gallery.length || 1)),
    [gallery.length]
  );

  // Navegación con teclado
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLightbox, next, prev]);

  if (loading) return <p>Cargando noticia…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>No se encontró la noticia.</p>;

  const authorName = post.author_name ?? "Anónimo";

  return (
    <div className="news-detail-container">
      <h1 className="news-title">{post.title}</h1>

      {post.cover_url && (
        <img src={post.cover_url} alt={post.title} className="news-detail-image" />
      )}

      <p className="news-author">Por {authorName}{post.created_at && (
        <p className="news-date">{new Date(post.created_at).toLocaleDateString()}</p>)}</p>

      <p className="news-body">{post.body}</p>

      {/* Galería desde backend */}
      {gallery.length > 0 && (
        <section className="news-gallery">
          <h4 className="gallery-title">Galería</h4>
          <div className="gallery-grid">
            {gallery.map((g, idx) => (
              <button
                key={idx}
                className="thumb"
                onClick={() => openLightbox(idx)}
                aria-label={`Abrir elemento ${idx + 1}`}
              >
                {g.kind === "image" && (
                  <img src={g.thumb ?? g.src} alt={`Miniatura ${idx + 1}`} />
                )}
                {g.kind === "video" && (
                  <div className="thumb-video">
                    <video src={g.src} muted />
                    <span className="thumb-badge">▶</span>
                  </div>
                )}
                {g.kind === "youtube" && (
                  <div className="thumb-video">
                    <img src={g.thumb} alt={`Miniatura YouTube ${idx + 1}`} />
                    <span className="thumb-badge">▶</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox / Carrusel */}
      {isOpen && gallery.length > 0 && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close" onClick={closeLightbox} aria-label="Cerrar">×</button>
            <button className="lb-prev" onClick={prev} aria-label="Anterior">‹</button>

            {gallery[current].kind === "image" && (
              <img
                src={(gallery[current] as Extract<GalleryItem, { kind: "image" }>).src}
                className="lb-image"
                alt="Imagen"
              />
            )}
            {gallery[current].kind === "video" && (
              <video
                className="lb-video"
                src={(gallery[current] as Extract<GalleryItem, { kind: "video" }>).src}
                controls
                autoPlay
              />
            )}
            {gallery[current].kind === "youtube" && (
              <iframe
                className="lb-video"
                src={`https://www.youtube.com/embed/${(gallery[current] as Extract<GalleryItem, { kind: "youtube" }>).id
                  }?autoplay=1`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            <button className="lb-next" onClick={next} aria-label="Siguiente">›</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
