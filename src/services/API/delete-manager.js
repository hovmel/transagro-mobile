import {baseUrl} from "src/services/API/url/baseUrl";

export async function deleteManagerRequest(id, tokenFromReducer) {
    const response = await fetch(`${baseUrl}/api/manager/delete/${id}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    });
    return response.json();
}
