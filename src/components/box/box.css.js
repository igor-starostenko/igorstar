import styled from 'styled-components';
import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.div`
  padding: 2rem 4rem 10rem 4rem;
  max-width: 700px;
  margin: 0 auto;

  ${MEDIA.PHONE`
    padding: 2rem 3rem 8rem 3rem;
  `}
`;
