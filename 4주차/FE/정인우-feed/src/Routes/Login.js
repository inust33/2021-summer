import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {FeedsContext, UserContext} from "../context";
import {ADD_User} from "../Actions";
import {Redirect, Link} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 600px;
  height: 800px;

  padding: 15px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);

`;
const Form = styled.form`
  width: 100%;
  height: 80%;
  display: grid;
  grid-template-rows: repeat(auto-fill, 120px);

  label {
    font-size: 15px;
    margin-bottom: 0;
  }

  input {
    margin-top: 0;
    width: 80%;
    height: 35px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  }
`;

const Login = ({login, location}) => {
    const {register, handleSubmit, formState, reset} = useForm();
    const {state, dispatch} = useContext(FeedsContext);
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if (formState.isSubmitting) {
            reset({email: '', password: ''});
        }
    }, [formState, reset]);

    const {from} = location.state || {from: {pathname: '/'}};
    if (user) return <Redirect to={from}/>


    return (
        <>
            <header>

            </header>
            <Container>

                <Form nSubomit={handleSubmit(data => {
                        const {email, password} = data;
                        try {
                            login({email, password});
                        } catch (error) {
                            alert('failed to login');
                        }

                    }
                )}>

                    <label htmlFor='email'>Email</label>
                    <input  {...register('email', {required: '이메일을 입력하세요'})}/>
                    {formState.errors.email && formState.errors.email.message}
                    <label htmlFor='password'>Password</label>
                    <input {...register('password', {required: '패스워드를 입력하세요'})}/>
                    {formState.errors.password && formState.errors.password.message}
                    <button>로그인</button>
                    <Link to='/signup'>
                        회원가입
                    </Link>
                </Form>
            </Container>
            <footer>

            </footer>
        </>


    )
}

export default Login;