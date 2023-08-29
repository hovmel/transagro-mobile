import {combineReducers} from "redux";
import user_data from './user_data'
import user_token from './user_token'
import cargo_list from './cargo_list'
import firm_id from './firm_id'
import managers from './managers'
import favorites from './favorites'
export default combineReducers({
    user_data,
    user_token,
    cargo_list,
    firm_id,
    managers,
    favorites
})
