const apiUrl = import.meta.env.VITE_API_URL;

export interface MediaMeta {
  id: number;
  url: string;
  mimeType: string;
  status: "pending" | "approved" | "rejected";
  post_id: number;
  createdAt: string;
  // agrega campos que devuelva tu backend si querés
}

/** Sube UN archivo (campo "file") asociado a un post_id */
export const uploadMedia = async (file: File, postId: number): Promise<MediaMeta> => {
  const form = new FormData();
  form.append("file", file);              // ← campo exacto que usa multer: "file"
  form.append("post_id", String(postId)); // ← requerido por createMediaSchema

  // Log útil para verificar:
  console.group("MEDIA upload payload");
  console.log("POST", `${apiUrl}/media`);
  console.log("post_id", postId);
  console.log("file", { name: file.name, size: file.size, type: file.type });
  console.groupEnd();

  const res = await fetch(`${apiUrl}/media`, {
    method: "POST",
    body: form,
    credentials: "include", // ← importante si backend usa cookies/sesión
  });

  if (!res.ok) {
    let message = "Error subiendo media";
    try {
      const err = await res.json();
      if (err?.message) message = err.message;
      if (err?.error) message = err.error;
    } catch {}
    throw new Error(message);
  }

  return res.json();
};

export const getMediaById = async (id: number): Promise<MediaMeta> => {
  const res = await fetch(`${apiUrl}/media/${id}`, {
    method: "GET",
    credentials: "include", // opcional (ruta permite público)
  });
  if (!res.ok) throw new Error("No se pudo obtener el media");
  return res.json();
};

export const deleteMedia = async (id: number): Promise<{ ok: true }> => {
  const res = await fetch(`${apiUrl}/media/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudo eliminar el media");
  return res.json();
};

export const changeMediaStatus = async (
  id: number,
  status: "approved" | "rejected"
): Promise<{ ok: true }> => {
  const res = await fetch(`${apiUrl}/media/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("No se pudo cambiar el estado del media");
  return res.json();
};

/** Listado con filtros/paginación (solo admin/teacher) */
export const listMedia = async (query?: Record<string, string | number | boolean>) => {
  const q = query
    ? "?" +
      Object.entries(query)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join("&")
    : "";
  const res = await fetch(`${apiUrl}/media${q}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudo listar media");
  return res.json();
};
