import Nav from 'components/header/nav/nav.jsx';
import { Container } from './header.css.js';
import Logo from 'components/logo/logo.jsx';

const Header = () => (
  <Container>
    <Logo />
    <Nav />
  </Container>
);

export default Header;
