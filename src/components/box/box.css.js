import styled from 'styled-components';
import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.div`
  padding: 2rem 4rem 10rem 4rem;
  max-width: 700px;
  margin: 0 auto;

  ${MEDIA.PHONE`
    padding: ${({ isMain }) =>
      isMain ? `0rem 3rem 6rem 3rem` : `0rem 4rem 6rem 4rem`} ;
  `}
`;
