import styled from 'styled-components';
import ExportedImage from 'next-image-export-optimizer';

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
