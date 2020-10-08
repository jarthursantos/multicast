import styled from 'styled-components'

export const PerMonthWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(50vh - 20px - 62.5px) 10px calc(50vh - 20px - 62.5px);
  grid-template-areas:
    'TOP'
    'SEPARATOR'
    'BOTTOM';
`

export const Separator = styled.div`
  grid-area: SEPARATOR;

  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
`
