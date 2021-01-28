import styled from 'styled-components'

export const Container = styled.div`
  grid-area: HEADER;
  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  margin-bottom: -1px;
  margin-right: 1px;
  z-index: 1;

  display: flex;
  flex-direction: row;

  & > * + * {
    border-left: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`
