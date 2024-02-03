import { Content_Type, baseUrl } from "../utils/constantes";

const validationBaseUrl = `${baseUrl}/codes`;


export function createValidationCode(email) {
    return fetch(`${validationBaseUrl}/newcode`,{
        method: 'post',
        headers: {
            "Content-Type": Content_Type
        },
        body: JSON.stringify({email})
    });
}

export function createRecoveryCode(email) {
    return fetch(`${validationBaseUrl}/recovery`,{
        method: 'post',
        headers: {
            "Content-Type": Content_Type
        },
        body: JSON.stringify({email})
    });
}

export function validateCode(email, code) {
    return fetch(`${validationBaseUrl}/validate`,{
        method: 'post',
        headers: {
            "Content-Type": Content_Type
        },
        body: JSON.stringify({code, email})
    });
}