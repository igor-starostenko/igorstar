import styled from 'styled-components';

export const Article = styled.article`
  &:first-child {
    margin-top: 19px;
  }
  padding-bottom: 39px;
  &:not(:last-child) {
    margin-bottom: 29px;
    border-bottom: 1px solid #e8e8e8;
  }
`;
