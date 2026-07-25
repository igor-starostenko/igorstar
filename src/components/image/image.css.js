import styled from 'styled-components';
import NextImage from 'next/image';

import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates.js';

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0px auto;
  line-height: 0;
  box-shadow: -1px 3px 6px 1px rgba(0, 0, 0, 0.3);

  > a {
    font-size: 0;
  }
`;

export const SImage = styled(NextImage)`
  max-width: 100%;
  height: auto;
`;

export const ImageFrame = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  top: 15px;
  right: 15px;
  opacity: 0;
  transition: opacity 150ms ease-in-out;

  ${MEDIA.PHONE`
    opacity: 1;
  `}
`;

export const ImageHeader = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;

  svg {
    filter: invert(100%) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  }
`;

export const ImageFooter = styled.div`
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  color: ${colors.white};
  line-height: 1;
  width: 100%;
`;

export const ImageTitle = styled.span`
  position: absolute;
  bottom: 0px;
  left: 0px;
  font-size: 14px;
`;

export const ImageCopyright = styled.span`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 10px;
`;

export const ImageContainer = styled(ImageWrapper)`
  overflow: hidden;
  width: fit-content;
  transition: all 0.2s ease-in-out;
  img {
    transition: transform 2s;
  }

  :hover {
    ${ImageFrame} {
      opacity: 1;
      cursor: pointer;
    }

    img {
      transform: scale(1.02);
    }
  }
`;
