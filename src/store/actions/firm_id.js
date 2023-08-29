export const FIRM_ID = 'FIRM_ID';

export function setFirmId(firm_id) {
    return {
        type: FIRM_ID,
        payload: {
            firm_id,
        },
    };
}

export const DELETE_FIRM_ID = 'DELETE_FIRM_ID';

export function deleteFirmId() {
    return {
        type: DELETE_FIRM_ID,
    };
}
