import React from 'react';
import Link from 'next/link';
import Nav from 'components/header/nav';
import { Container, Logo } from './header.css';

const Header = () => (
  <Container>
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>

    <Nav />
  </Container>
);

export default Header;
