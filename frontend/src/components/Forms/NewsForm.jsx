// src/components/Forms/NewsForm.tsx
// src/components/Forms/NewsForm.jsx
import { useState } from "react";
import { createPost } from "../../api/postApi";

const getCookie = (name) =>
    document.cookie.split("; ").find(r => r.startsWith(name + "="))?.split("=")[1] || "";

export const NewsForm = () => {
    // Los estados ya no requieren la anotación de tipo
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [caption, setCaption] = useState("");
    const [body, setBody] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [publishedAt, setPublishedAt] = useState(""); // input datetime-local

    const [imageFile, setImageFile] = useState(null); // portada (img o video)
    const [galleryFiles, setGalleryFiles] = useState([]);  // galería (imgs/videos)

    const [status, setStatus] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Se elimina la anotación de tipo del evento (e)
    const onMainImageChange = (e) => {
        const f = e.target.files?.[0] || null;
        setImageFile(f);
    };

    // Se elimina la anotación de tipo del evento (e)
    const onGalleryChange = (e) => {
        const files = Array.from(e.target.files ?? []);
        setGalleryFiles(files);
    };

    // Funciones de utilidad se mantienen (ya son JS válido)
    const isImage = (f) => f.type.startsWith("image/");
    const isVideo = (f) => f.type.startsWith("video/");

    // Se elimina la anotación de tipo del evento (e)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        setSubmitting(true);

        try {
            // uploader_id desde cookie (si estás logueado)
            const uploaderRaw = getCookie("id");
            const uploader_id = uploaderRaw ? Number(decodeURIComponent(uploaderRaw)) : null;

            // convertir datetime-local → ISO (opcional)
            const published_iso = publishedAt ? new Date(publishedAt).toISOString() : null;

            const created = await createPost(
                {
                    title,
                    subtitle,
                    description,
                    caption,
                    body,
                    author_name: authorName,
                    uploader_id,
                    published_at: published_iso,
                },
                {
                    cover: imageFile ?? null,       // portada (puede ser imagen o video)
                    gallery: galleryFiles ?? [],    // galería
                },
                { withCredentials: true }         // si el backend usa cookies de sesión
            );
            console.log(created)
            setStatus("✅ Noticia creada con éxito");
            // reset campos
            setTitle(""); setSubtitle(""); setDescription("");
            setCaption(""); setBody(""); setAuthorName(""); setPublishedAt("");
            setImageFile(null); setGalleryFiles([]);

            // limpiar inputs file. Se elimina la aserción de tipo `as HTMLInputElement`
            document.getElementById("news-image").value = "";
            document.getElementById("news-gallery").value = "";

            // si querés redirigir al detalle:
            // navigate(`/news/${created.id}`);
        } catch (err) { // Se elimina la anotación `: any`
            console.error(err);
            setStatus(err.message ?? "❌ Ocurrió un error al cargar la noticia");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-grid" encType="multipart/form-data">
            <h2>Cargar noticia</h2>

            <label>Título *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Subtítulo / Bajada</label>
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />

            <label>Descripción (resumen)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />

            <label>Imagen o video principal (portada)</label>
            <input id="news-image" type="file" accept="image/*,video/*" onChange={onMainImageChange} />

            <label>Epígrafe</label>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} />

            <label>Cuerpo *</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} required />

            <label>Autor</label>
            <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} />

            <label>Fecha de publicación</label>
            <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
            />

            <hr />

            <label>Galería (imágenes y/o videos)</label>
            <input
                id="news-gallery"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={onGalleryChange}
            />

            {galleryFiles.length > 0 && (
                <div
                    style={{
                        display: "grid",
                        gap: ".75rem",
                        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                        marginTop: ".5rem",
                    }}
                >
                    {galleryFiles.map((f, idx) => (
                        <div key={idx} style={{ position: "relative" }}>
                            {isImage(f) ? (
                                <img
                                    src={URL.createObjectURL(f)}
                                    alt={f.name}
                                    style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 8 }}
                                    // Se elimina la aserción de tipo `as HTMLImageElement`
                                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                />
                            ) : isVideo(f) ? (
                                <video
                                    src={URL.createObjectURL(f)}
                                    muted
                                    style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 8 }}
                                    // Se elimina la aserción de tipo `as HTMLVideoElement`
                                    onLoadedData={(e) => URL.revokeObjectURL(e.target.src)}
                                />
                            ) : (
                                <div style={{ padding: "1rem", background: "#f5f5f5", borderRadius: 8 }}>
                                    {f.name}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <button type="submit" disabled={submitting}>
                {submitting ? "Guardando..." : "Guardar"}
            </button>

            {status && <p>{status}</p>}
        </form>
    );
};