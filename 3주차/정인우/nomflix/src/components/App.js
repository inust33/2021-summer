import { Component } from "react";
import Header from "./Header";

import Router from "./Router";
import GlobalStyles from "./GlobalStyles";

class App extends Component {
  
  render() {
   
    return (
      <>
        <Router />
        <GlobalStyles/>
      </>
    )
  }
}

export default App;
