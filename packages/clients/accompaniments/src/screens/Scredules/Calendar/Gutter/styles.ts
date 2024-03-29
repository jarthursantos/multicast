import styled from 'styled-components'

export const Container = styled.div`
  grid-area: GUTTER;

  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 60px;
  padding-bottom: 11px;
  padding-top: 40px;

  & > * {
    border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  }

  & > * + * {
    border-top: none;
  }
`
