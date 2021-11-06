import styled from 'styled-components';
import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.nav`
  display: inline-flex;

  a {
    text-transform: uppercase;
    font-size: 1.3rem;
    line-height: 1.5;
    text-align: center;
    min-width: 48px;
  }

  a:not(:first-child) {
    margin-left: 3rem;
  }

  ${MEDIA.PHONE`
    width: 100%;
    max-width: 60%;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-align-items: stretch;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;

    a:not(:first-child) {
      margin-left: unset;
    }
  `}
`;
