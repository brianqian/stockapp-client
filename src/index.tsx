import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BrowserRouter } from 'react-router-dom';
import App from './pages/App/App';
import reportWebVitals from './reportWebVitals';
import theme from './utils/theme';

const GlobalStyle = createGlobalStyle`
body, html{
  max-width: 100vw;
  background-color: ${(p) => p.theme.backgroundColor};
  color: ${(p) => p.theme.strokeColor};
  font-family: ${(p) => p.theme.textFont};
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  cursor: pointer;
  :visited {
    color: ${(p) => p.theme.strokeColor};
  }
}
.visually-hidden { 
    position: absolute !important;
    height: 1px; 
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap; /* added line */
}
`;

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
