import React from 'react';
import Link from 'next/link';
import { Container } from './nav.css';

const Nav = () => (
  <Container>
    <Link href="/feed">
      <a>Feed</a>
    </Link>
    <Link href="/gallery">
      <a>Gallery</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
  </Container>
);

export default Nav;
