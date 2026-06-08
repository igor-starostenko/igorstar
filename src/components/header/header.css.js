import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates.js';
import LogoSvg from 'components/logo/logo.jsx';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 2rem 4rem;
  ${MEDIA.PHONE`
    padding: 2rem 3rem;
  `}

  a {
    color: ${colors.grey};
    transition: color 0.2s ease;
    text-decoration: none;

    &:hover {
      color: inherit;
    }
  }

  /* Override ImageWrapper box-shadow for logo - more specific selector */
  a .logo-image-wrapper,
  .logo-image-wrapper {
    box-shadow: none !important;
    border-radius: 0 !important;
    overflow: visible !important;
    cursor: default !important;

    div {
      transition: none !important;
    }

    &:hover {
      box-shadow: none !important;
      div {
        transform: none !important;
      }
    }
  }
`;

export const Logo = styled(LogoSvg)`
  ${MEDIA.TABLET`
    max-width: 90%;
  `}
  ${MEDIA.PHONE`
    max-width: 75%;
  `}
`;
