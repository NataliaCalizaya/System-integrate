const apiUrl = import.meta.env.VITE_API_URL;

export type VerifyFilter = "approved" | "pending" | "deleted" | "0" | "1" | "2";

export type MediaType = "image" | "video" | "youtube";
export type MediaProvider = "local" | "external" | "youtube";
export type MediaStatus = "pending" | "approved" | "rejected";

export interface MediaItem {
  id: number;
  type: MediaType;
  provider: MediaProvider;
  url: string;
  thumb_url?: string | null;
  status: MediaStatus;
  uploaded_at: string;
}

export interface PostListItem {
  id: number;
  title: string;
  description?: string;
  author_name?: string;
  cover_url?: string | null;
  published_at?: string | null;
  created_at: string;
}

export interface PostDetail {
  id: number;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  caption?: string | null;
  body: string;
  author_name?: string | null;
  author_id?: number | null;
  uploader_id?: number | null;
  verify_status: 0 | 1 | 2;
  cover_url?: string | null;
  created_at: string;
  published_at?: string | null;
  media?: MediaItem[];
}

function pickData<T>(json: any): T {
  return (json?.data ?? json) as T;
}

export async function getPostsLite(params?: {
  verify?: VerifyFilter;
  limit?: number;
  offset?: number;
  ctx?: "home" | "news";
}): Promise<{ items: PostListItem[]; meta: { limit: number; offset: number; returned: number; verify: string | number } }> {
  const q = new URLSearchParams();
  if (params?.verify) q.set("verify", String(params.verify));
  if (params?.limit != null) q.set("limit", String(params.limit));
  if (params?.offset != null) q.set("offset", String(params.offset));
  if (params?.ctx) q.set("ctx", params.ctx);

  const res = await fetch(`${apiUrl}/posts/news?${q.toString()}`);
  if (!res.ok) throw new Error("No se pudieron obtener las noticias (lite)");
  const json = await res.json();
  const data = pickData<{ posts: PostListItem[]; meta?: any }>(json);

  return {
    items: data.posts ?? [],
    meta: {
      limit: data?.meta?.limit ?? (params?.limit ?? (params?.ctx === "home" ? 3 : 30)),
      offset: data?.meta?.offset ?? (params?.offset ?? 0),
      returned: (data.posts ?? []).length,
      verify: params?.verify ?? "approved",
    },
  };
}


export async function getPosts(params?: {
  verify?: VerifyFilter;
  page?: number;
  limit?: number;
}): Promise<{ items: PostDetail[]; meta: { totalPosts: number; currentPage: number; totalPages: number } }> {
  const q = new URLSearchParams();
  if (params?.verify) q.set("verify", String(params.verify));
  if (params?.page != null) q.set("page", String(params.page));
  if (params?.limit != null) q.set("limit", String(params.limit));

  const res = await fetch(`${apiUrl}/posts?${q.toString()}`);
  if (!res.ok) throw new Error("No se pudieron obtener las noticias");
  const json = await res.json();
  const data = pickData<{ posts: PostDetail[]; meta: { totalPosts: number; currentPage: number; totalPages: number } }>(json);

  return {
    items: data.posts ?? [],
    meta: data.meta ?? { totalPosts: 0, currentPage: 1, totalPages: 1 },
  };
}


export async function getPostById(id: number): Promise<PostDetail> {
  const res = await fetch(`${apiUrl}/posts/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener la noticia");
  const json = await res.json();
  const data = pickData<PostDetail>(json);
  return data;
}

export interface CreatePostBody {
  title: string;
  subtitle?: string;
  description?: string;
  caption?: string;
  body: string;
  author_name?: string;
  author_id?: number | null;
  uploader_id?: number | null;
  published_at?: string | null; 
}

export interface CreatePostFiles {
  cover?: File | null;    
  gallery?: File[];       
}

export async function createPost(
  body: CreatePostBody,
  files?: CreatePostFiles,
  opts?: { withCredentials?: boolean }
): Promise<PostDetail> {
  const fd = new FormData();
  fd.append("title", body.title);
  fd.append("body", body.body);
  if (body.subtitle) fd.append("subtitle", body.subtitle);
  if (body.description) fd.append("description", body.description);
  if (body.caption) fd.append("caption", body.caption);
  if (body.author_name) fd.append("author_name", body.author_name);
  if (body.author_id != null) fd.append("author_id", String(body.author_id));
  if (body.uploader_id != null) fd.append("uploader_id", String(body.uploader_id));
  if (body.published_at) fd.append("published_at", body.published_at);

  if (files?.cover) {
    fd.append("cover", files.cover);
  }
  if (files?.gallery && files.gallery.length > 0) {
    for (const f of files.gallery) {
      fd.append("gallery", f);
    }
  }

  const res = await fetch(`${apiUrl}/posts`, {
    method: "POST",
    body: fd,
    credentials: opts?.withCredentials ? "include" : "omit",
  });

  if (!res.ok) {
    let msg = "No se pudo crear la noticia";
    try {
      const err = await res.json();
      msg = err?.message ?? msg;
    } catch { }
    throw new Error(msg);
  }

  const json = await res.json();
  return pickData<PostDetail>(json);
}

export async function approvePost(id: number, opts?: { withCredentials?: boolean }): Promise<{ id: number; verify_status: 1 }> {
  const res = await fetch(`${apiUrl}/posts/${id}/verify`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: opts?.withCredentials ? "include" : "omit",
    body: JSON.stringify({ verify_status: 1 }),
  });
  if (!res.ok) throw new Error("No se pudo aprobar la noticia");
  const json = await res.json();
  const data = pickData<{ id: number; verify_status: 1 }>(json);
  return data;
}

export async function deletePostByVerify(id: number, opts?: { withCredentials?: boolean }): Promise<{ id: number; verify_status: 2 }> {
  const res = await fetch(`${apiUrl}/posts/${id}/verify`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: opts?.withCredentials ? "include" : "omit",
    body: JSON.stringify({ verify_status: 2 }),
  });
  if (!res.ok) throw new Error("No se pudo eliminar (marcar 2) la noticia");
  const json = await res.json();
  const data = pickData<{ id: number; verify_status: 2 }>(json);
  return data;
}