import styled from 'styled-components'

export const Container = styled.div`
  grid-area: FILTERS;

  position: fixed;
  top: 150px;
  bottom: 0;
  right: 0;

  background: ${({ theme }) => theme.colors.background.light};
  padding: 24px 16px;
  min-width: 300px;
  width: 300px;

  h2 {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  & > button + button {
    margin-top: 8px;
  }
`
