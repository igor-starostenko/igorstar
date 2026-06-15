// @prettier-ignore
import { styled } from 'styled-components';

import { colors } from 'constants/theme';

export const ImageContainer = styled.div`
  position: relative;
  width: fit-content;
  margin: 0px auto;
  line-height: 0;
  box-shadow: -1px 3px 6px 1px rgba(0, 0, 0, 0.3);

  > a {
    font-size: 0;
  }

  :hover {
    transform: scale(1.02);
    ${ImageFrame} {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: fit-content;
  margin: 0px auto;
  line-height: 0;

  > a {
    font-size: 0;
  }
`;

export const ImageFrame = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  opacity: 0;
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
