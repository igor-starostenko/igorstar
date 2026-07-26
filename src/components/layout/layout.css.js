import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  min-height: calc(100% - 224px);
  height: auto !important;
  height: 100%;
`;

export const ContentDetails = styled.div`
  padding-left: 4rem;
  padding-right: 4rem;
`;

export const CategoryLabel = styled(ContentDetails)`
  padding-top: 1rem;
  padding-bottom: 2rem;
`;
