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
  text-decoration: none;
`;

export const Row = styled.div`
  width: 100%;
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

export const Date = styled.span`
  margin-bottom: 1rem;
  margin-top: 2.5rem;
  color: ${colors.grey};
  float: right;
  ${MEDIA.PHONE`
    display: none;
  `};
`;

export const MobileDate = styled.span`
  display: none;
  color: ${colors.grey};
  float: right;
  ${MEDIA.PHONE`
    display: block;
  `};
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  margin: 0.5rem 10px 0.5rem 0px;
  padding: 3px;
  border-radius: 7px;
  color: ${colors.darkGrey};
  background: ${colors.lightestGrey};
  font-size: 1.4rem;
`;
