import React, {useContext, useEffect, useRef, useState} from "react";
import {FeedsContext, UserContext} from "../context";
import {ADD_Feed} from "../Actions";
import {useForm} from "react-hook-form";
import {Link, Redirect} from "react-router-dom";
import styled from "styled-components";
import Feed from "../Components/Feed";
import LogoutButton from "../Components/LogoutButton";
import {DateDiff} from "../Util/Date";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(autofill, 100px);
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  width: 100%;
  display: flex;

  input {
    width: 80%;
  }
`;

const Feeds = ({authenticated, location}) => {
    const {state, dispatch} = useContext(FeedsContext);
    const {user, setUser, login, logout} = useContext(UserContext);
    const [isRedirect, setIsRedirect] = useState(false);
    const {register, handleSubmit, formState, reset} = useForm();

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({feed: ""});
        }
    }, [formState, reset]);
    const onFocus = (e) => {
        if (authenticated) return true;
        else {
            e.preventDefault();
            if (window.confirm('로그인이 필요합니다. 로그인 하시겠습니까?'))
                setIsRedirect(true);
        }
    }
    const onSubmit = data => {
        if (user) {
            dispatch({type: ADD_Feed, payload: {text: data.feed, author: user.id}})

        } else {
            if (window.confirm('로그인이 필요합니다. 로그인 하시겠습니까?'))
                setIsRedirect(true);
        }
    }
    return (
        <>

            <Container>
                {!authenticated && <Link to={{pathname: '/login', state: {from: location}}}>
                    <button>Log in</button>
                </Link>}
                <ul>
                    {state.Feeds.sort((a, b) =>
                        (b.date.getTime() - a.date.getTime())
                    ).map((feed, idx) =>
                        <Feed key={idx} {...feed}/>
                    )
                    }
                </ul>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="feed">글 쓰기</label>
                    <textarea onFocus={onFocus} {...register('feed', {required: true, minLength: 2, maxLength: 150})}/>
                    {formState.errors.feed && (<p>'피드는 2글자 이상 150자 이하입니다'</p>)}
                    <input type='submit'/>
                </Form>
                {authenticated && <LogoutButton logout={logout}/>}
                {isRedirect && <Redirect to={{pathname: '/login', state: {from: location}}}/>}
            </Container>
        </>
    )

}

const EditForm = () => {
    return (
        <form>
            <input/>
        </form>
    )
}

export default Feeds;