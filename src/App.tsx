import React from "react";
import Router from './routes/Router'
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ReactQueryDevtools } from 'react-query/devtools'
import {ThemeProvider} from 'styled-components';
import {lightTheme,darkTheme} from './theme';
import {useRecoilValue } from 'recoil';
import { isDark } from './atom';
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
  const isDarkTheme = useRecoilValue(isDark);
  return (
    <ThemeProvider theme={isDarkTheme?darkTheme:lightTheme}>
      <GlobalStyle/>
      <Router/>
      <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider>
  );
}

export default App;
