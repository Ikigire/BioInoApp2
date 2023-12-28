import { Content_Type, baseUrl } from "../utils/constantes";

const grupoUrl = `${baseUrl}/grupos`;

export function getGrupoById(idGrupo) {
    const url = `${grupoUrl}/${idGrupo}`;
    return fetch(url);
}

export function createGrupo(grupo) {
    const url = `${grupoUrl}`;
    return fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": Content_Type
        },
        body:JSON.stringify(grupo)
    });
}

export function deleteGrupo(idGrupo) {
    const url = `${grupoUrl}/${idGrupo}`;
    return fetch(url, {
        method: 'delete'
    })
}