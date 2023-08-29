import { SET_FAVORITES} from "../actions/favorites";
const initialState = {
    favorites: [],
    favoritesIds: {
        rides: [],
        companies: [],
        goods: [],
    }
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case SET_FAVORITES:{
            const ridesIds = action.payload.list?.ride?.map(item => item.id) || [];
            const goodsIds = action.payload.list?.goods?.map(item => item.id) || [];
            const companiesIds = action.payload.list?.companies?.map(item => item.id) || [];

            return {
                ...state,
                favorites: action.payload?.list,
                favoritesIds: {
                    rides: ridesIds,
                    companies: companiesIds,
                    goods: goodsIds,
                }
            }
        }
        default: {
            return state
        }
    }
}
