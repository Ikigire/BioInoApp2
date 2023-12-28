import { Content_Type, baseUrl } from "../utils/constantes";

const dispUrl = `${baseUrl}/dispositivos`;

export function getDispositivoById(idDispositivo) {
    const url = `${dispUrl}/${idDispositivo}`;
    return fetch(url);
}

export function getDispositivosByEstablecimientoUsuario(establecimiento, idUsuario) {
    const url = `${dispUrl}/${establecimiento}/${idUsuario}`;
    return fetch(url);
}

export function createDispositivo(dispositivo) {
    return fetch(dispUrl, {
        method: 'post',
        headers: {
            "Content-Type": Content_Type
        },
        body: JSON.stringify(dispositivo)
    });
}

export function deleteDispositivo(idDispositivo) {
    const url = `${dispUrl}/${idDispositivo}`;
    return fetch(url, {method: 'delete'})
}