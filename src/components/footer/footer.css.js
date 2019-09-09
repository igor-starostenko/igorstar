import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 4rem;
  border-top: 1px solid ${colors.lightGrey};

  ${MEDIA.TABLET`
    display: block;
  `}
`;

export const Navigation = styled.div`
  width: max-content;
  margin: auto;
`;

export const Right = styled.div`
  ${MEDIA.TABLET`
      > div {
        width: max-content;
        margin: auto;
      }
  `}
`;

export const Social = styled.div`
  margin-bottom: 1rem !important;

  a {
    margin-right: 0.2rem;
  }
`;

export const Copyright = styled.div`
  a {
    color: ${colors.grey};
    transition: color 0.2s ease;
    text-decoration: none;

    &:hover {
      color: inherit;
    }
  }
`;
