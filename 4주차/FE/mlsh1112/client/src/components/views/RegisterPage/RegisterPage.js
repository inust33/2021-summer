import React,{useState} from 'react';
import {useDispatch} from 'react-redux'
import { registerUser } from '../../../_action/user_action';
import {withRouter} from 'react-router-dom'
const RegisterPage = (props) => {
    const dispatch = useDispatch()
    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const [comfirmPw, setcomfirmPw] = useState('')


    const onEmailHandler = (e) =>{
        setemail(e.currentTarget.value)
    }
    const onNameHandler = (e) =>{
        setname(e.currentTarget.value)
    }
    const onPasswordHandler = (e) =>{
        setpassword(e.currentTarget.value)
    }
    const onConfirmPWHandler = (e) =>{
        setcomfirmPw(e.currentTarget.value)
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault()
        if(password !== comfirmPw){
            return alert("비밀번호와 비밀번호 확인이 다릅니다.")
        }
        let body = {
            email:email,
            name:name,
            password:password
        }

        dispatch(registerUser(body))
        .then(res=>{
            if(res.payload.success){
                props.history.push('/login')
            }
            else{
                alert("Error")
            }
        })
    }

    return (
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center',
            width:'100%', height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type='email' value={email} onChange={onEmailHandler}/>
                <label>Name</label>
                <input type='type' value={name} onChange={onNameHandler}/>
                
                <label>Password</label>
                <input type='password' value={password} onChange={onPasswordHandler}/>
                
                <label>Comfirm Password</label>
                <input type='password' value={comfirmPw} onChange={onConfirmPWHandler}/>
                
                <br/>
                <button>Register</button>
            </form>
        </div>
    );
}

export default withRouter(RegisterPage);
