import styled from 'styled-components';
import { RowsPhotoAlbum } from 'react-photo-album';

export const GalleryContainer = styled.div`
  margin: ${(props) => props.$rowGap}px;
  max-width: ${(props) => props.$containerWidth}px;
  width: 100%;
  box-sizing: border-box;

  .react-photo-album--photo {
    max-width: 100% !important;
  }

  .react-photo-album--photo img {
    max-width: 100% !important;
    height: auto !important;
    display: block;
  }
`;

export default GalleryContainer;
