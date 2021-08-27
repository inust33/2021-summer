import axios from "axios";
import {LOGIN_USER} from './types'
function loginUser(dataTosubmit){
    const request = axios.post('/api/user/login',dataTosubmit)
                        .then(res=>res.data)

        return{
            type:LOGIN_USER,
            payload:request
        }
}

export  {loginUser}