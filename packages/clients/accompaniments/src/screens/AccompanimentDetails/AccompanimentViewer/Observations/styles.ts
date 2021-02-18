import ScrollBarBase from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const Container = styled.div`
  grid-area: OBSERVATIONS;

  position: relative;

  display: flex;
  flex-direction: column;

  background-color: #fff;
  padding: 16px;
  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};

  & > * + * {
    margin-top: 8px;
  }
`

export const ScrollBar = styled(ScrollBarBase)``

export const EmptyMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary.dark};

  svg {
    height: 40px;
    width: 40px;
    margin-bottom: 16px;
  }
`

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  padding: 0 !important;

  button {
    height: 40px;
    width: 40px;
    padding: 0 8px;
  }

  form {
    padding: 0 !important;
  }

  & > * {
    flex: 1;
  }

  & > * + * {
    flex: 0;
    margin-left: 8px;
  }
`

export const Content = styled.div`
  height: 290px;

  & > * + * {
    margin-top: 12px;
  }
`
