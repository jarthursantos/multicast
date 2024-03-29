import ScrollBarBase from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Separator = styled.div`
  background: ${({ theme }) => theme.colors.border.secondary};
  height: 1px;
`

export const Container = styled.div`
  padding: 16px;

  & > * + * {
    margin-top: 12px;
  }
`

export const ScrollBar = styled(ScrollBarBase)`
  max-height: calc(100vh - 89px);
`

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 13px;
  height: calc(100vh - 89px);
`
