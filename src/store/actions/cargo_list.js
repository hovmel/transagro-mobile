export const CARGO_LIST = 'CARGO_LIST';

export function setCargoArray(cargo_list) {
    return {
        type: CARGO_LIST,
        payload: {
            cargo_list,
        },
    };
}

export const DELETE_CARGO_LIST = 'DELETE_CARGO_LIST';

export function deleteCargoList() {
    return {
        type: DELETE_CARGO_LIST,
    };
}
