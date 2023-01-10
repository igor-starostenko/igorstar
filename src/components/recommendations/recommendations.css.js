import styled from 'styled-components';
import Link from 'next/link';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.div`
  margin-top: 7rem;
  padding-top: 4rem;
  border-top: 1px solid ${colors.lightGrey};
`;

export const Border = styled.div`
  margin: 5px;
  border: 1px solid ${colors.lightGrey};
  color: ${colors.grey};
  text-decoration: none;
  min-height: 14rem;
`;

export const SLink = styled(Link)`
  color: ${colors.darkGrey};
  text-decoration: none;

  h3 {
    color: ${colors.black};
    margin-bottom: 1rem;
  }

  p {
    margin-top: 1rem;
    span {
      color: ${colors.secondary};
    }
  }
`;

export const Row = styled.div`
  margin: 1rem;
`;

export const Thumb = styled.div`
  position: relative;
  width: 30%;
  float: left;
  margin: 0rem 1rem 0.5rem 0rem;
  max-height: 14rem;
  height: 40vw;

  img {
    object-fit: contain;
  }

  ${MEDIA.TABLET`
    max-height: 12rem;
    height: 30vw;
  `};
  ${MEDIA.PHONE`
    max-height: 8rem;
    height: 19vw;
  `};
`;
