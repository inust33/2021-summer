import axios from 'axios';
import React,{useState} from 'react';
import {useDispatch} from 'react-redux'
import { loginUser } from '../../../_action/user_action';
const LoginPage = () => {
    const dispatch = useDispatch()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const onEmailHandler = (e) =>{
        setemail(e.currentTarget.value)
    }
    const onPasswordHandler = (e) =>{
        setpassword(e.currentTarget.value)
    }
    const onSubmitHandler = (e) =>{
        e.preventDefault()
        let body = {
            email:email,
            password:password
        }

        dispatch(loginUser(body))

        
    }

    return (
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center',
            width:'100%', height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type='email' value={email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type='password' value={password} onChange={onPasswordHandler}/>
                <br/>
                <button>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
