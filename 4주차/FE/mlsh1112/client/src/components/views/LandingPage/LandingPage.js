import axios from 'axios';
import React from 'react';
import Feed from '../../../utils/Feed';
import { withRouter } from 'react-router-dom';
const LandingPage = (props) => {
    function onClickHandler (){
        axios.get('/api/user/logout')
        .then(res=>{
            if(res.data.success) props.history.push('/login')
            else alert ("Logout Fail")
        })
    }
    return (
        <div>
            <div style={{display:'flex', justifyContent:'center',alignContent:'center'}}>
                Home &nbsp;&nbsp;&nbsp;
                <button onClick={onClickHandler}>Logout</button><br/>
            </div>
            <Feed></Feed>
        </div>
    );
}

export default withRouter(LandingPage);
