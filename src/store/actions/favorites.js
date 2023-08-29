export const SET_FAVORITES = 'SET_FAVORITES';

export function setFavorites(data) {
    return {
        type: SET_FAVORITES,
        payload: data
    };
}
