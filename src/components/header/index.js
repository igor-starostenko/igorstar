import React from 'react';
import Link from 'next/link';
import posed from 'react-pose';
import Logo from 'components/logo';
import Nav from 'components/header/nav';
import { Container } from './header.css';

// Example of a component-specific page transition
const AnimatedContainer = posed.div({
  enter: {
    y: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  exit: {
    y: '-100%',
    transition: {
      ease: 'easeInOut',
    },
  },
});

const Header = () => (
  <AnimatedContainer>
    <Container>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>

      <Nav />
    </Container>
  </AnimatedContainer>
);

export default Header;
