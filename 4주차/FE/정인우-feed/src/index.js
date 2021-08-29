import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ContextProvider from "./context";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <ContextProvider>
        <App/>
    </ContextProvider>,

    document.getElementById('root')
);

