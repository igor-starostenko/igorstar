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

  /* Override box-shadow for logo wrapper */
  a:first-child .imagecss__ImageWrapper-sc-1f8xre3-0 {
    box-shadow: none;
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
