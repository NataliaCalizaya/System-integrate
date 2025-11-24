const apiUrl = import.meta.env.VITE_API_URL;

export type BackendRole = "student" | "teacher" | "admin";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginUser {
    id: number;
    name: string;
    role: BackendRole;
}

export interface LoginResult {
    user: LoginUser;
    token?: string;
}

function normalizeRole(role: string): BackendRole {
    switch (role) {
        case "student":
        case "teacher":
        case "admin":
            return role;
        default:
            return "student";
    }
}

export async function loginUser(
    { username, password }: LoginPayload,
    opts?: { withCredentials?: boolean }
): Promise<LoginResult> {
    const res = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: opts?.withCredentials ? "include" : "omit",
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        let msg = "Error de autenticación";
        try {
            const err = await res.json();
            msg = err?.message ?? err?.error ?? msg;
        } catch { }
        throw new Error(msg);
    }

    const json = await res.json();
    const data = json?.data ?? json;
    const rawUser = data?.user ?? data;

    if (
        !rawUser ||
        typeof rawUser.id !== "number" ||
        typeof rawUser.name !== "string" ||
        typeof rawUser.role !== "string"
    ) {
        throw new Error("Respuesta de login inválida");
    }

    const user: LoginUser = {
        id: rawUser.id,
        name: rawUser.name,
        role: normalizeRole(rawUser.role),
    };

    return { user, token: data?.token };
}