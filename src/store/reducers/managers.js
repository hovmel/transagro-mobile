import {SET_MANAGERS} from "../actions/managers";
const initialState = {
    managers: [],
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case SET_MANAGERS:{
            return {
                ...state,
                managers: action.payload
            }
        }
        default:{
            return state
        }
    }
}
