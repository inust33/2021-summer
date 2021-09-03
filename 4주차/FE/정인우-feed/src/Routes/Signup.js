import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {FeedsContext, UserContext} from "../context";
import {ADD_User} from "../Actions";
import {Link, Redirect} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`

`;

const SignUp = ({login, location}) => {
    const {register, handleSubmit,getValues, reset, formState} = useForm({mode: 'onBlur'});
    const {state, dispatch} = useContext(FeedsContext);
    const {user, setUser} = useContext(UserContext);
    const [isRedirect, setIsRedirect] = useState(false);



    const onSubmit = (data) => {
        const {Users} = state;
        const {email, password} = data;
        if (Users.some(user => user.email === email)) {
            alert('이미 가입한 이메일입니다');
            return false;
        }
        dispatch({
            type: ADD_User,
            payload: {email, password}
        });
        try{
            login({email, password});
        }catch(e){
            alert('cannot login. please go back to the login page to login');
        }
       if(user) {
           alert('회원가입이 완료되었습니다');
           setIsRedirect(true);
       }

    }


        const {from} = location.state || {from: {pathname: '/'}};
        if (user) return <Redirect to={from}/>

        return (
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email</label>
                    <input  {...register('email', {
                        required: "이메일은 필수항목입니다.",
                        pattern: {
                            value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                            message: '이메일이 형식에 맞지 않습니다'
                        },
                    })}/>
                    {formState.errors.email && formState.errors.email.message}

                    <label htmlFor='password'>Password</label>
                    <input  {...register('password', {
                        required: "비밀번호는 필수항목입니다.",
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: "비밀번호는 4글자 이상 10글자 이하의 영문과 숫자 조합이어야 합니다"
                        }
                    })}/>
                    <p>{formState.errors.password && formState.errors.password.message}</p>
                    <button>가입하기</button>
                    <Link to='/'>
                        <button>돌아가기</button>
                    </Link>

                </form>
                {isRedirect && <Redirect to='/'/>}
            </Container>

        )
    }

export default SignUp;

