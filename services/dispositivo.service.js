import { Content_Type, baseUrl, prodUrl, headers } from "../utils/constantes";

const dispUrl = `${prodUrl}/dispositivo`;

export function getDispositivoById(idDispositivo) {
    const url = `${dispUrl}/${idDispositivo}`;
    return fetch(url);
}

export function getDispositivosUsuario(idUsuario) {
    const url = `${dispUrl}/byusuario/${idUsuario}`;
    return fetch(url);
}

export function updateDispositivo(dispositivo) {
    console.log(dispositivo);
    const url = `${dispUrl}/${dispositivo.idDispositivo}`
    return fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(dispositivo)
    });
}

export function createDispositivo(dispositivo) {
    return fetch(dispUrl, {
        method: 'post',
        headers,
        body: JSON.stringify(dispositivo)
    });
}
export function deleteDispositivo(idDispositivo, idUsuario) {
    const url = `${dispUrl}/removeRelation/${idDispositivo}/${idUsuario}`;
    
    return fetch(url, {method: 'delete'})
}