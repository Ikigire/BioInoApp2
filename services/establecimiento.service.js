import { Content_Type, baseUrl } from "../utils/constantes";

export function createEstablecimiento(establecimiento) {
    const url = `${baseUrl}/establecimientos`;
    return fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": Content_Type
        },
        body: JSON.stringify(establecimiento)
    });
}

export function getUsuarioEstablecimientos(idUsuario) {
    const url = `${baseUrl}/establecimientos/usuario/${idUsuario}`;
    return fetch(url);
}
export function getDistinctUsuarioEstablecimientos(idUsuario) {
    const url = `${baseUrl}/establecimientos/usuario/${idUsuario}?distinct=yes`;
    return fetch(url);
}

export function getEstablecimientoById(idEstab) {
    const url = `${baseUrl}/establecimientos/${idEstab}`;
    return fetch(url);
}

export function deleteEstablecimiento(idEstab) {
    const url = `${baseUrl}/establecimientos/${idEstab}`;
    return fetch(url, { method: 'delete'});
}