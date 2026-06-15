import { styled } from 'styled-components';

export const GalleryContainer = styled.div`
  margin-top: 2rem;
`;

export const GalleryImageWrapper = styled.div`
  position: relative !important;
  width: 100% !important;
  height: 100% !important;

  img {
    object-fit: cover;
  }
`;
