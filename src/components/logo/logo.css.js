import styled from 'styled-components';
import * as LogoIcon from 'images/logo.svg';
import MEDIA from 'helpers/mediaTemplates';

export const Logo = styled(LogoIcon)`
  ${MEDIA.TABLET`
    width: 95px;
  `}
  ${MEDIA.PHONE`
    width: 80px;
  `}
`;
