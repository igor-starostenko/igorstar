import styled from 'styled-components';
import BaseImage from 'components/image/baseImage.jsx';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90vh;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  z-index: 101;
`;

export const ModalImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const ModalImage = styled(BaseImage)`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
`;

export const BlurPlaceholder = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: blur(20px);
  transform: scale(1.1);
  z-index: 1;
`;

export const Description = styled.p`
  position: absolute;
  bottom: 20px;
  left: 60px;
  right: 60px;
  color: #fff;
  font-size: 14px;
  text-align: left;
  line-height: 1.4;
  z-index: 10;
  ${({ $hasArrows }) => $hasArrows && `
    max-width: calc(100% - 120px);
  `}
`;

export const PrevButton = styled(CloseButton)`
  left: 20px;
  right: auto;
  top: auto;
  bottom: 20px;
  transform: none;
`;

export const NextButton = styled(CloseButton)`
  right: 20px;
  top: auto;
  bottom: 20px;
  transform: none;
`;

export const PreloadedImage = styled(BaseImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;
