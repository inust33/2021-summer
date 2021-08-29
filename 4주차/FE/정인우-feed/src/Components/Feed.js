import {useContext, useRef} from "react";
import {FeedsContext, UserContext} from "../context";
import {useForm} from "react-hook-form";
import {DELETE_Feed, EDIT_Feed, UPDATE_Feed} from "../Actions";
import styled from "styled-components";
import DateDiff from "../Util/Date";


const Container = styled.div`
  display: flex;
  align-content: center;
  position: relative;
  width: 100%;

`;

const Button = styled.button`

  right: 5px;
  margin-right: 10px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
`;


const Feed = ({id, author, text, date}) => {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {state, dispatch} = useContext(FeedsContext);
    const {user, setUser} = useContext(UserContext);


    return (
        <>
            <li>
                <Container>
                    {state.Selected_Feed === id ? (
                            <form onSubmit={handleSubmit(data => dispatch({type: UPDATE_Feed, payload: data.text}))}>
                                <textarea {...register('text', {required: true, minLength: 2, maxLength: 150})}/>
                                {errors.text && <p>'글자 수는 2글자 이상 150자 이하 제한입니다'</p>}
                                <input type='submit'/>
                            </form>
                        ) :
                        (<>
                                <span> {author} </span>
                                <span>{DateDiff(date) ? DateDiff(date) : date.toLocaleString()}</span>
                                <span>{text} </span>
                                {user?.email === author && (
                                    <>
                                        <Button
                                            onClick={() => dispatch({type: DELETE_Feed, payload: id})}>Delete</Button>
                                        <Button onClick={() => dispatch({type: EDIT_Feed, payload: id})}>EDIT</Button>
                                    </>)
                                }
                            </>
                        )}
                </Container>
            </li>
        </>
    )
}

export default Feed;



