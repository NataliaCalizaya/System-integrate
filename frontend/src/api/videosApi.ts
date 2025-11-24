export interface Video {
    id: number;
    name: string;
    duration: string;
    image: string;
    released: string;
    videoUrl: string;
}

let mockVideos: Video[] = [
    {
        id: 1,
        name: 'Introducción a React',
        duration: '10:25',
        image: 'https://purina.com.pe/sites/default/files/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg',
        released: '01/07/25',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    },
    {
        id: 2,
        name: 'TypeScript Basics',
        duration: '15:40',
        image: 'https://i0.wp.com/puppis.blog/wp-content/uploads/2022/02/abc-cuidado-de-los-gatos-min.jpg',
        released: '05/07/25',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    }
];

export const getVideos = (): Promise<Video[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockVideos), 500);
    });
};

export const getVideoById = (id: number): Promise<Video | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const video = mockVideos.find((v) => v.id === id);
            resolve(video);
        }, 500);
    });
};

export interface CreateVideoPayload {
    name: string;
    duration: string;
    released: string; // dd/mm/aa
    thumbFile: File;  // imagen miniatura
    videoFile: File;  // archivo de video
}

export const createVideo = async (data: CreateVideoPayload) => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("duration", data.duration);
    form.append("released", data.released);
    form.append("thumbnail", data.thumbFile); // <-- archivo
    form.append("video", data.videoFile);     // <-- archivo

    // Log claro y útil
    console.group("VIDEO FormData payload");
    for (const [key, value] of form.entries()) {
        if (value instanceof File) {
            console.log(key, { name: value.name, size: value.size, type: value.type });
        } else {
            console.log(key, value);
        }
    }
    console.groupEnd();

    // Llamado real (descomentar y ajustar URL/headers si hace falta)
    // const res = await fetch("/api/videos", { method: "POST", body: form });
    // if (!res.ok) throw new Error("Failed to upload video");
    // return res.json();

    // Mock temporal
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
};