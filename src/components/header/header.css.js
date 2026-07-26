import Link from 'next/link';
import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates.js';
import LogoSvg from 'components/logo/logo.jsx';

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
  height: ${(props) => props.$fixedHeight}px;

  img {
    height: ${(props) => props.$fixedHeight}px;
  }
`;
