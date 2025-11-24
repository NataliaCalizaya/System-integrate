import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getVideos, getVideoById } from "../../api/videosApi.ts"
import type { Video } from "../../api/videosApi.ts";
import "./Videos.css";

const Videos = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [videos, setVideos] = useState<Video[]>([]);
    const [activeVideo, setActiveVideo] = useState<Video | null>(null);

    useEffect(() => {
        document.title = 'Colegio Secundario N° 25 - Videos';
        getVideos().then(setVideos);
    }, []);

    useEffect(() => {
        if (id) {
            getVideoById(Number(id)).then((video) => {
                if (video) {
                    setActiveVideo(video);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            });
        } else {
            setActiveVideo(null);
        }
    }, [id]);

    const handleVideoClick = (videoId: number) => {
        navigate(`/videos/${videoId}`);
    };

    return (
        <div className="video-page">
            {activeVideo && (
                <div className="active-video">
                    <h2 className="video-name">{activeVideo.name}</h2>
                    <video
                        key={activeVideo.id}
                        controls
                        autoPlay
                        className="video-player"
                        poster={activeVideo.image}
                    >
                        <source src={activeVideo.videoUrl} type="video/mp4" />
                        Tu navegador no soporta el video.
                    </video>
                </div>
            )}

            <div className="video-grid">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="video-card"
                        onClick={() => handleVideoClick(video.id)}
                    >
                        <img src={video.image} alt={video.name} className="video-thumbnail" />
                        <div className="video-info">
                            <h3 className="video-title">{video.name}</h3>
                            <p className="video-meta">{video.duration} • {video.released}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;