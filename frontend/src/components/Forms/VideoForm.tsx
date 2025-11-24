import { useState } from "react";
import { createVideo } from "../../api/videosApi";

export const VideoForm = () => {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [released, setReleased] = useState(""); // dd/mm/aa
    const [thumbFile, setThumbFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const [status, setStatus] = useState<null | string>(null);

    const onThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThumbFile(e.target.files?.[0] || null);
    };

    const onVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideoFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            (document.getElementById("video-thumb") as HTMLInputElement).value = "";
            (document.getElementById("video-file") as HTMLInputElement).value = "";
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
