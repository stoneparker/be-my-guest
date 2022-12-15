import { createGlobalStyle } from 'styled-components';

import theme from './themes/default';

const GlobalStyle = createGlobalStyle<{theme: typeof theme}>`
  *:not(dialog) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.background};
    color: #2C2C2C;
  }

  #root {
    height: 100%;
  }

  button, input {
    font-family: 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    color: #2C2C2C;
  }
`;

export default GlobalStyle;
