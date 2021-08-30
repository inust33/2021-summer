import React from "react";
import {withRouter} from "react-router-dom";
import styled from "styled-components";

const Button = styled.button``;

function LogoutButton({authenticated, logout, history}) {

    const handleClick = () => {
        logout();
        history.push("/");
    };
    return <button onClick={handleClick}>Logout</button>;
}

export default withRouter(LogoutButton);