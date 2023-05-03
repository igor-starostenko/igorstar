import styled from 'styled-components';
import ExportedImage from 'next-image-export-optimizer';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

export const ImageWrapper = styled.div`
  box-shadow: -1px 3px 6px 1px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
  line-height: 0;
  div {
    transition: transform 2s;
  }
  :hover {
    box-shadow: -2px 5px 8px 2px rgba(0, 0, 0, 0.3);
    div {
      transform: scale(1.02);
    }
  }
`;

export const SImage = styled(ExportedImage)`
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

export const ImageContainer = styled.div`
  position: relative;
  width: fit-content;
  margin: 0px auto;
  line-height: 0;

  > a {
    font-size: 0;
  }

  :hover {
    ${ImageFrame} {
      opacity: 1;
      cursor: pointer;
    }
  }
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
