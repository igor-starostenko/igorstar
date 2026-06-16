import styled from 'styled-components';

export const GalleryContainer = styled.div`
  margin: ${(props) => props.$spacing}px;
  max-width: ${(props) => props.$containerWidth}px;

  /* Override react-photo-album CSS to ensure valid position for Next.js Image */
  .react-photo-album--photo {
    position: relative !important;
  }

  /* Ensure Next.js Image fills container correctly */
  .react-photo-album--photo img {
    max-width: 100% !important;
    height: auto !important;
  }
`;

export const GalleryImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: -1px 3px 6px 1px rgba(0, 0, 0, 0.3);
`;
