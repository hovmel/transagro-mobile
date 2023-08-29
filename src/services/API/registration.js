import {baseUrl} from "src/services/API/url/baseUrl";

export async function handleRegistration(data) {
    const response = await fetch(`${baseUrl}/api/registration`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function handleLoginApi(data) {
    const response = await fetch(`${baseUrl}/api/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function handleDeleteProfile(tokenFromReducer) {
    const response = await fetch(`${baseUrl}/api/company-delete`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    });
    return response.json();
}

export async function changeSubscribeMessageStatus(tokenFromReducer) {
    const response = await fetch(`${baseUrl}/api/change-subscribe-message-status`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    });
    return response.json();
}

//perevozchik1101@mail.ru kalbas1101 role_id 1
//smejenoe1101@mail.ru   kalbas1101 role_id 3
