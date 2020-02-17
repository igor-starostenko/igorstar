import React from 'react';
import { Link } from 'gatsby';
import posed from 'react-pose';
import { Container } from './header.css';
import Logo from 'components/logo';
import Nav from 'components/header/nav';

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
      <Link to="/">
        <Logo />
      </Link>

      <Nav />
    </Container>
  </AnimatedContainer>
);

export default Header;
