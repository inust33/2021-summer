import React, {createContext, useContext, useReducer, useState} from "react";
import reducer, {initialState} from "./reducer";


export const FeedsContext = createContext();
export const UserContext = createContext();
const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [user, setUser] = useState(null);

    function signIn({email, password}) {
        const _user = state.Users.find(userinfo => (userinfo.email === email) && (userinfo.password === password));
        if (_user===undefined) throw new Error();
        return _user;
    }

    const login = ({email, password}) => setUser(signIn({email, password}));
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{user, setUser, login, logout}}>
            <FeedsContext.Provider value={{state, dispatch}}>
                {children}
            </FeedsContext.Provider>
        </UserContext.Provider>
    )
}
export default ContextProvider;