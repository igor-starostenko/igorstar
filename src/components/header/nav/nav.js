import React from 'react';
import { Link } from 'gatsby';
import { Container } from './nav.css';

const Nav = () => (
  <Container>
    <ul>
      <li>
        <Link to="/gallery">Gallery</Link>
        <Link to="/about" style={{ marginLeft: '3rem' }}>
          About
        </Link>
      </li>
    </ul>
  </Container>
);

export default Nav;
