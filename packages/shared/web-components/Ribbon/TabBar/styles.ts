import styled from 'styled-components'

export const Container = styled.div`
  grid-area: TABBAR;

  display: flex;
  flex-direction: row;
  align-items: center;

  background: ${({ theme }) => theme.colors.primary.dark};
  padding: 4px 16px 0;
`
