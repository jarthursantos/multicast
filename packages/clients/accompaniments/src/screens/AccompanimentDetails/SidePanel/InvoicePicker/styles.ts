import styled from 'styled-components'

export const Wrapper = styled.div`
  grid-area: INVOICE_PICKER;

  display: flex;
  flex-direction: column;

  flex: 1;
  padding: 16px;
`

export const Container = styled.div`
  overflow-y: scroll;

  flex: 1;
  border-top: 1px dashed ${({ theme }) => theme.colors.border.primary};
  margin-top: 12px;
  margin-bottom: -16px;
  margin-right: -16px;
  padding: 12px 16px;
  padding-left: 0;

  & > * + * {
    margin-top: 8px;
  }
`
