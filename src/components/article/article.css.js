import Link from 'next/link';
import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

export const Card = styled.article`
  &:first-child {
    margin-top: 19px;
  }
  padding-bottom: 39px;
  &:not(:last-child) {
    margin-bottom: 29px;
    border-bottom: 1px solid #e8e8e8;
  }
`;

export const SLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`;

export const Row = styled.div`
  width: 100%;
  display: inline-flex;
`;

export const Thumb = styled.div`
  position: relative;
  box-shadow: -1px 3px 6px 1px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
  line-height: 0;
  img {
    object-fit: cover;
    transition: transform 2s;
  }
  :hover {
    box-shadow: -2px 5px 8px 2px rgba(0, 0, 0, 0.3);
    img {
      transform: scale(1.02);
    }
  }

  max-height: 41rem;
  height: 60vw;
  margin: 0rem -3.9rem 0rem;
  ${MEDIA.TABLET`
    max-height: 36rem;
    height: 55vw;
  `};
  ${MEDIA.PHONE`
    max-height: 24rem;
    height: 50vw;
    margin: 0rem -2.9rem 0rem;
  `};
`;

export const Title = styled.h3`
  margin-bottom: 1rem;
  color: ${colors.black};
  display: inline-block;
`;

export const Description = styled.p`
  text-decoration: none;
  color: ${colors.black};
`;
