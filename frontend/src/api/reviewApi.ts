import {
  getPostsLite,
  approvePost,
  deletePostByVerify,
  type PostListItem,
} from "./postApi";

export interface Submission {
  id: number;
  title: string;
  description?: string;
  author_name?: string;
  cover_url?: string | null;
  created_at: string;
  published_at?: string | null;
}

/** Trae los envíos PENDIENTES (verify_status = 0) para moderar */
export async function getPendingSubmissions(limit = 30): Promise<Submission[]> {
  const { items } = await getPostsLite({ verify: "pending", limit });
  return items.map(mapToSubmission);
}

/** Aprueba (0 → 1) */
export async function approveSubmission(id: number): Promise<void> {
  await approvePost(id, { withCredentials: true });
}

/** Marca como eliminado (0 → 2) */
export async function deleteSubmission(id: number): Promise<void> {
  await deletePostByVerify(id, { withCredentials: true });
}

/* mapper */
function mapToSubmission(p: PostListItem): Submission {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    author_name: p.author_name,
    cover_url: p.cover_url ?? null,
    created_at: p.created_at,
    published_at: p.published_at ?? null,
  };
}
