import { ThemeProvider } from 'styled-components';

import Employees from './pages/Employees';
import theme from './themes/default';
import GlobalStyle from './styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Employees />
    </ThemeProvider>
  );
}

export default App;
