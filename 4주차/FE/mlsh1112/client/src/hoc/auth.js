import axios from 'axios';
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {authUser} from '../_action/user_action'
// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRouter=null){
    // option
    //  null => anyone
    //  true => login user
    //  false => not login user
    
    
    function AuthenticationCheck(props){
        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(authUser()).then(res=>{
                if(!res.payload.isAuth){
                    // not login
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    // login
                    if(adminRouter && !res.payload.isAdmin){
                        props.history.push('/')
                    }
                    else {
                        if(!option) props.history.push('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent/>
        )
        
    }

    return AuthenticationCheck
}