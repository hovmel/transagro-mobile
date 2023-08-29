import {baseUrl} from "src/services/API/url/baseUrl";
import {useDispatch} from "react-redux";

export async function getCargoList(tokenFromReducer) {
    try {
        const response = await fetch(`${baseUrl}/api/getMyOrders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromReducer}`,
            },
        });
        return response.json();
    } catch (e) {
        console.log(e, 'ERROR from get cargo list api')
    }

}

export async function createCargo(tokenFromReducer, data) {
    console.log(data, 'DATA')
    try {
        const response = await fetch(`${baseUrl}/api/createOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromReducer}`,
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    } catch (e) {
        console.log(e, 'ERROR from create cargo api')
    }
}

export async function editCargo(tokenFromReducer, data, id) {
    console.log(data, 'DATA')
    try {
        const response = await fetch(`${baseUrl}/api/updateOrder/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromReducer}`,
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    } catch (e) {
        console.log(e, 'ERROR from edit cargo api')
    }
}

export async function deleteCargo(id, tokenFromReducer) {
    try {
        const response = await fetch(`${baseUrl}/api/delete-order/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromReducer}`,
            }
        })
        return await response.json()
    } catch (e) {
        console.log(e, 'ERROR from delete cargo api')
    }
}

export async function setMakeDisabled(id, tokenFromReducer) {
    try {
        const response = await fetch(`${baseUrl}/api/makeDisabled/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromReducer}`,
            },
        })
        return response.json()
    } catch (e) {
        console.log(JSON.stringify(e), 'make disabled error')
    }
}
