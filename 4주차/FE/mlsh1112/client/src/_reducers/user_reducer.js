import {LOGIN_USER, REGISTER_USER} from '../_action/types'

export default function (state={}, action){

    switch (action.type) {
        case LOGIN_USER:
            return{...state,loginSuccess : action.paylod}
            break;
        case REGISTER_USER:
            return{...state,register:action.paylod}
            break;
        default:
            return state;
    }
}