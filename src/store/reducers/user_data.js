import {DELETE_USER_DATA, SET_INFO_MODAL_TEXT, USER_DATA} from "../actions/user_data";
import moment from "moment/moment";
const initialState = {
  user_data: false,
  infoModalText: '',
  isSubscribed: false,
}

export default function reducer(state = initialState, action){
  switch (action.type){
    case SET_INFO_MODAL_TEXT:{
      return {
        ...state,
        infoModalText: action.payload,
      }
    }
    case USER_DATA:{
      const {user_data} = action.payload;
      const isSubscribed = user_data?.valid_until
          && moment(user_data.valid_until, 'YYYY-MM-DD HH:mm:ss') > moment()
          && user_data.isPaymentWorking === '1'
      return {
        ...state,
        user_data,
        isSubscribed: false
      }
    }
    case DELETE_USER_DATA:{
      return {
        ...state,
        user_data: []
      }
    }
    default:{
      return state
    }
  }
}
