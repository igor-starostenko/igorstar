import Link from 'next/link';
import Nav from 'components/header/nav/nav.jsx';
import { Container, Logo } from './header.css.js';

const Header = () => (
  <Container>
    <Link href="/">
      <Logo />
    </Link>

    <Nav />
  </Container>
);

export default Header;
