import styled from 'styled-components';
import MEDIA from 'helpers/mediaTemplates';
import LogoSvg from 'components/logo';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 2rem 4rem;

  a {
    color: #757575;
    transition: color 0.2s ease;
    text-decoration: none;

    &:hover {
      color: inherit;
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
