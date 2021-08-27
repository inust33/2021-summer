import {LOGIN_USER, REGISTER_USER,AUTH_USER} from '../_action/types'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state={}, action){

    switch (action.type) {
        case LOGIN_USER:
            return{...state,loginSuccess : action.paylod}
            break;
        case REGISTER_USER:
            return{...state,register:action.paylod}
            break;
        case AUTH_USER:
            return{...state,userData:action.paylod}
            break;
        default:
            return state;
    }
}