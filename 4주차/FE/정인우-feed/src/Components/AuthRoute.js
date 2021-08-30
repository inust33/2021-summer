import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import Auth from "../Auth";

const AuthRoute = ({authenticated, render, component: Component, ...rest}) => {
    return (
        <Route {...rest}
               render={(props) => authenticated ? (
                   render ? (
                       render(props)
                   ) : (<Component {...props}/>
                   )
               ) : (
                   <Redirect to={{pathname: "/login", state: {from: props.location}}}
                   />
               )
               }
        />
    )
};

export default AuthRoute;