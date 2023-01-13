import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

export const DateMain = styled.span`
  min-width: 20%;
  text-align: right;
  margin-bottom: 1rem;
  margin-top: 2.5rem;
  color: ${colors.grey};
  float: right;
  ${MEDIA.PHONE`
    display: none;
  `};
`;

export const DateMobile = styled.span`
  display: none;
  color: ${colors.grey};
  float: right;
  margin-top: 1rem;
  ${MEDIA.PHONE`
    display: block;
  `};
`;
