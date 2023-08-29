import {baseUrl} from "src/services/API/url/baseUrl";

export async function createManager(data, tokenFromReducer) {
    const response = await fetch(`${baseUrl}/api/manager/create`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}
