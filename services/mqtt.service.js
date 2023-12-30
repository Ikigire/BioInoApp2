import { baseUrl } from "../utils/constantes";

const mqttUrl = `${baseUrl}/mqtt`;

export function getDispositivoSensoresInfo(mac) {
    const url = `${mqttUrl}/${mac}`;
    return fetch(url);
}