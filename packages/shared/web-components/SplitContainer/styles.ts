import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 10px 1fr;
  grid-template-rows: calc(100vh - 30px - 125px);
  grid-template-areas: 'BUYERS . REPRESENTATIVES';
`

export const ResizableWrapper = styled.div`
  grid-area: BUYERS;
  min-width: 300px;
  max-width: 500px;

  border-right: 1px solid ${({ theme }) => theme.colors.border.primary};
`

export const RemainingWrapper = styled.div`
  grid-area: REPRESENTATIVES;

  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};
`
