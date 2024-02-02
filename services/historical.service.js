import { baseUrl } from "../utils/constantes";

const dynamoDbUrl = `${baseUrl}/historical`;

export function getDeviceHistorical(
    mac,
    page = 1,
    pageElements = 25,
    from = null,
    to = null,
    order = null
) {
    const addQueryParamsDelimitator = page || pageElements || from || to || order;
    const url = `${dynamoDbUrl}/${mac}/pagination${addQueryParamsDelimitator? '?': ''}${page ? 'page='+page: ''}${pageElements ? '&pageElements='+pageElements: ''}${from ? '&from='+from: ''}${to ? '&to='+to: ''}${order ? '&order='+order: ''}`;
    return fetch(url);
}

export function getDeviceHistoricalDateRange( mac ) {
    const url = `${dynamoDbUrl}/${mac}/datesrange`;
    return fetch(url);
}

export function getDeviceGraphicHistoricalData( mac, period = '24h' ) {
    const url = `${dynamoDbUrl}/${mac}/graphic?period=${period}`;
    return fetch(url);
}