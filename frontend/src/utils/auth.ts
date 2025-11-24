import { getCookie } from "./cookies";

export const isLoggedIn = (): boolean => {
    // Ajustá esta lógica según lo que guardes al loguear
    const id = getCookie("id");
    const role = getCookie("role");
    const name = getCookie("name");
    return Boolean(id && role && name);
};