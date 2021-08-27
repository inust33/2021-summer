import axios from "axios";
import {LOGIN_USER,REGISTER_USER,AUTH_USER} from './types'
function loginUser(dataTosubmit){
    const request = axios.post('/api/user/login',dataTosubmit)
                        .then(res=>res.data)

        return{
            type:LOGIN_USER,
            payload:request
        }
}
function registerUser(dataTosubmit){
    const request = axios.post('/api/user/register',dataTosubmit)
                        .then(res=>res.data)

        return{
            type:REGISTER_USER,
            payload:request
        }
}
function authUser(){
    const request = axios.get('/api/user/auth')
                        .then(res=>res.data)

        return{
            type:AUTH_USER,
            payload:request
        }
}
export  {loginUser,registerUser,authUser}