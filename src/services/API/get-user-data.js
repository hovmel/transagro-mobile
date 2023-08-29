import {baseUrl} from "src/services/API/url/baseUrl";
export async function handleGetUserData(tokenFromReducer) {
    const response = await fetch(`${baseUrl}/api/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    });
    return response.json();
}

export async function updateUserData(tokenFromReducer, data){
    const response = await fetch(`${baseUrl}/api/profile-update`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
        body: JSON.stringify(data)
    })
    return response.json()
}
