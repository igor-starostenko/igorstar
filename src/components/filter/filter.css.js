import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

export const TitleHeader = styled.div`
  display: inline-flex;
  align-items: baseline;
  justify-items: space-between;
  width: 100%;
  justify-content: space-between;
`;

export const Categories = styled.div`
  a:not(:first-child) {
    margin-left: 1.5rem;
  }
`;

export const Counter = styled.span`
  display: none;
  padding: 6px;
  border-radius: 12px;
  color: ${colors.darkGrey};
  background: ${colors.lightestGrey};
  font-size: 1rem;
`;
