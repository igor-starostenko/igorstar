import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.div`
  position: relative;
  padding-left: 3rem;
  padding-right: 3rem;

  ${MEDIA.PHONE`
    padding-left: 0;
    padding-right: 0;
  `}
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

  a.active {
    font-weight: bold;
  }
`;

export const Counter = styled.span`
  position: absolute;
  right: 5px;
  bottom: 0px;
  color: ${colors.darkGrey};
  font-size: 1rem;
`;
