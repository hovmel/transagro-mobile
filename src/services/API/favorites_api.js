import {baseUrl} from "src/services/API/url/baseUrl";


export async function getFavorites(tokenFromReducer) {
    const response = await fetch(`${baseUrl}/api/favorite/list`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    });
    return response.json();
}

export async function addGoodToFavorites(tokenFromReducer, data) {
    const response = await fetch(`${baseUrl}/api/favorite/add-goods`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function addCompanyToFavorites(tokenFromReducer, data) {
    const response = await fetch(`${baseUrl}/api/favorite/add-company`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function addRideToFavorites(tokenFromReducer, data) {
    const response = await fetch(`${baseUrl}/api/favorite/add-ride`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function deleteFromFavorites(tokenFromReducer, data) {
    const response = await fetch(`${baseUrl}/api/favorite/delete`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}


