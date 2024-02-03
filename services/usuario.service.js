import { Content_Type, baseUrl } from "../utils/constantes";

const usuariosBaseUrl = `${baseUrl}/usuarios`;

export function getAllUsuarioWithEmail() {
    const url = `${usuariosBaseUrl}?fields=email`;
    return fetch(url);
}

export function updateUsuario(user) {
    const body = JSON.stringify(user);
    return fetch(`${usuariosBaseUrl}/${user.idUsuario}`, {
        method: 'put',
        headers: {
            "Content-Type": Content_Type
        },
        body
    });
}