import styled from 'styled-components';
import { colors } from '../../constants/theme';
import MEDIA from '../../helpers/mediaTemplates';

export const Container = styled.footer`
  padding: 4rem 0;
  border-top: 1px solid ${colors.lightGrey};

  ${MEDIA.TABLET`
    display: block;
  `}
`;

export const Social = styled.div`
  margin-bottom: 1rem !important;
  margin: auto;
  width: fit-content;

  a {
    padding: 1.5rem;

    @media (max-width: 357px) {
      padding: 1.3rem;
    }
  }
`;

export const Copyright = styled.div`
  width: fit-content;
  margin: auto;
  a {
    color: ${colors.grey};
    transition: color 0.2s ease;
    text-decoration: none;

    &:hover {
      color: inherit;
    }
  }
`;
