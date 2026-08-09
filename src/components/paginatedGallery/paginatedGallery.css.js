import styled from 'styled-components';

export const PlaceholderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin: 8px;
  width: calc(100% - 16px);
`;

export const PlaceholderTile = styled.div`
  flex: 1 1 calc(33.333% - 2px);
  height: ${(props) => props.$targetRowHeight || 260}px;
  background-color: #e0e0e0;
  border-radius: 4px;
`;
