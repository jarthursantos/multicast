import ScrollBarBase from 'react-perfect-scrollbar'

import styled from 'styled-components'

import { Container as BaseContainer } from '../styles'

export const Wrapper = styled.div`
  padding: 8px;
`

export const Container = styled(BaseContainer)`
  padding: 8px;
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
  flex-direction: column;

  padding: 0 !important;

  button {
    flex: 1;
  }

  form {
    padding: 0 !important;
  }

  & > * + * {
    margin-top: 12px;
  }
`

export const Content = styled.div`
  height: 290px;

  & > * + * {
    margin-top: 12px;
  }
`
