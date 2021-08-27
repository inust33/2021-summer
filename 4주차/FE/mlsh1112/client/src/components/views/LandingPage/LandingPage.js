import axios from 'axios';
import React from 'react';
import Feed from '../../../utils/Feed';

const LandingPage = (props) => {
    function onClickHandler (){
        axios.get('/api/user/logout')
        .then(res=>{
            if(res.data.success) props.history.push('/login')
            else alert ("Logout Fail")
        })
    }
    return (
        <div style={{display:'flex', justifyContent:'center',alignContent:'center'}}>
            LandingPage
            <button onClick={onClickHandler}>Logout</button>
            <Feed></Feed>
        </div>
    );
}

export default LandingPage;
