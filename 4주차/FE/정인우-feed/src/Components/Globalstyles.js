import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }

  body {
  
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;


    padding-top: 50px;
  }
`;

export default GlobalStyles;