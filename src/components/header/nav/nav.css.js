import styled from 'styled-components';

export const Container = styled.nav`
  padding: 0;

  a:not(:first-child) {
    margin-left: 3rem;
  }

  a {
    text-transform: uppercase;
    font-size: 1.3rem;
  }
`;
