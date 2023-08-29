import {baseUrl} from "src/services/API/url/baseUrl";

export async function searchCargo(tokenFromReducer, filters) {
    let filterData = {}
    if (filters.start_date){
        filterData.start_date = filters.start_date;
    }
    if (filters.end_date){
        filterData.end_date = filters.end_date
    }
    if (filters.kuzov_type){
        filterData.kuzov_type = filters.kuzov_type
    }
    if (filters.order_title){
        filterData.order_title = filters.order_title
    }
    if (filters.upload_loc_id){
        filterData.upload_loc_id = filters.upload_loc_id
    }
    if (filters.upload_loc_radius?.title){
        filterData.upload_loc_radius = filters.upload_loc_radius.title
    }
    if (filters.onload_loc_id){
        filterData.onload_loc_id = filters.onload_loc_id
    }
    if (filters.onload_loc_radius?.title){
        filterData.onload_loc_radius = filters.onload_loc_radius.title
    }
    if (filters.ruble_per_tonn){
        filterData.ruble_per_tonn = filters.ruble_per_tonn
    }
    console.log(filterData, filters)
    const queryParams = new URLSearchParams(filterData).toString();
    const url = `${baseUrl}/api/getOrders?${queryParams}`;
    console.log(url, 'filterData from request ')

    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    });
    return response.json();
}


export async function searchRides(tokenFromReducer, filters) {
    const filterData = {};
    if (filters.kuzovType){
        filterData.kuzov_type = filters.kuzovType;
    }
    if (filters.onload_loc_id){
        filterData.onload_loc_id = filters.onload_loc_id
    }
    if (filters.upload_loc_id){
        filterData.upload_loc_id = filters.upload_loc_id
    }
    if (filters.onload_loc_radius){
        filterData.onload_loc_radius = filters.onload_loc_radius
    }
    if (filters.upload_loc_id){
        filterData.upload_loc_radius = filters.upload_loc_radius
    }
    const queryParams = new URLSearchParams(filterData).toString();
    const url = `${baseUrl}/api/getRides?${queryParams}`;
    console.log(url)

    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromReducer}`,
        },
    });

    return await response.json();
}
