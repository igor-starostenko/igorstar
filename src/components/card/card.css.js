import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

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
  margin-top: 2rem;
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
  margin: 0.5rem 0;
`;

export const Tag = styled.span`
  margin-right: 10px;
  padding: 3px;
  border-radius: 7px;
  color: ${colors.black};
  background: ${colors.primary};
  opacity: 50%;
  font-size: 1.4rem;
`;
