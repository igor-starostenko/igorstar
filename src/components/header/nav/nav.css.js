import styled from 'styled-components';

export const Container = styled.nav`
  display: inline-flex;
  height: stretch;

  a {
    margin-left: clamp(10px, 3vw, 25px);
    text-transform: uppercase;
    font-size: 1.4rem;
    line-height: 1.5;
    text-align: center;
  }
`;
