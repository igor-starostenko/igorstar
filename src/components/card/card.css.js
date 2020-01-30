import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from 'constants/theme';

export const SLink = styled(Link)`
  text-decoration: none;
`;

export const Row = styled.div`
  display: inline-flex;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
`;

export const Title = styled.h3`
  margin-bottom: 1rem;
  color: ${colors.black};
`;

export const Description = styled.p`
  text-decoration: none;
  color: ${colors.black};
`;

export const Date = styled.span`
  margin-bottom: 1rem;
  color: ${colors.grey};
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
