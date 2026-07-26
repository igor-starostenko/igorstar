import styled from 'styled-components';

export const Container = styled.nav`
  display: inline-flex;

  a {
    text-transform: uppercase;
    font-size: 1.4rem;
    line-height: 1.5;
    text-align: center;

    /* Add space between items only, not before the first item */
    &:not(:first-child) {
      margin-left: clamp(10px, 3vw, 25px);
    }
  }
`;
