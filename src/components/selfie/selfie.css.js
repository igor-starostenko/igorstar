import styled from 'styled-components';
import BaseImage from 'components/image/image';
import Box from 'components/box';
import MEDIA from 'helpers/mediaTemplates';

export const Image = styled(BaseImage)`
  cursor: initial;
  border-radius: 50%;
  border: 2px solid powderblue !important;
`;

export const ImageWrapper = styled(Box)`
  padding: 2rem 4rem 0rem 4rem;
  ${MEDIA.PHONE`
    padding: 2rem 3rem 0rem 3rem;
  `}
`;
