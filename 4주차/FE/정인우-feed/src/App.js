import signIn, {login, logout, authenticated} from "./Auth";

import Feed from "./Routes/Feeds";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import {useContext, useState} from "react";

import {FeedsContext, UserContext} from "./context";
import AuthRoute from "./Components/AuthRoute";
import Feeds from "./Routes/Feeds";
import Login from "./Routes/Login";
import SignUp from "./Routes/Signup";
import GlobalStyles from "./Components/Globalstyles";

function App() {
    const {state, dispatch} = useContext(FeedsContext);
    const {user, setUser, login, logout} = useContext(UserContext);


    const authenticated = user != null;

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={props => <Feeds authenticated={authenticated} login={login}
                                                                  logout={logout} {...props}/>}/>
                    <Route path='/login' render={props => <Login login={login} {...props}/>}/>

                    <Route path='/signup' render={props => <SignUp login={login} {...props}/>}/>
                </Switch>
            </BrowserRouter>
            <GlobalStyles/>
        </>

    )
        ;
}

export default App;

