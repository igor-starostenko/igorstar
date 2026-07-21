import styled from 'styled-components';
import Link from 'next/link';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';
import BaseImage, { sizes } from 'components/image/baseImage.jsx';

export const Container = styled.div`
  margin-top: 7rem;
  padding-top: 4rem;
  border-top: 1px solid ${colors.lightGrey};
`;

export const SLink = styled(Link)`
  color: ${colors.darkGrey};
  text-decoration: none;

  h3 {
    color: ${colors.black};
    margin-bottom: 1rem;
  }

  p {
    margin-top: 0.5rem;
    span {
      color: ${colors.secondary};
    }
  }
`;

export const Card = styled.div`
  margin: 5px;
  padding: 0 1rem;
  border: 1px solid ${colors.lightGrey};
  color: ${colors.grey};
  text-decoration: none;
  display: flex;
  gap: 16px;
  align-items: flex-start;

  ${MEDIA.PHONE`
    gap: 0px;
    flex-direction: column;
  `};
`;

export const ThumbWrapper = styled.div`
  flex: 0 0 30%;
  margin: 2rem 0rem 0.5rem 0rem;
  position: relative;

  ${MEDIA.PHONE`
    margin: 1rem 0rem 0rem 0rem;
  `};
`;

export const Thumb = styled(BaseImage)`
  box-shadow: -1px 3px 6px 1px rgba(0, 0, 0, 0.3);
  position: relative !important;
  width: 100%;
  height: auto;
`;

export const Details = styled.div`
  flex: 1;
`;
