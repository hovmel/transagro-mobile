import { FIRM_ID, DELETE_FIRM_ID} from "../actions/firm_id";
const initialState = {
    user_token: false,
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case FIRM_ID:{
            const {firm_id} = action.payload;
            return {
                ...state,
                firm_id
            }
        }
        case DELETE_FIRM_ID:{
            return {
                ...state,
                firm_id: []
            }
        }
        default:{
            return state
        }
    }
}
