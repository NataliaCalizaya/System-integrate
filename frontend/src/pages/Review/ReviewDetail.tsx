import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Review.css";
import { approveSubmission, deleteSubmission } from "../../api/reviewApi";
import { getPostById } from "../../api/postApi";
import type { PostDetail, MediaItem } from "../../api/postApi";

const PLACEHOLDER = "https://via.placeholder.com/800x450?text=Sin+imagen";

const formatDate = (iso?: string | null) => {
    if (!iso) return "";
    try {
        return new Date(iso).toLocaleDateString();
    } catch {
        return "";
    }
};

const ReviewDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState<PostDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (!id) return;
            try {
                setLoading(true);
                setErr(null);
                const data = await getPostById(Number(id));
                setItem(data);
            } catch (e: any) {
                setErr(e?.message ?? "Error al cargar el envío");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleApprove = async () => {
        if (!id) return;
        await approveSubmission(Number(id));
        navigate("/review");
    };

    const handleDelete = async () => {
        if (!id) return;
        await deleteSubmission(Number(id));
        navigate("/review");
    };

    if (loading) return <p>Cargando…</p>;
    if (err) return <p style={{ color: "red" }}>{err}</p>;
    if (!item) return <p>No encontrado.</p>;

    const dateLabel = formatDate(item.published_at || item.created_at);

    return (
        <div className="review-detail">
            <div className="detail-topbar">
                <Link to="/review" className="btn-back">← Volver</Link>
                <div className="actions">
                    <button onClick={handleApprove} className="btn-approve">Aceptar</button>
                    <button onClick={handleDelete} className="btn-delete">Eliminar</button>
                </div>
            </div>

            <article className="news-article">
                <h1 className="news-title">{item.title}</h1>
                {item.subtitle && <h3 className="news-subtitle">{item.subtitle}</h3>}

                <div className="news-meta">
                    <span>Por {item.author_name ?? "Anónimo"}</span>
                    {dateLabel && <span> • {dateLabel}</span>}
                </div>

                <img
                    src={item.cover_url ?? PLACEHOLDER}
                    alt={item.title}
                    className="news-detail-image"
                />

                {item.caption && <p className="news-caption">{item.caption}</p>}

                <p className="news-body">{item.body}</p>

                {/* Galería (si hay media extra) */}
                {Array.isArray(item.media) && item.media.length > 0 && (
                    <section className="news-gallery">
                        <h4 className="gallery-title">Galería</h4>
                        <div className="gallery-grid">
                            {item.media.map((m: MediaItem) => (
                                <div key={m.id} className="thumb">
                                    {m.type === "image" && (
                                        <img src={m.thumb_url ?? m.url} alt={`media-${m.id}`} />
                                    )}
                                    {m.type === "video" && (
                                        <video src={m.url} muted controls style={{ width: "100%" }} />
                                    )}
                                    {m.type === "youtube" && (
                                        <iframe
                                            title={`yt-${m.id}`}
                                            src={m.url}
                                            className="yt-embed"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
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
