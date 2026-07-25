import styled from 'styled-components';
import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.div`
  padding: 2rem 4rem 10rem 4rem;
  max-width: 800px;
  margin: 0 auto;

  ${MEDIA.PHONE`
    padding: 2rem 0 10rem 0;
  `}
`;
