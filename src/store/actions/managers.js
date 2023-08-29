export const SET_MANAGERS = 'SET_MANAGERS';

export function setManagersToReducer(data) {
    return {
        type: SET_MANAGERS,
        payload: data,
    };
}

