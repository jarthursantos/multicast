import styled from 'styled-components'

export const Container = styled.div`
  display: grid;

  grid-template-columns: 100%;
  grid-template-rows: 319px calc(100vh - 319px - 150px) 150px;
  grid-template-areas:
    'REQUEST'
    'INVOICE_PICKER'
    'SITUATION';

  grid-area: SIDE_PANEL;
  background: #fff;
  border-right: 1px solid ${({ theme }) => theme.colors.border.primary};

  & > * {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`
