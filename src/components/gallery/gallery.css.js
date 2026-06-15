import styled from 'styled-components';

export const GalleryContainer = styled.div`
  margin: ${(props) => props.$spacing}px;
  max-width: ${(props) => props.$containerWidth}px;

  /* Override react-photo-album CSS to ensure valid position for Next.js...[truncated]
  .react-photo-album--photo {
    position: relative !important;
  }
`;

export const GalleryImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: -1px 3px 6px 1px rgba(0, 0, 0, 0.3);
`;
