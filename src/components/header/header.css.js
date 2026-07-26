import Link from 'next/link';
import styled from 'styled-components';
import { colors } from 'constants/theme';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;

  a {
    color: ${colors.grey};
    transition: color 0.2s ease;
    text-decoration: none;

    &:hover {
      color: inherit;
    }
  }
`;

export const LogoLink = styled(Link)`
  display: inline-block;
  position: relative;
`;
