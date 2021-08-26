import React,{useState} from 'react';

const LoginPage = () => {
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
