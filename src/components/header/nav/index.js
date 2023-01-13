import Link from 'next/link';
import { Container } from './nav.css';

const Nav = () => (
  <Container>
    <Link href="/feed">Feed</Link>
    <Link href="/gallery">Gallery</Link>
    <Link href="/about">About</Link>
  </Container>
);

export default Nav;
