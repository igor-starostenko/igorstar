import styled from 'styled-components';
import { colors } from 'constants/theme';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  margin: ${({ isSmall }) =>
    isSmall ? `2px 5px 2px 0px` : `0.5rem 10px 0.5rem 0px`};
  padding: 5px;
  border-radius: 7px;
  color: ${colors.darkGrey};
  background: ${colors.lightestGrey};
  font-size: 1.4rem;
`;
