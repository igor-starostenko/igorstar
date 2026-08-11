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
  background-image: url(${({ $blurDataURL }) => $blurDataURL || 'none'});
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
`;

export const ModalImage = styled(BaseImage)`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Description = styled.p`
  position: absolute;
  right: 20px;
  bottom: 20px;
  max-width: 90%;
  color: #fff;
  font-size: 14px;
  text-align: right;
  line-height: 1.4;
  z-index: 10;
`;
