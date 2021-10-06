import React from 'react';
import { Link } from 'next/link';
import { Container } from './nav.css';

const Nav = () => (
  <Container>
    <ul>
      <li>
        <Link href="/feed">
          <a>Feed</a>
        </Link>
        <Link href="/gallery" style={{ marginLeft: '3rem' }}>
          <a>Gallery</a>
        </Link>
        <Link href="/about" style={{ marginLeft: '3rem' }}>
          <a>About</a>
        </Link>
      </li>
    </ul>
  </Container>
);

export default Nav;
