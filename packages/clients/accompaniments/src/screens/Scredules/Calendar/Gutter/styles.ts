import styled from 'styled-components'

export const Container = styled.div`
  grid-area: GUTTER;

  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 60px;

  & > * {
    border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`
