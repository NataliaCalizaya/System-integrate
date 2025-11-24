import { useState } from "react";
import { createVideo } from "../../api/videosApi";

export const VideoForm = () => {
    // Los estados ya no necesitan anotaciones de tipo
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [released, setReleased] = useState(""); // dd/mm/aa
    const [thumbFile, setThumbFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    const [status, setStatus] = useState(null);

    // Se eliminan las anotaciones de tipo del evento (e)
    const onThumbChange = (e) => {
        setThumbFile(e.target.files?.[0] || null);
    };

    // Se eliminan las anotaciones de tipo del evento (e)
    const onVideoChange = (e) => {
        setVideoFile(e.target.files?.[0] || null);
    };

    // Se eliminan las anotaciones de tipo del evento (e)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        if (!thumbFile || !videoFile) {
            setStatus("❌ Falta la miniatura o el archivo de video");
            return;
        }

        try {
            await createVideo({
                name,
                duration,
                released,
                thumbFile,
                videoFile,
            });
            setStatus("✅ Video cargado con éxito");
            setName(""); setDuration(""); setReleased("");
            setThumbFile(null); setVideoFile(null);
            
            // Se elimina la aserción de tipo `as HTMLInputElement`
            document.getElementById("video-thumb").value = "";
            document.getElementById("video-file").value = "";
            
        } catch (err) {
            console.error(err);
            setStatus("❌ Ocurrió un error al cargar el video");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-grid">
            <h2>Cargar video</h2>

            <label>Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Duración (mm:ss)</label>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} required />

            <label>Fecha de publicación (dd/mm/aa)</label>
            <input
                value={released}
                onChange={(e) => setReleased(e.target.value)}
                placeholder="dd/mm/aa"
                required
            />

            <label>Miniatura (imagen)</label>
            <input id="video-thumb" type="file" accept="image/*" onChange={onThumbChange} required />

            <label>Archivo de video</label>
            <input id="video-file" type="file" accept="video/*" onChange={onVideoChange} required />

            <button type="submit">Guardar</button>
            {status && <p>{status}</p>}
        </form>
    );
};
