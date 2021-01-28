import styled from 'styled-components'

export const Wrapper = styled.div`
  grid-area: DATEPICKER;
  background: ${({ theme }) => theme.colors.background};
  /* border-right: 1px solid ${({ theme }) => theme.colors.border.primary}; */
`

export const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  height: 41px;
  padding: 0 16px;

  small {
    color: ${({ theme }) => theme.colors.text.caption.dark};
    font-size: 10px;
    margin-bottom: 1px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.secondary.dark};
    font-size: 13px;
    font-weight: 500;
  }
`
