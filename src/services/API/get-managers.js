import {baseUrl} from "src/services/API/url/baseUrl";

export async function getManagersRequest(tokenFromReducer) {
    const response = await fetch(`${baseUrl}/api/manager/list`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    });
    return response.json();
}
