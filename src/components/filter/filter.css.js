import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.div`
  position: relative;
`;

export const TitleHeader = styled.div`
  display: inline-flex;
  align-items: baseline;
  justify-items: space-between;
  width: 100%;
  justify-content: space-between;
`;

export const Categories = styled.div`
  padding: 12px;
  ${MEDIA.PHONE`
    padding: 8px;
  `}
  border-radius: 12px;
  background: ${colors.lightestGrey};

  a {
    text-decoration: none;
    color: ${colors.darkGrey};

    &:hover {
      color: inherit;
    }
  }

  a:not(:first-child) {
    margin-left: 1.5rem;
  }
`;

export const Counter = styled.span`
  position: absolute;
  right: 5px;
  bottom: 0px;
  color: ${colors.darkGrey};
  font-size: 1rem;
`;
