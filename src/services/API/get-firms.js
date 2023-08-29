import {baseUrl} from "src/services/API/url/baseUrl";
export async function getFirms(tokenFromReducer, searchValue) {
    const response = await fetch(`${baseUrl}/api/companies?searchValue=${searchValue}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    });
    return response.json();
}

export async function getFirmData(tokenFromReducer, id){
    const response = await fetch(`${baseUrl}/api/company/${id}`,{
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    })
    return response.json();
}
