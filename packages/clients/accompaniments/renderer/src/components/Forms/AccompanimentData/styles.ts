import styled from 'styled-components'

export const InvoiceContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;

  border: 2px dashed #ccc;
  background: ${({ disabled }) => (disabled ? '#fff' : '#f0f0f0')};
  border-radius: 4px;
  padding: 12px;

  h3 {
    font-size: 13px;
  }

  & > * + * {
    margin-top: 12px;
  }
`
