import {baseUrl} from "src/services/API/url/baseUrl";

export async function createRide(data, tokenFromReducer) {
    try {
        const response = await fetch(`${baseUrl}/api/create-ride`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromReducer}`,
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }catch (e){
        console.log(JSON.stringify(e), 'error from create Ride')
    }
}
export async function editRide(data, tokenFromReducer) {
    try {
        const response = await fetch(`${baseUrl}/api/update-ride/${data.id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromReducer}`,
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }catch (e){
        console.log(JSON.stringify(e), 'error from edit Ride')
    }
}

export async function getRide(tokenFromReducer){
    try {
        const response = await fetch(`${baseUrl}/api/getMyRides`,{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromReducer}`,
            },
        });
        return response.json();
    }catch (e){
        console.log(JSON.stringify(e), 'get rides')
    }

}
export async function deleteRide(id, tokenFromReducer){
    try {
        const response = await fetch(`${baseUrl}/api/delete-ride/${id}`,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromReducer}`,
            },
        });
        return response.json();
    }catch (e){
        console.log(JSON.stringify(e), 'delete ride')
    }

}
