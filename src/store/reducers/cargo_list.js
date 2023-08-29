import { CARGO_LIST, DELETE_CARGO_LIST} from "../actions/cargo_list";
const initialState = {
    cargo_list: [],
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case CARGO_LIST:{
            const {cargo_list} = action.payload;
            return {
                ...state,
                cargo_list
            }
        }
        case DELETE_CARGO_LIST:{
            return {
                ...state,
                cargo_list: []
            }
        }
        default:{
            return state
        }
    }
}
