import React from "react";
import Router from './routes/Router'
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ReactQueryDevtools } from 'react-query/devtools'
const GlobalStyle = createGlobalStyle`
  ${reset};
  *{
    box-sizing:border-box;
  }
  body {
    font-family: 'Source Sans Pro',sans-serif;
    background-color: ${props=>props.theme.bgColor};
    color: ${props=>props.theme.textColor};
  }
  a{
    text-decoration: none;
    color:inherit;
  }
`;
function App() {

  return (
    <>
      <GlobalStyle/>
      <Router/>
      <ReactQueryDevtools initialIsOpen={true}/>
    </>
  );
}

export default App;
