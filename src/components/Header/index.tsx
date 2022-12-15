import { Container, Navbar, NavigationOption } from './styles';

import Logo from '../../assets/logo.png';

const Header = () => {
  return (
    <Container>
      <img src={Logo} alt="Be My Guest" />
      <Navbar>
        <ul>
          <NavigationOption>Unidades</NavigationOption>
          <NavigationOption>Reservas</NavigationOption>
          <NavigationOption selected>Funcionários</NavigationOption>
          <NavigationOption>Clientes</NavigationOption>
        </ul>
      </Navbar>
    </Container>
  );
}

export default Header;
