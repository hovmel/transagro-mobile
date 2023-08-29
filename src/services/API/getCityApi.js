import {baseUrl} from "src/services/API/url/baseUrl";
export async function getCityApi(cityName) {
    const response = await fetch(`${baseUrl}/api/city/${cityName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}
