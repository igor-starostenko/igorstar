import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

export const DateBase = styled.span`
  margin: 1.5rem 0 0.5rem 1.5rem;
  color: ${colors.grey};
`;

export const DateMain = styled(DateBase)`
  min-width: 20%;
  text-align: right;
  float: right;
  margin: 2.5rem 0 1.5rem 0;
  ${MEDIA.PHONE`
    display: none;
  `};
`;

export const DateMobile = styled(DateMain)`
  display: none;
  margin: 1rem 0 0 0;
  ${MEDIA.PHONE`
    display: block;
  `};
`;
