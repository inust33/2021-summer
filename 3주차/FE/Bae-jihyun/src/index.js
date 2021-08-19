//여기부터 로드됨.

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';             //./App.js파일에서 App을 가져옴.
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />                           {/* 위에 import된 App */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
